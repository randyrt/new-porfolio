import { ref, onMounted, onUnmounted, nextTick, type Ref } from 'vue';

type CornerPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

const AVOID_SELECTORS = [
    'h1', 'h2', 'h3', 'p', 'img', 'button:not(.chatbot-btn)',
    'a', 'div[class*="content"]', 'section', 'article',
    '.card', '.project-card', '.skill-item', '.testimonial',
    'form', 'input', 'textarea', '.service-card'
];

export function useFloatingChatbot(chatbotRef: Ref<HTMLElement | null>) {
    const currentPosition = ref<CornerPosition>('bottom-right');

    let intersectionObserver: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    let isCleanedUp = false;

    const calculateOverlapAtPosition = (position: CornerPosition): number => {
        const botElement = chatbotRef.value;
        if (!botElement) return 1;

        const originalClasses = botElement.getAttribute('class') || '';

        const testClasses: Record<CornerPosition, string> = {
            'bottom-right': 'fixed bottom-6 right-6',
            'bottom-left': 'fixed bottom-6 left-6',
            'top-right': 'fixed top-24 right-6',
            'top-left': 'fixed top-24 left-6'
        };

        botElement.setAttribute('class', `${originalClasses} ${testClasses[position]}`);

        const botRect = botElement.getBoundingClientRect();

        const elementsToAvoid = document.querySelectorAll(AVOID_SELECTORS.join(','));
        let maxOverlap = 0;

        elementsToAvoid.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;

            const overlapX = Math.max(0, Math.min(botRect.right, rect.right) - Math.max(botRect.left, rect.left));
            const overlapY = Math.max(0, Math.min(botRect.bottom, rect.bottom) - Math.max(botRect.top, rect.top));
            const overlapArea = overlapX * overlapY;
            const botArea = botRect.width * botRect.height;

            const overlapRatio = botArea > 0 ? overlapArea / botArea : 0;
            maxOverlap = Math.max(maxOverlap, overlapRatio);
        });

        botElement.setAttribute('class', originalClasses);

        return maxOverlap;
    };

    const findBestPosition = (): CornerPosition => {
        const positions: CornerPosition[] = ['bottom-right', 'bottom-left', 'top-right', 'top-left'];
        let bestPosition = currentPosition.value;
        let minOverlap = 1;

        for (const pos of positions) {
            const overlap = calculateOverlapAtPosition(pos);
            if (overlap < minOverlap) {
                minOverlap = overlap;
                bestPosition = pos;
            }
            if (overlap === 0) {
                return pos;
            }
        }

        return bestPosition;
    };

    const updatePosition = async () => {
        if (isCleanedUp) return;
        await nextTick();
        if (!chatbotRef.value) return;
        const newPosition = findBestPosition();
        if (newPosition !== currentPosition.value) {
            currentPosition.value = newPosition;
        }
    };

    const observeElements = () => {
        if (isCleanedUp) return;

        if (intersectionObserver) {
            intersectionObserver.disconnect();
        }

        intersectionObserver = new IntersectionObserver(
            () => updatePosition(),
            { threshold: 0.1 }
        );

        document.querySelectorAll(AVOID_SELECTORS.join(',')).forEach(el => {
            intersectionObserver?.observe(el);
        });
    };

    const handleScroll = () => {
        if (isCleanedUp) return;
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updatePosition, 100);
    };

    const handleResize = () => {
        if (isCleanedUp) return;
        setTimeout(updatePosition, 150);
    };

    const setupObservers = () => {
        if (isCleanedUp) return;

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        mutationObserver = new MutationObserver(() => {
            if (!isCleanedUp) {
                updatePosition();
                setTimeout(observeElements, 100);
            }
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class', 'hidden']
        });

        observeElements();
    };

    const cleanup = () => {
        isCleanedUp = true;

        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);

        if (mutationObserver) {
            mutationObserver.disconnect();
            mutationObserver = null;
        }

        if (intersectionObserver) {
            intersectionObserver.disconnect();
            intersectionObserver = null;
        }

        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
            scrollTimeout = null;
        }
    };

    onMounted(() => {
        setTimeout(() => {
            setupObservers();
            updatePosition();
        }, 100);
    });

    onUnmounted(() => {
        cleanup();
    });

    return {
        currentPosition,
        updatePosition
    };
}