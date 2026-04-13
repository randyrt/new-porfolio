import { ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useToast } from 'vue-toastification';
const props = defineProps();
const emit = defineEmits();
const toast = useToast();
const showDemo = ref(false);
const toggleDemo = () => {
    showDemo.value = !showDemo.value;
};
const demoType = computed(() => {
    const title = props.title.toLowerCase();
    if (title.includes('fid') || title.includes('connect'))
        return 'fid-connect';
    if (title.includes('qcp'))
        return 'qcp';
    if (title.includes('nurses') || title.includes('souper'))
        return 'nurses';
    if (title.includes('echo') || title.includes('webline'))
        return 'echo-webLine';
    if (title.includes('afr') || title.includes('fan'))
        return 'afr-fan';
    return 'generic';
});
// FID-CONNECT demo data
const fiscalData = ref({ revenue: 250000, expenses: 145000 });
const taxableResult = computed(() => fiscalData.value.revenue - fiscalData.value.expenses);
const vatAmount = computed(() => fiscalData.value.revenue * 0.21);
const docMessage = ref('');
const generateTaxDeclaration = () => {
    toast.success(`Déclaration fiscale générée - TVA due: ${formatCurrency(vatAmount.value)}`);
};
const generateDocument = (type) => {
    const names = { letter: 'lettre d\'engagement', report: 'rapport fiscal', invoice: 'facture' };
    docMessage.value = `✓ ${names[type]} généré (démo)`;
    setTimeout(() => { docMessage.value = ''; }, 2000);
};
// QCP demo data
const loan = ref({ amount: 50000, rate: 5, years: 10 });
const monthlyPayment = computed(() => {
    const monthlyRate = loan.value.rate / 100 / 12;
    const months = loan.value.years * 12;
    if (monthlyRate === 0)
        return loan.value.amount / months;
    const payment = loan.value.amount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    return isNaN(payment) ? 0 : payment;
});
const totalPayment = computed(() => monthlyPayment.value * loan.value.years * 12);
const totalInterest = computed(() => totalPayment.value - loan.value.amount);
const amortizationPercent = computed(() => (monthlyPayment.value > 0 ? (loan.value.amount / totalPayment.value) * 100 : 0));
// NURSES demo data enrichi
const booking = ref({ guests: 2, date: new Date().toISOString().split('T')[0], service: 'soir' });
const reservationMessage = ref('');
const minDate = new Date().toISOString().split('T')[0];
// Événements du restaurant
const nurseEvents = ref([
    {
        title: 'Soirée de Gala Annuel',
        date: '2024-12-15',
        time: '19h30',
        participants: 89,
        price: '150€',
        spots: 11,
        type: 'gala'
    },
    {
        title: 'Dîner aux Chandelles',
        date: '2024-11-20',
        time: '20h00',
        participants: 45,
        price: '85€',
        spots: 5,
        type: 'gala'
    },
    {
        title: 'Dégustation de Vins Belges',
        date: '2024-10-25',
        time: '18h30',
        participants: 32,
        price: '65€',
        spots: 18,
        type: 'degustation'
    }
]);
const eventReservationMessage = ref('');
const adminStats = ref({
    totalReservations: 127,
    vipReservations: 34,
    totalGuests: 486
});
const makeReservation = () => {
    const serviceNames = { midi: 'déjeuner', soir: 'dîner', vip: 'service VIP' };
    const vipBonus = booking.value.service === 'vip' ? ' (avec accès VIP)' : '';
    reservationMessage.value = `✓ Réservation confirmée pour ${booking.value.guests} personne(s) le ${booking.value.date} (${serviceNames[booking.value.service]})${vipBonus}`;
    adminStats.value.totalReservations++;
    adminStats.value.totalGuests += booking.value.guests;
    if (booking.value.service === 'vip') {
        adminStats.value.vipReservations++;
    }
    setTimeout(() => { reservationMessage.value = ''; }, 3000);
};
const selectNurseEvent = (idx) => {
    selectedEvent.value = idx;
};
const reserveEvent = () => {
    if (selectedEvent.value === null) {
        eventReservationMessage.value = '❌ Veuillez sélectionner un événement';
        return;
    }
    const event = nurseEvents.value[selectedEvent.value];
    if (event.spots <= 0) {
        eventReservationMessage.value = '❌ Désolé, cet événement est complet';
        return;
    }
    event.spots--;
    event.participants++;
    adminStats.value.totalReservations++;
    eventReservationMessage.value = `✓ Réservation confirmée pour "${event.title}" !`;
    setTimeout(() => { eventReservationMessage.value = ''; }, 3000);
};
const addDemoEvent = () => {
    nurseEvents.value.push({
        title: `Nouvel événement ${nurseEvents.value.length + 1}`,
        date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        time: '20h00',
        participants: 0,
        price: '70€',
        spots: 30,
        type: Math.random() > 0.5 ? 'gala' : 'degustation'
    });
    toast.success('Événement ajouté !');
};
const resetDemoData = () => {
    nurseEvents.value = [
        { title: 'Soirée de Gala Annuel', date: '2024-12-15', time: '19h30', participants: 89, price: '150€', spots: 11, type: 'gala' },
        { title: 'Dîner aux Chandelles', date: '2024-11-20', time: '20h00', participants: 45, price: '85€', spots: 5, type: 'gala' },
        { title: 'Dégustation de Vins Belges', date: '2024-10-25', time: '18h30', participants: 32, price: '65€', spots: 18, type: 'degustation' }
    ];
    adminStats.value = { totalReservations: 127, vipReservations: 34, totalGuests: 486 };
    selectedEvent.value = null;
    toast.info('Données réinitialisées');
};
const events = ref([
    { title: 'Congrès Européen de Cardiologie', date: '2024-06-15', participants: 145, status: 'ouvert', maxParticipants: 200 },
    { title: 'Symposium sur l\'Imagerie Cardiaque', date: '2024-07-20', participants: 89, status: 'ouvert', maxParticipants: 150 },
    { title: 'Atelier Échocardiographie', date: '2024-08-10', participants: 50, status: 'complet', maxParticipants: 50 }
]);
const selectedEvent = ref(null);
const registration = ref({ name: '', email: '', eventId: '' });
const registrationMessage = ref('');
const downloadMessage = ref('');
const heartData = ref({ heartRate: 72, systolic: 120, diastolic: 80, oxygen: 98 });
const heartHistory = ref([]);
// Initialiser l'historique
for (let i = 7; i >= 0; i--) {
    const hour = new Date().getHours() - i;
    heartHistory.value.push({
        heartRate: Math.floor(Math.random() * 40) + 60,
        time: `${hour}h`
    });
}
const canRegister = computed(() => {
    return registration.value.name && registration.value.email && registration.value.eventId !== '';
});
const addEvent = () => {
    const newEvent = {
        title: `Nouvel événement ${events.value.length + 1}`,
        date: new Date().toISOString().split('T')[0],
        participants: 0,
        status: 'ouvert',
        maxParticipants: 100
    };
    events.value.push(newEvent);
    toast.success('Nouvel événement créé !');
};
const selectEvent = (idx) => {
    selectedEvent.value = idx;
    registration.value.eventId = idx.toString();
};
const deleteEvent = (idx) => {
    events.value.splice(idx, 1);
    if (selectedEvent.value === idx) {
        selectedEvent.value = null;
        registration.value.eventId = '';
    }
    toast.info('Événement supprimé');
};
const showMessage = (message, isError = true) => {
    registrationMessage.value = message;
    setTimeout(() => {
        registrationMessage.value = '';
    }, 3000);
};
const registerToEvent = () => {
    const eventId = parseInt(registration.value.eventId);
    const event = events.value[eventId];
    if (!canRegister.value) {
        showMessage('❌ Veuillez remplir tous les champs ');
        return;
    }
    if (!event) {
        showMessage('❌ Événement non trouvé');
        return;
    }
    if (event.status === 'complet') {
        showMessage('❌ Cet événement est déjà complet');
        return;
    }
    if (event.participants + 1 > event.maxParticipants) {
        event.status = 'complet';
        showMessage('❌ Désolé, cet événement vient d\'être complet');
        return;
    }
    event.participants++;
    if (event.participants === event.maxParticipants) {
        event.status = 'complet';
    }
    registrationMessage.value = `✓ Inscription confirmée pour ${registration.value.name} à "${event.title}"`;
    registration.value = { name: '', email: '', eventId: '' };
    setTimeout(() => {
        registrationMessage.value = '';
    }, 3000);
};
const simulateHeartData = () => {
    heartData.value.heartRate = Math.floor(Math.random() * 80) + 60;
    heartData.value.systolic = Math.floor(Math.random() * 60) + 100;
    heartData.value.diastolic = Math.floor(Math.random() * 40) + 60;
    heartData.value.oxygen = Math.floor(Math.random() * 15) + 90;
    heartHistory.value.shift();
    heartHistory.value.push({
        heartRate: heartData.value.heartRate,
        time: `${new Date().getHours()}h`
    });
    toast.info('Nouvelle mesure simulée');
};
const downloadResource = () => {
    downloadMessage.value = '✓ Démonstration : ressource téléchargée';
    setTimeout(() => {
        downloadMessage.value = '';
    }, 2000);
};
// Utilitaires
const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-BE', { style: 'currency', currency: 'EUR' }).format(value);
};
const notifyDemo = () => {
    toast.info("Merci ! Vous serez notifié quand la démo sera disponible.");
};
const newPost = ref({ content: '' });
const posts = ref([
    {
        author: 'Mamadou Diallo',
        avatar: '🇸🇳',
        content: 'Fier de partager cet article sur l\'entrepreneuriat en Afrique ! Qui d\'autre est intéressé par les opportunités dans la tech ?',
        time: 'Il y a 2h',
        likes: 24,
        comments: [
            { author: 'Aminata', content: 'Très inspirant, merci du partage !' },
            { author: 'Koffi', content: 'Je suis intéressé, on peut en discuter ?' }
        ]
    },
    {
        author: 'Grace Akinyi',
        avatar: '🇰🇪',
        content: 'Événement culturel ce weekend à Paris ! Venez célébrer la diversité africaine 🎉',
        time: 'Il y a 5h',
        likes: 56,
        comments: [{ author: 'Jean', content: 'J\'y serai !' }]
    }
]);
const showComments = ref(null);
const groups = ref([
    { name: 'Tech Africa', members: 1234, joined: false },
    { name: 'Culture & Traditions', members: 892, joined: true },
    { name: 'Business & Investissement', members: 567, joined: false },
    { name: 'Diaspora United', members: 2103, joined: false }
]);
const stats = ref({
    members: 15423,
    posts: 3421,
    groups: 48,
    countries: 42
});
const selectedPlan = ref('monthly');
const paymentMethod = ref('visa');
const isProcessing = ref(false);
const paymentMessage = ref('');
const createPost = () => {
    if (!newPost.value.content.trim()) {
        toast.warning('Le contenu de la publication ne peut pas être vide 👮‍♂️');
        return;
    }
    posts.value.unshift({
        author: 'Vous',
        avatar: '👤',
        content: newPost.value.content,
        time: 'À l\'instant',
        likes: 0,
        comments: []
    });
    stats.value.posts++;
    newPost.value.content = '';
    toast.success('Publication partagée !');
};
const addMediaPost = () => {
    toast.info('📷 Fonctionnalité média (démo)');
};
const addEventPost = () => {
    toast.info('📅 Fonctionnalité événement (démo)');
};
const deletePost = (idx) => {
    posts.value.splice(idx, 1);
    toast.info('Publication supprimée');
};
const likePost = (idx) => {
    posts.value[idx].likes++;
};
const toggleComment = (idx) => {
    showComments.value = showComments.value === idx ? null : idx;
};
const addComment = (idx) => {
    const comment = posts.value[idx].newComment?.trim();
    if (!comment)
        return;
    posts.value[idx].comments.push({
        author: 'Vous',
        content: comment
    });
    posts.value[idx].newComment = '';
    toast.success('Commentaire ajouté');
};
const showGroupModal = ref(false);
const newGroupName = ref('');
const isCreatingGroup = ref(false);
const createGroup = () => {
    showGroupModal.value = true;
    newGroupName.value = '';
};
const confirmCreateGroup = () => {
    if (!newGroupName.value.trim()) {
        toast.warning('Veuillez entrer le nom du groupe 👮‍♂️');
        return;
    }
    isCreatingGroup.value = true;
    setTimeout(() => {
        groups.value.unshift({
            name: newGroupName.value.trim(),
            members: 1,
            joined: true
        });
        stats.value.groups++;
        toast.success(`Groupe "${newGroupName.value.trim()}" créé !`);
        showGroupModal.value = false;
        newGroupName.value = '';
        isCreatingGroup.value = false;
    }, 300);
};
const cancelCreateGroup = () => {
    showGroupModal.value = false;
    newGroupName.value = '';
};
const joinGroup = (idx) => {
    if (groups.value[idx].joined) {
        toast.info('Vous êtes déjà membre');
    }
    else {
        groups.value[idx].joined = true;
        groups.value[idx].members++;
        toast.success(`Vous avez rejoint ${groups.value[idx].name}`);
    }
};
const processPayment = async () => {
    isProcessing.value = true;
    paymentMessage.value = '';
    // Simulation de paiement
    setTimeout(() => {
        isProcessing.value = false;
        paymentMessage.value = `✓ Paiement de ${selectedPlan.value === 'monthly' ? '9,99€' : '89,99€'} effectué via ${paymentMethod.value === 'visa' ? 'VISA' : 'PayPal'} ! Merci pour votre soutien à la communauté africaine.`;
        setTimeout(() => {
            paymentMessage.value = '';
        }, 4000);
    }, 1500);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['demo-toggle-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-toggle-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['mySwiper']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['project-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mySwiper']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "project-container mb-16 card p-4" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex flex-col md:flex-row justify-between items-center h-auto md:h-[400px] mt-4 gap-4 md:gap-0" },
});
const __VLS_0 = {}.Swiper;
/** @type {[typeof __VLS_components.Swiper, typeof __VLS_components.Swiper, ]} */ ;
// @ts-ignore
Swiper;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    pagination: ({ clickable: true }),
    modules: ([__VLS_ctx.Pagination, __VLS_ctx.Autoplay]),
    ...{ class: "mySwiper w-full md:w-2/3 rounded-lg border-1 border-violet-300" },
    loop: (true),
    autoplay: ({ delay: 2500 }),
    navigation: true,
}));
const __VLS_2 = __VLS_1({
    pagination: ({ clickable: true }),
    modules: ([__VLS_ctx.Pagination, __VLS_ctx.Autoplay]),
    ...{ class: "mySwiper w-full md:w-2/3 rounded-lg border-1 border-violet-300" },
    loop: (true),
    autoplay: ({ delay: 2500 }),
    navigation: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
// @ts-ignore
[Pagination, Autoplay,];
for (const [img, index] of __VLS_getVForSourceType((__VLS_ctx.images))) {
    // @ts-ignore
    [images,];
    const __VLS_5 = {}.SwiperSlide;
    /** @type {[typeof __VLS_components.SwiperSlide, typeof __VLS_components.SwiperSlide, ]} */ ;
    // @ts-ignore
    SwiperSlide;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        key: (index),
    }));
    const __VLS_7 = __VLS_6({
        key: (index),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    const { default: __VLS_9 } = __VLS_8.slots;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "relative group overflow-hidden rounded-lg shadow-md" },
    });
    __VLS_asFunctionalElement(__VLS_elements.img)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.$emit('open-image', img);
                // @ts-ignore
                [$emit,];
            } },
        src: (img),
        alt: (`${__VLS_ctx.title} capture ${index + 1}`),
        ...{ class: "cursor-pointer transition-transform duration-300 group-hover:scale-105" },
    });
    // @ts-ignore
    [title,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all" },
    });
    var __VLS_8;
}
var __VLS_3;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex justify-center card h-auto w-full md:w-1/3 mt-4 md:mt-0" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "flex flex-col items-center p-6 text-gray-600" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "text-lg font-bold text-violet-800" },
});
(__VLS_ctx.title);
// @ts-ignore
[title,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
(__VLS_ctx.description);
// @ts-ignore
[description,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "demo-section mt-8  p-8" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "demo-header p-8" },
});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
    ...{ class: "text-xl font-semibold text-gray-600" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.toggleDemo) },
    ...{ class: "btn-effect-5" },
});
// @ts-ignore
[toggleDemo,];
(__VLS_ctx.showDemo ? __VLS_ctx.$t('demo.hide') : __VLS_ctx.$t('demo.show'));
// @ts-ignore
[showDemo, $t, $t,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "ml-1" },
});
(__VLS_ctx.showDemo ? '▲' : '▼');
// @ts-ignore
[showDemo,];
const __VLS_10 = {}.transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
// @ts-ignore
Transition;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    enterActiveClass: "transition-all duration-300 ease-out",
    enterFromClass: "opacity-0 transform -translate-y-4",
    enterToClass: "opacity-100 transform translate-y-0",
    leaveActiveClass: "transition-all duration-200 ease-in",
    leaveFromClass: "opacity-100 transform translate-y-0",
    leaveToClass: "opacity-0 transform -translate-y-4",
}));
const __VLS_12 = __VLS_11({
    enterActiveClass: "transition-all duration-300 ease-out",
    enterFromClass: "opacity-0 transform -translate-y-4",
    enterToClass: "opacity-100 transform translate-y-0",
    leaveActiveClass: "transition-all duration-200 ease-in",
    leaveFromClass: "opacity-100 transform translate-y-0",
    leaveToClass: "opacity-0 transform -translate-y-4",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const { default: __VLS_14 } = __VLS_13.slots;
if (__VLS_ctx.showDemo) {
    // @ts-ignore
    [showDemo,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "demo-wrapper  border-2 border-violet-500 rounded-xl overflow-hidden shadow-lg " },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "text-white text-sm font-mono" },
    });
    (__VLS_ctx.$t('demo.live'));
    (__VLS_ctx.title);
    // @ts-ignore
    [title, $t,];
    if (__VLS_ctx.demoType === 'fid-connect') {
        // @ts-ignore
        [demoType,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "p-6 bg-gray-50" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "grid grid-cols-1 lg:grid-cols-2 gap-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
            ...{ class: "font-bold text-gray-800" },
        });
        (__VLS_ctx.$t('demo.fid_connect.title'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-white rounded-lg shadow p-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-between items-center mb-3" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "font-semibold" },
        });
        (__VLS_ctx.$t('demo.fid_connect.period'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "text-xs bg-green-100 text-green-700 px-2 py-1 rounded" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-between text-sm" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (__VLS_ctx.$t('demo.fid_connect.revenue'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "font-semibold" },
        });
        (__VLS_ctx.formatCurrency(__VLS_ctx.fiscalData.revenue));
        // @ts-ignore
        [formatCurrency, fiscalData,];
        __VLS_asFunctionalElement(__VLS_elements.input)({
            type: "range",
            min: "0",
            max: "500000",
            step: "5000",
            ...{ class: "w-full" },
        });
        (__VLS_ctx.fiscalData.revenue);
        // @ts-ignore
        [fiscalData,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-between text-sm mt-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (__VLS_ctx.$t('demo.fid_connect.expenses'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "font-semibold" },
        });
        (__VLS_ctx.formatCurrency(__VLS_ctx.fiscalData.expenses));
        // @ts-ignore
        [formatCurrency, fiscalData,];
        __VLS_asFunctionalElement(__VLS_elements.input)({
            type: "range",
            min: "0",
            max: (__VLS_ctx.fiscalData.revenue),
            step: "1000",
            ...{ class: "w-full" },
        });
        (__VLS_ctx.fiscalData.expenses);
        // @ts-ignore
        [fiscalData, fiscalData,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-between text-sm mt-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (__VLS_ctx.$t('demo.fid_connect.tax_result'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "font-semibold" },
            ...{ class: (__VLS_ctx.taxableResult < 0 ? 'text-green-600' : 'text-orange-600') },
        });
        // @ts-ignore
        [taxableResult,];
        (__VLS_ctx.formatCurrency(__VLS_ctx.taxableResult));
        // @ts-ignore
        [formatCurrency, taxableResult,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-white rounded-lg shadow p-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h5, __VLS_elements.h5)({
            ...{ class: "font-semibold mb-2" },
        });
        (__VLS_ctx.$t('demo.fid_connect.vat_title'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-2xl font-bold text-violet-600" },
        });
        (__VLS_ctx.formatCurrency(__VLS_ctx.vatAmount));
        // @ts-ignore
        [formatCurrency, vatAmount,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-xs text-gray-500 mt-1" },
        });
        (__VLS_ctx.$t('demo.fid_connect.vat_desc'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.generateTaxDeclaration) },
            ...{ class: "mt-3 w-full btn-violet btn-effect-5 text-sm py-2" },
        });
        // @ts-ignore
        [generateTaxDeclaration,];
        (__VLS_ctx.$t('demo.fid_connect.generate_tax'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-white rounded-lg shadow p-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h5, __VLS_elements.h5)({
            ...{ class: "font-semibold mb-2" },
        });
        (__VLS_ctx.$t('demo.fid_connect.doc_title'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.showDemo))
                        return;
                    if (!(__VLS_ctx.demoType === 'fid-connect'))
                        return;
                    __VLS_ctx.generateDocument('letter');
                    // @ts-ignore
                    [generateDocument,];
                } },
            ...{ class: "w-full text-left px-3 py-2 bg-gray-500 rounded hover:bg-gray-400 text-sm" },
        });
        (__VLS_ctx.$t('demo.fid_connect.doc_letter'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.showDemo))
                        return;
                    if (!(__VLS_ctx.demoType === 'fid-connect'))
                        return;
                    __VLS_ctx.generateDocument('report');
                    // @ts-ignore
                    [generateDocument,];
                } },
            ...{ class: "w-full text-left px-3 py-2 bg-gray-500 rounded hover:bg-gray-400 text-sm" },
        });
        (__VLS_ctx.$t('demo.fid_connect.doc_report'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.showDemo))
                        return;
                    if (!(__VLS_ctx.demoType === 'fid-connect'))
                        return;
                    __VLS_ctx.generateDocument('invoice');
                    // @ts-ignore
                    [generateDocument,];
                } },
            ...{ class: "w-full text-left px-3 py-2 bg-gray-500 rounded hover:bg-gray-400 text-sm" },
        });
        (__VLS_ctx.$t('demo.fid_connect.doc_invoice'));
        // @ts-ignore
        [$t,];
        if (__VLS_ctx.docMessage) {
            // @ts-ignore
            [docMessage,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "text-center text-sm p-2 mt-2 rounded" },
                ...{ class: (__VLS_ctx.docMessage.includes('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700') },
            });
            // @ts-ignore
            [docMessage,];
            (__VLS_ctx.docMessage);
            // @ts-ignore
            [docMessage,];
        }
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-blue-50 rounded-lg p-3 text-sm" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "font-semibold" },
        });
        (__VLS_ctx.$t('demo.fid_connect.alerts_title'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({
            ...{ class: "text-xs mt-1 space-y-1" },
        });
        __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
        (__VLS_ctx.$t('demo.fid_connect.alert_1'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
        (__VLS_ctx.$t('demo.fid_connect.alert_2'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
        (__VLS_ctx.$t('demo.fid_connect.alert_3'));
        // @ts-ignore
        [$t,];
    }
    else if (__VLS_ctx.demoType === 'qcp') {
        // @ts-ignore
        [demoType,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "p-6 bg-gray-50" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "grid grid-cols-1 md:grid-cols-2 gap-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
            ...{ class: "font-bold text-gray-800" },
        });
        (__VLS_ctx.$t('demo.qcp.title'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
            ...{ class: "text-sm text-gray-600" },
        });
        (__VLS_ctx.$t('demo.qcp.amount'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.input)({
            type: "range",
            min: "5000",
            max: "500000",
            step: "5000",
            ...{ class: "w-full" },
        });
        (__VLS_ctx.loan.amount);
        // @ts-ignore
        [loan,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-right font-semibold" },
        });
        (__VLS_ctx.formatCurrency(__VLS_ctx.loan.amount));
        // @ts-ignore
        [formatCurrency, loan,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
            ...{ class: "text-sm text-gray-600" },
        });
        (__VLS_ctx.$t('demo.qcp.rate'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.input)({
            type: "range",
            min: "1",
            max: "15",
            step: "0.1",
            ...{ class: "w-full" },
        });
        (__VLS_ctx.loan.rate);
        // @ts-ignore
        [loan,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-right font-semibold" },
        });
        (__VLS_ctx.loan.rate);
        // @ts-ignore
        [loan,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
            ...{ class: "text-sm text-gray-600" },
        });
        (__VLS_ctx.$t('demo.qcp.years'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.input)({
            type: "range",
            min: "1",
            max: "30",
            ...{ class: "w-full" },
        });
        (__VLS_ctx.loan.years);
        // @ts-ignore
        [loan,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-right font-semibold" },
        });
        (__VLS_ctx.loan.years);
        (__VLS_ctx.$t('demo.qcp.years_unit'));
        // @ts-ignore
        [$t, loan,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-white p-4 rounded-lg shadow" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
            ...{ class: "font-bold mb-3" },
        });
        (__VLS_ctx.$t('demo.qcp.results'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-between" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (__VLS_ctx.$t('demo.qcp.monthly'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "font-bold text-violet-600" },
        });
        (__VLS_ctx.formatCurrency(__VLS_ctx.monthlyPayment));
        // @ts-ignore
        [formatCurrency, monthlyPayment,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-between" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (__VLS_ctx.$t('demo.qcp.total'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (__VLS_ctx.formatCurrency(__VLS_ctx.totalPayment));
        // @ts-ignore
        [formatCurrency, totalPayment,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-between" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (__VLS_ctx.$t('demo.qcp.interest'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "text-orange-600" },
        });
        (__VLS_ctx.formatCurrency(__VLS_ctx.totalInterest));
        // @ts-ignore
        [formatCurrency, totalInterest,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "mt-4 pt-3 border-t" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-sm text-gray-600" },
        });
        (__VLS_ctx.$t('demo.qcp.amortization'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "w-full bg-gray-200 rounded-full h-2 mt-1" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-green-500 rounded-full h-2" },
            ...{ style: ({ width: __VLS_ctx.amortizationPercent + '%' }) },
        });
        // @ts-ignore
        [amortizationPercent,];
    }
    else if (__VLS_ctx.demoType === 'afr-fan') {
        // @ts-ignore
        [demoType,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "p-6 bg-gray-50" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "grid grid-cols-1 lg:grid-cols-2 gap-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
            ...{ class: "font-bold text-gray-800 flex items-center gap-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "text-2xl" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-white rounded-lg shadow p-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex gap-3" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex-1" },
        });
        __VLS_asFunctionalElement(__VLS_elements.textarea, __VLS_elements.textarea)({
            value: (__VLS_ctx.newPost.content),
            placeholder: "",
            rows: "2",
            ...{ class: "w-full p-2 border rounded-lg resize-none text-sm" },
        });
        // @ts-ignore
        [newPost,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-between items-center mt-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex gap-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.addMediaPost) },
            ...{ class: "text-gray-500 hover:text-violet-500 text-sm" },
        });
        // @ts-ignore
        [addMediaPost,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.addEventPost) },
            ...{ class: "text-gray-500 hover:text-violet-500 text-sm" },
        });
        // @ts-ignore
        [addEventPost,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.createPost) },
            ...{ class: "btn-violet inline-block text-center btn-effect-5 disabled:bg-gray-400 text-sm" },
        });
        // @ts-ignore
        [createPost,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-3 max-h-[700px] overflow-y-auto" },
        });
        for (const [post, idx] of __VLS_getVForSourceType((__VLS_ctx.posts))) {
            // @ts-ignore
            [posts,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                key: (idx),
                ...{ class: "bg-white rounded-lg shadow p-4" },
            });
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "flex items-start gap-3" },
            });
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center" },
            });
            (post.avatar);
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "flex-1" },
            });
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "flex justify-between items-start" },
            });
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
            __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
                ...{ class: "font-semibold text-gray-800" },
            });
            (post.author);
            __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
                ...{ class: "text-xs text-gray-500 ml-2" },
            });
            (post.time);
            __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.showDemo))
                            return;
                        if (!!(__VLS_ctx.demoType === 'fid-connect'))
                            return;
                        if (!!(__VLS_ctx.demoType === 'qcp'))
                            return;
                        if (!(__VLS_ctx.demoType === 'afr-fan'))
                            return;
                        __VLS_ctx.deletePost(idx);
                        // @ts-ignore
                        [deletePost,];
                    } },
                ...{ class: "!text-gray-400  hover:text-red-500 text-xs" },
            });
            __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
                ...{ class: "text-gray-700 text-sm mt-1" },
            });
            (post.content);
            if (post.media) {
                __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                    ...{ class: "mt-2 p-2 bg-gray-300 rounded text-center text-sm" },
                });
                (post.media);
            }
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "flex gap-4 mt-3 text-sm" },
            });
            __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.showDemo))
                            return;
                        if (!!(__VLS_ctx.demoType === 'fid-connect'))
                            return;
                        if (!!(__VLS_ctx.demoType === 'qcp'))
                            return;
                        if (!(__VLS_ctx.demoType === 'afr-fan'))
                            return;
                        __VLS_ctx.likePost(idx);
                        // @ts-ignore
                        [likePost,];
                    } },
                ...{ class: "flex items-center gap-1 !text-gray-500" },
            });
            (post.likes);
            __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.showDemo))
                            return;
                        if (!!(__VLS_ctx.demoType === 'fid-connect'))
                            return;
                        if (!!(__VLS_ctx.demoType === 'qcp'))
                            return;
                        if (!(__VLS_ctx.demoType === 'afr-fan'))
                            return;
                        __VLS_ctx.toggleComment(idx);
                        // @ts-ignore
                        [toggleComment,];
                    } },
                ...{ class: "flex items-center gap-1 !text-gray-500" },
            });
            (post.comments.length);
            if (__VLS_ctx.showComments === idx) {
                // @ts-ignore
                [showComments,];
                __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                    ...{ class: "mt-3 pt-3 border-t" },
                });
                __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                    ...{ class: "flex gap-2 mb-2" },
                });
                __VLS_asFunctionalElement(__VLS_elements.input)({
                    ...{ onKeyup: (...[$event]) => {
                            if (!(__VLS_ctx.showDemo))
                                return;
                            if (!!(__VLS_ctx.demoType === 'fid-connect'))
                                return;
                            if (!!(__VLS_ctx.demoType === 'qcp'))
                                return;
                            if (!(__VLS_ctx.demoType === 'afr-fan'))
                                return;
                            if (!(__VLS_ctx.showComments === idx))
                                return;
                            __VLS_ctx.addComment(idx);
                            // @ts-ignore
                            [addComment,];
                        } },
                    type: "text",
                    value: (post.newComment),
                    placeholder: (__VLS_ctx.$t('demo.afr_fan.write_comment')),
                    ...{ class: "flex-1 p-1 border rounded text-sm" },
                });
                // @ts-ignore
                [$t,];
                __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
                    ...{ onClick: (...[$event]) => {
                            if (!(__VLS_ctx.showDemo))
                                return;
                            if (!!(__VLS_ctx.demoType === 'fid-connect'))
                                return;
                            if (!!(__VLS_ctx.demoType === 'qcp'))
                                return;
                            if (!(__VLS_ctx.demoType === 'afr-fan'))
                                return;
                            if (!(__VLS_ctx.showComments === idx))
                                return;
                            __VLS_ctx.addComment(idx);
                            // @ts-ignore
                            [addComment,];
                        } },
                    ...{ class: "bg-violet-2000 text-white px-2 py-1 rounded text-xs" },
                });
                __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                    ...{ class: "space-y-2 max-h-32 overflow-y-auto" },
                });
                for (const [comment, cIdx] of __VLS_getVForSourceType((post.comments))) {
                    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                        key: (cIdx),
                        ...{ class: "text-sm" },
                    });
                    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
                        ...{ class: "font-semibold" },
                    });
                    (comment.author);
                    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
                        ...{ class: "text-gray-600 ml-1" },
                    });
                    (comment.content);
                }
            }
        }
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-white rounded-lg shadow p-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-between items-center mb-3" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h5, __VLS_elements.h5)({
            ...{ class: "font-semibold text-gray-800" },
        });
        (__VLS_ctx.$t('demo.afr_fan.groups_title'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.createGroup) },
            ...{ class: "btn-violet inline-block text-center btn-effect-5" },
        });
        // @ts-ignore
        [createGroup,];
        (__VLS_ctx.$t('demo.afr_fan.btn_create'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-2 max-h-48 overflow-y-auto" },
        });
        for (const [group, idx] of __VLS_getVForSourceType((__VLS_ctx.groups))) {
            // @ts-ignore
            [groups,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.showDemo))
                            return;
                        if (!!(__VLS_ctx.demoType === 'fid-connect'))
                            return;
                        if (!!(__VLS_ctx.demoType === 'qcp'))
                            return;
                        if (!(__VLS_ctx.demoType === 'afr-fan'))
                            return;
                        __VLS_ctx.joinGroup(idx);
                        // @ts-ignore
                        [joinGroup,];
                    } },
                key: (idx),
                ...{ class: "flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer" },
            });
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "font-medium text-gray-800 text-sm" },
            });
            (group.name);
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "text-xs text-gray-500" },
            });
            (group.members);
            __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
                ...{ class: "text-xs font-medium transition btn-effect-20" },
                ...{ class: (group.joined ? 'text-green-600' : 'text-violet-500') },
            });
            (group.joined ? __VLS_ctx.$t('demo.afr_fan.member') : __VLS_ctx.$t('demo.afr_fan.join'));
            // @ts-ignore
            [$t, $t,];
        }
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg shadow p-4 border border-amber-200" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex items-center gap-2 mb-3" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "text-2xl" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h5, __VLS_elements.h5)({
            ...{ class: "font-bold text-gray-800" },
        });
        (__VLS_ctx.$t('demo.afr_fan.premium_title'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded" },
        });
        (__VLS_ctx.$t('demo.afr_fan.popular'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-sm text-gray-600 mb-3" },
        });
        (__VLS_ctx.$t('demo.afr_fan.premium_desc'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({
            ...{ class: "text-xs text-gray-600 space-y-1 mb-3" },
        });
        __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
        (__VLS_ctx.$t('demo.afr_fan.premium_1'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
        (__VLS_ctx.$t('demo.afr_fan.premium_2'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
        (__VLS_ctx.$t('demo.afr_fan.premium_3'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
        (__VLS_ctx.$t('demo.afr_fan.premium_4'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-3" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex gap-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.showDemo))
                        return;
                    if (!!(__VLS_ctx.demoType === 'fid-connect'))
                        return;
                    if (!!(__VLS_ctx.demoType === 'qcp'))
                        return;
                    if (!(__VLS_ctx.demoType === 'afr-fan'))
                        return;
                    __VLS_ctx.selectedPlan = 'monthly';
                    // @ts-ignore
                    [selectedPlan,];
                } },
            ...{ class: "flex-1 py-2 rounded text-sm font-medium transition" },
            ...{ class: (__VLS_ctx.selectedPlan === 'monthly' ? 'bg-violet-600 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400') },
        });
        // @ts-ignore
        [selectedPlan,];
        (__VLS_ctx.$t('demo.afr_fan.monthly'));
        __VLS_asFunctionalElement(__VLS_elements.br)({});
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "font-bold" },
        });
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.showDemo))
                        return;
                    if (!!(__VLS_ctx.demoType === 'fid-connect'))
                        return;
                    if (!!(__VLS_ctx.demoType === 'qcp'))
                        return;
                    if (!(__VLS_ctx.demoType === 'afr-fan'))
                        return;
                    __VLS_ctx.selectedPlan = 'yearly';
                    // @ts-ignore
                    [selectedPlan,];
                } },
            ...{ class: "flex-1 py-2 rounded text-sm font-medium transition relative" },
            ...{ class: (__VLS_ctx.selectedPlan === 'yearly' ? 'bg-violet-600 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400') },
        });
        // @ts-ignore
        [selectedPlan,];
        (__VLS_ctx.$t('demo.afr_fan.yearly'));
        __VLS_asFunctionalElement(__VLS_elements.br)({});
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "font-bold" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "absolute top-1 right-1 text-[10px] bg-green-500 text-white px-1 rounded" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex gap-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.showDemo))
                        return;
                    if (!!(__VLS_ctx.demoType === 'fid-connect'))
                        return;
                    if (!!(__VLS_ctx.demoType === 'qcp'))
                        return;
                    if (!(__VLS_ctx.demoType === 'afr-fan'))
                        return;
                    __VLS_ctx.paymentMethod = 'visa';
                    // @ts-ignore
                    [paymentMethod,];
                } },
            ...{ class: "flex-1 py-2 border rounded text-sm transition" },
            ...{ class: (__VLS_ctx.paymentMethod === 'visa' ? 'border-violet-500 bg-violet-400' : 'bg-violet-200 text-white') },
        });
        // @ts-ignore
        [paymentMethod,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.showDemo))
                        return;
                    if (!!(__VLS_ctx.demoType === 'fid-connect'))
                        return;
                    if (!!(__VLS_ctx.demoType === 'qcp'))
                        return;
                    if (!(__VLS_ctx.demoType === 'afr-fan'))
                        return;
                    __VLS_ctx.paymentMethod = 'paypal';
                    // @ts-ignore
                    [paymentMethod,];
                } },
            ...{ class: "flex-1 py-2 border rounded text-sm transition" },
            ...{ class: (__VLS_ctx.paymentMethod === 'paypal' ? 'border-violet-500 bg-violet-400 text-white' : 'bg-violet-200 text-white') },
        });
        // @ts-ignore
        [paymentMethod,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.processPayment) },
            disabled: (__VLS_ctx.isProcessing),
            ...{ class: "w-full btn-effect-5-submit rounded text-sm font-medium" },
        });
        // @ts-ignore
        [processPayment, isProcessing,];
        (__VLS_ctx.isProcessing ? __VLS_ctx.$t('demo.afr_fan.processing') :
            __VLS_ctx.$t('demo.afr_fan.support_now'));
        // @ts-ignore
        [$t, $t, isProcessing,];
        if (__VLS_ctx.paymentMessage) {
            // @ts-ignore
            [paymentMessage,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "text-center text-sm p-2 rounded" },
                ...{ class: (__VLS_ctx.paymentMessage.includes('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700') },
            });
            // @ts-ignore
            [paymentMessage,];
            (__VLS_ctx.paymentMessage);
            // @ts-ignore
            [paymentMessage,];
        }
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-white rounded-lg shadow p-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h5, __VLS_elements.h5)({
            ...{ class: "font-semibold text-gray-800 mb-2" },
        });
        (__VLS_ctx.$t('demo.afr_fan.stats_title'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "grid grid-cols-2 gap-3 text-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-2xl font-bold text-violet-600" },
        });
        (__VLS_ctx.stats.members);
        // @ts-ignore
        [stats,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-xs text-gray-500" },
        });
        (__VLS_ctx.$t('demo.afr_fan.stats_members'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-2xl font-bold text-violet-600" },
        });
        (__VLS_ctx.stats.posts);
        // @ts-ignore
        [stats,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-xs text-gray-500" },
        });
        (__VLS_ctx.$t('demo.afr_fan.stats_posts'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-2xl font-bold text-violet-600" },
        });
        (__VLS_ctx.stats.groups);
        // @ts-ignore
        [stats,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-xs text-gray-500" },
        });
        (__VLS_ctx.$t('demo.afr_fan.stats_groups'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-2xl font-bold text-violet-600" },
        });
        (__VLS_ctx.stats.countries);
        // @ts-ignore
        [stats,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-xs text-gray-500" },
        });
        (__VLS_ctx.$t('demo.afr_fan.stats_countries'));
        // @ts-ignore
        [$t,];
    }
    else if (__VLS_ctx.demoType === 'nurses') {
        // @ts-ignore
        [demoType,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "p-6 bg-gray-50" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "grid grid-cols-1 lg:grid-cols-2 gap-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
            ...{ class: "font-bold text-gray-800 flex items-center gap-2" },
        });
        (__VLS_ctx.$t('demo.nurses.title'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-white rounded-lg shadow p-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
            ...{ class: "text-sm text-gray-600 font-medium" },
        });
        (__VLS_ctx.$t('demo.nurses.guests'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex items-center gap-2 mt-1" },
        });
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.showDemo))
                        return;
                    if (!!(__VLS_ctx.demoType === 'fid-connect'))
                        return;
                    if (!!(__VLS_ctx.demoType === 'qcp'))
                        return;
                    if (!!(__VLS_ctx.demoType === 'afr-fan'))
                        return;
                    if (!(__VLS_ctx.demoType === 'nurses'))
                        return;
                    __VLS_ctx.booking.guests = Math.max(1, __VLS_ctx.booking.guests - 1);
                    // @ts-ignore
                    [booking, booking,];
                } },
            ...{ class: "w-8 h-8 rounded-full bg-violet-400 hover:bg-violet-300 transition flex items-center justify-center text-lg font-bold" },
        });
        __VLS_asFunctionalElement(__VLS_elements.input)({
            type: "number",
            min: "1",
            max: "50",
            ...{ class: "flex-1 p-2 border rounded text-center" },
        });
        (__VLS_ctx.booking.guests);
        // @ts-ignore
        [booking,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.showDemo))
                        return;
                    if (!!(__VLS_ctx.demoType === 'fid-connect'))
                        return;
                    if (!!(__VLS_ctx.demoType === 'qcp'))
                        return;
                    if (!!(__VLS_ctx.demoType === 'afr-fan'))
                        return;
                    if (!(__VLS_ctx.demoType === 'nurses'))
                        return;
                    __VLS_ctx.booking.guests = Math.min(50, __VLS_ctx.booking.guests + 1);
                    // @ts-ignore
                    [booking, booking,];
                } },
            ...{ class: "w-8 h-8 rounded-full bg-violet-400 hover:bg-violet-300 transition flex items-center justify-center text-lg font-bold" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
            ...{ class: "text-sm text-gray-600 font-medium" },
        });
        (__VLS_ctx.$t('demo.nurses.date'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.input)({
            type: "date",
            min: (__VLS_ctx.minDate),
            ...{ class: "w-full p-2 border rounded mt-1" },
        });
        (__VLS_ctx.booking.date);
        // @ts-ignore
        [booking, minDate,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
            ...{ class: "text-sm text-gray-600 font-medium" },
        });
        (__VLS_ctx.$t('demo.nurses.service'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
            value: (__VLS_ctx.booking.service),
            ...{ class: "w-full p-2 border rounded mt-1" },
        });
        // @ts-ignore
        [booking,];
        __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
            value: "midi",
        });
        (__VLS_ctx.$t('demo.nurses.serv_lunch'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
            value: "soir",
        });
        (__VLS_ctx.$t('demo.nurses.serv_dinner'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
            value: "vip",
        });
        (__VLS_ctx.$t('demo.nurses.serv_vip'));
        // @ts-ignore
        [$t,];
        if (__VLS_ctx.booking.service === 'vip') {
            // @ts-ignore
            [booking,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "p-3 bg-amber-50 rounded border border-amber-200" },
            });
            __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
                ...{ class: "text-sm text-amber-800" },
            });
            (__VLS_ctx.$t('demo.nurses.vip_inc'));
            // @ts-ignore
            [$t,];
            __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({
                ...{ class: "text-xs text-amber-700 mt-1 space-y-1" },
            });
            __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
            (__VLS_ctx.$t('demo.nurses.vip_1'));
            // @ts-ignore
            [$t,];
            __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
            (__VLS_ctx.$t('demo.nurses.vip_2'));
            // @ts-ignore
            [$t,];
            __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
            (__VLS_ctx.$t('demo.nurses.vip_3'));
            // @ts-ignore
            [$t,];
        }
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.makeReservation) },
            ...{ class: "w-full btn-violet inline-block text-center btn-effect-5 py-2 rounded-lg" },
        });
        // @ts-ignore
        [makeReservation,];
        (__VLS_ctx.$t('demo.nurses.btn_reserve'));
        // @ts-ignore
        [$t,];
        if (__VLS_ctx.reservationMessage) {
            // @ts-ignore
            [reservationMessage,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: (['p-3 rounded text-center', __VLS_ctx.reservationMessage.includes('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']) },
            });
            // @ts-ignore
            [reservationMessage,];
            (__VLS_ctx.reservationMessage);
            // @ts-ignore
            [reservationMessage,];
        }
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
            ...{ class: "font-bold text-gray-800 flex items-center gap-2" },
        });
        (__VLS_ctx.$t('demo.nurses.events_title'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-white rounded-lg shadow p-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-3 max-h-90 overflow-y-auto" },
        });
        for (const [event, idx] of __VLS_getVForSourceType((__VLS_ctx.nurseEvents))) {
            // @ts-ignore
            [nurseEvents,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.showDemo))
                            return;
                        if (!!(__VLS_ctx.demoType === 'fid-connect'))
                            return;
                        if (!!(__VLS_ctx.demoType === 'qcp'))
                            return;
                        if (!!(__VLS_ctx.demoType === 'afr-fan'))
                            return;
                        if (!(__VLS_ctx.demoType === 'nurses'))
                            return;
                        __VLS_ctx.selectNurseEvent(idx);
                        // @ts-ignore
                        [selectNurseEvent,];
                    } },
                key: (idx),
                ...{ class: "border rounded-lg p-3 hover:shadow-md transition cursor-pointer" },
                ...{ class: ({ 'border-amber-400 bg-amber-50': __VLS_ctx.selectedEvent === idx }) },
            });
            // @ts-ignore
            [selectedEvent,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "flex justify-between items-start" },
            });
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "font-semibold text-gray-800" },
            });
            (event.title);
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "text-sm text-gray-600" },
            });
            (event.date);
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "text-xs text-gray-500" },
            });
            (event.participants);
            (__VLS_ctx.$t('demo.nurses.participants'));
            // @ts-ignore
            [$t,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "text-right" },
            });
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "text-sm font-semibold text-amber-600" },
            });
            (event.price);
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "text-xs" },
                ...{ class: (event.spots > 10 ? 'text-green-600' : 'text-orange-600') },
            });
            (event.spots);
            (__VLS_ctx.$t('demo.nurses.remaining'));
            // @ts-ignore
            [$t,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "mt-2 flex gap-2" },
            });
            __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
                ...{ class: "text-xs px-2 py-1 rounded-full" },
                ...{ class: (event.type === 'gala' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700') },
            });
            (event.type === 'gala' ? __VLS_ctx.$t('demo.nurses.event_gala') :
                __VLS_ctx.$t('demo.nurses.event_degust'));
            // @ts-ignore
            [$t, $t,];
            __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
                ...{ class: "text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600" },
            });
            (event.time);
        }
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.reserveEvent) },
            disabled: (__VLS_ctx.selectedEvent === null),
            ...{ class: "w-full btn-effect-5-submit transition disabled:opacity-50 disabled:cursor-not-allowed mt-4" },
        });
        // @ts-ignore
        [selectedEvent, reserveEvent,];
        (__VLS_ctx.$t('demo.nurses.btn_reserve_event'));
        // @ts-ignore
        [$t,];
        if (__VLS_ctx.eventReservationMessage) {
            // @ts-ignore
            [eventReservationMessage,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "text-center text-sm p-2 rounded mt-2" },
                ...{ class: (__VLS_ctx.eventReservationMessage.includes('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700') },
            });
            // @ts-ignore
            [eventReservationMessage,];
            (__VLS_ctx.eventReservationMessage);
            // @ts-ignore
            [eventReservationMessage,];
        }
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "mt-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow p-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-between items-center mb-3" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
            ...{ class: "font-bold text-white flex items-center gap-2" },
        });
        (__VLS_ctx.$t('demo.nurses.admin_title'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-3" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "grid grid-cols-2 md:grid-cols-4 gap-3" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-white/10 rounded p-2 text-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-2xl font-bold text-white" },
        });
        (__VLS_ctx.adminStats.totalReservations);
        // @ts-ignore
        [adminStats,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-xs text-gray-300" },
        });
        (__VLS_ctx.$t('demo.nurses.admin_res'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-white/10 rounded p-2 text-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-2xl font-bold text-white" },
        });
        (__VLS_ctx.adminStats.vipReservations);
        // @ts-ignore
        [adminStats,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-xs text-gray-300" },
        });
        (__VLS_ctx.$t('demo.nurses.admin_vip'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-white/10 rounded p-2 text-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-2xl font-bold text-white" },
        });
        (__VLS_ctx.adminStats.totalGuests);
        // @ts-ignore
        [adminStats,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-xs text-gray-300" },
        });
        (__VLS_ctx.$t('demo.nurses.admin_guests'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-white/10 rounded p-2 text-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-2xl font-bold text-white" },
        });
        (__VLS_ctx.nurseEvents.length);
        // @ts-ignore
        [nurseEvents,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-xs text-gray-300" },
        });
        (__VLS_ctx.$t('demo.nurses.admin_events'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex gap-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.addDemoEvent) },
            ...{ class: "flex-1 bg-violet-600 text-white py-1 rounded text-sm hover:bg-violet-700 transition" },
        });
        // @ts-ignore
        [addDemoEvent,];
        (__VLS_ctx.$t('demo.nurses.btn_add_event'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.resetDemoData) },
            ...{ class: "flex-1 bg-orange-600 text-white py-1 rounded text-sm hover:bg-orange-700 transition" },
        });
        // @ts-ignore
        [resetDemoData,];
        (__VLS_ctx.$t('demo.nurses.btn_reset'));
        // @ts-ignore
        [$t,];
    }
    else if (__VLS_ctx.demoType === 'echo-webLine') {
        // @ts-ignore
        [demoType,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "p-6 bg-gray-50" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "grid grid-cols-1 lg:grid-cols-2 gap-6" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
            ...{ class: "font-bold text-gray-800 flex items-center gap-2" },
        });
        (__VLS_ctx.$t('demo.echo.title'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-white rounded-lg shadow p-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-between items-center mb-3" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "font-semibold text-gray-700" },
        });
        (__VLS_ctx.$t('demo.nurses.events_title'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.addEvent) },
            ...{ class: "btn-violet inline-block text-center btn-effect-5" },
        });
        // @ts-ignore
        [addEvent,];
        (__VLS_ctx.$t('demo.echo.btn_new'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-2 max-h-64 overflow-y-auto" },
        });
        for (const [event, idx] of __VLS_getVForSourceType((__VLS_ctx.events))) {
            // @ts-ignore
            [events,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.showDemo))
                            return;
                        if (!!(__VLS_ctx.demoType === 'fid-connect'))
                            return;
                        if (!!(__VLS_ctx.demoType === 'qcp'))
                            return;
                        if (!!(__VLS_ctx.demoType === 'afr-fan'))
                            return;
                        if (!!(__VLS_ctx.demoType === 'nurses'))
                            return;
                        if (!(__VLS_ctx.demoType === 'echo-webLine'))
                            return;
                        __VLS_ctx.selectEvent(idx);
                        // @ts-ignore
                        [selectEvent,];
                    } },
                key: (idx),
                ...{ class: "p-3 border rounded-lg hover:shadow-md transition cursor-pointer" },
                ...{ class: ({ 'border-violet-300 bg-violet-200': __VLS_ctx.selectedEvent === idx }) },
            });
            // @ts-ignore
            [selectedEvent,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "flex justify-between items-start" },
            });
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "font-semibold text-gray-800" },
            });
            (event.title);
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "text-sm text-gray-600" },
            });
            (event.date);
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "text-xs text-gray-500" },
            });
            (event.participants);
            (__VLS_ctx.$t('demo.nurses.participants'));
            // @ts-ignore
            [$t,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "flex gap-1 items-center space-x-6" },
            });
            __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
                ...{ class: "text-xs px-2 py-1 rounded" },
                ...{ class: (event.status === 'ouvert' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700') },
            });
            (event.status === 'ouvert' ? __VLS_ctx.$t('demo.echo.status_open') :
                __VLS_ctx.$t('demo.echo.status_full'));
            // @ts-ignore
            [$t, $t,];
            __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.showDemo))
                            return;
                        if (!!(__VLS_ctx.demoType === 'fid-connect'))
                            return;
                        if (!!(__VLS_ctx.demoType === 'qcp'))
                            return;
                        if (!!(__VLS_ctx.demoType === 'afr-fan'))
                            return;
                        if (!!(__VLS_ctx.demoType === 'nurses'))
                            return;
                        if (!(__VLS_ctx.demoType === 'echo-webLine'))
                            return;
                        __VLS_ctx.deleteEvent(idx);
                        // @ts-ignore
                        [deleteEvent,];
                    } },
                ...{ class: "btn-effect-5-delete" },
            });
            (__VLS_ctx.$t('demo.echo.btn_delete'));
            // @ts-ignore
            [$t,];
        }
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-white rounded-lg shadow p-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h5, __VLS_elements.h5)({
            ...{ class: "font-semibold text-gray-700 mb-3" },
        });
        (__VLS_ctx.$t('demo.echo.form_title'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-3" },
        });
        __VLS_asFunctionalElement(__VLS_elements.input)({
            type: "text",
            value: (__VLS_ctx.registration.name),
            placeholder: (__VLS_ctx.$t('demo.echo.form_name')),
            ...{ class: "w-full p-2 border rounded text-sm" },
        });
        // @ts-ignore
        [$t, registration,];
        __VLS_asFunctionalElement(__VLS_elements.input)({
            type: "email",
            placeholder: (__VLS_ctx.$t('demo.echo.form_email')),
            ...{ class: "w-full p-2 border rounded text-sm" },
        });
        (__VLS_ctx.registration.email);
        // @ts-ignore
        [$t, registration,];
        __VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
            value: (__VLS_ctx.registration.eventId),
            ...{ class: "w-full p-2 border rounded text-sm" },
        });
        // @ts-ignore
        [registration,];
        __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
            value: "",
        });
        (__VLS_ctx.$t('demo.echo.select_event'));
        // @ts-ignore
        [$t,];
        for (const [event, idx] of __VLS_getVForSourceType((__VLS_ctx.events))) {
            // @ts-ignore
            [events,];
            __VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
                key: (idx),
                value: (idx),
                disabled: (event.status === 'complet'),
            });
            (event.title);
            (event.status === 'complet' ? 'Complet' :
                'Disponible');
        }
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.registerToEvent) },
            ...{ class: "w-full btn-violet inline-block text-center btn-effect-5" },
        });
        // @ts-ignore
        [registerToEvent,];
        (__VLS_ctx.$t('demo.echo.btn_register'));
        // @ts-ignore
        [$t,];
        if (__VLS_ctx.registrationMessage) {
            // @ts-ignore
            [registrationMessage,];
            __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
                ...{ class: "text-xs text-center italic p-2 w-fit flex justify-center rounded mx-auto" },
                ...{ class: (__VLS_ctx.registrationMessage.includes('✓')
                        ? 'text-green-600 border-1 border-green-600'
                        : 'text-red-600 border-1 border-red-600') },
            });
            // @ts-ignore
            [registrationMessage,];
            (__VLS_ctx.registrationMessage);
            // @ts-ignore
            [registrationMessage,];
        }
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
            ...{ class: "font-bold text-gray-800 flex items-center gap-2" },
        });
        (__VLS_ctx.$t('demo.echo.cardio_title'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-white rounded-lg shadow p-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-between items-center mb-3" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "font-semibold text-gray-700" },
        });
        (__VLS_ctx.$t('demo.echo.params'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-3" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-between text-sm" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (__VLS_ctx.$t('demo.echo.heart_rate'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "font-semibold" },
            ...{ class: (__VLS_ctx.heartData.heartRate > 100 ? 'text-red-600' : 'text-green-600') },
        });
        // @ts-ignore
        [heartData,];
        (__VLS_ctx.heartData.heartRate);
        // @ts-ignore
        [heartData,];
        __VLS_asFunctionalElement(__VLS_elements.input)({
            type: "range",
            min: "40",
            max: "180",
            step: "1",
            ...{ class: "w-full mt-1" },
        });
        (__VLS_ctx.heartData.heartRate);
        // @ts-ignore
        [heartData,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-between text-sm" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (__VLS_ctx.$t('demo.echo.blood_press'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "font-semibold" },
        });
        (__VLS_ctx.heartData.systolic);
        (__VLS_ctx.heartData.diastolic);
        // @ts-ignore
        [heartData, heartData,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex gap-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.input)({
            type: "range",
            min: "80",
            max: "200",
            step: "1",
            ...{ class: "w-full mt-1" },
        });
        (__VLS_ctx.heartData.systolic);
        // @ts-ignore
        [heartData,];
        __VLS_asFunctionalElement(__VLS_elements.input)({
            type: "range",
            min: "50",
            max: "120",
            step: "1",
            ...{ class: "w-full mt-1" },
        });
        (__VLS_ctx.heartData.diastolic);
        // @ts-ignore
        [heartData,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-between text-sm" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (__VLS_ctx.$t('demo.echo.oxygen'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "font-semibold" },
            ...{ class: (__VLS_ctx.heartData.oxygen < 94 ? 'text-orange-600' : 'text-green-600') },
        });
        // @ts-ignore
        [heartData,];
        (__VLS_ctx.heartData.oxygen);
        // @ts-ignore
        [heartData,];
        __VLS_asFunctionalElement(__VLS_elements.input)({
            type: "range",
            min: "70",
            max: "100",
            step: "1",
            ...{ class: "w-full mt-1" },
        });
        (__VLS_ctx.heartData.oxygen);
        // @ts-ignore
        [heartData,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.simulateHeartData) },
            ...{ class: "w-1/2 btn-violet inline-block text-center btn-effect-5" },
        });
        // @ts-ignore
        [simulateHeartData,];
        (__VLS_ctx.$t('demo.echo.btn_simData'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-white rounded-lg shadow p-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h5, __VLS_elements.h5)({
            ...{ class: "font-semibold text-gray-700 mb-2" },
        });
        (__VLS_ctx.$t('demo.echo.hist_title'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "relative h-32" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "absolute bottom-0 left-0 right-0 flex items-end justify-between h-full" },
        });
        for (const [point, idx] of __VLS_getVForSourceType((__VLS_ctx.heartHistory))) {
            // @ts-ignore
            [heartHistory,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                key: (idx),
                ...{ class: "flex flex-col items-center" },
                ...{ style: {} },
            });
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "w-full bg-violet-400 rounded-t transition-all duration-300" },
                ...{ style: ({ height: (point.heartRate / 180 * 100) + '%', minHeight: '4px' }) },
            });
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "text-xs text-gray-500 mt-1" },
            });
            (point.time);
        }
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-center text-xs text-gray-500 mt-4" },
        });
        (__VLS_ctx.$t('demo.echo.last_8'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "bg-white rounded-lg shadow p-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h5, __VLS_elements.h5)({
            ...{ class: "font-semibold text-gray-700 mb-2" },
        });
        (__VLS_ctx.$t('demo.echo.resources_title'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "space-y-2" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-between items-center p-2 bg-gray-50 rounded" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "text-sm" },
        });
        (__VLS_ctx.$t('demo.echo.guide'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.downloadResource) },
            ...{ class: "btn-violet inline-block text-center btn-effect-5" },
        });
        // @ts-ignore
        [downloadResource,];
        (__VLS_ctx.$t('demo.echo.btn_download'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "flex justify-between items-center p-2 bg-gray-50 rounded" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "text-sm" },
        });
        (__VLS_ctx.$t('demo.echo.webinar'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.downloadResource) },
            ...{ class: "btn-violet inline-block text-center btn-effect-5" },
        });
        // @ts-ignore
        [downloadResource,];
        (__VLS_ctx.$t('demo.echo.btn_view'));
        // @ts-ignore
        [$t,];
        if (__VLS_ctx.downloadMessage) {
            // @ts-ignore
            [downloadMessage,];
            __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
                ...{ class: "text-xs text-green-600 mt-2 text-center" },
            });
            (__VLS_ctx.downloadMessage);
            // @ts-ignore
            [downloadMessage,];
        }
    }
    else {
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "p-6 bg-gray-50" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-center" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-6xl mb-4" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({
            ...{ class: "font-bold text-gray-800 mb-2" },
        });
        (__VLS_ctx.$t('demo.in_dev.title'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "text-gray-600" },
        });
        (__VLS_ctx.$t('demo.in_dev.desc'));
        // @ts-ignore
        [$t,];
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            ...{ onClick: (__VLS_ctx.notifyDemo) },
            ...{ class: "mt-4 bg-violet-2000 text-white px-4 py-2 rounded hover:bg-violet-600 transition" },
        });
        // @ts-ignore
        [notifyDemo,];
        (__VLS_ctx.$t('demo.in_dev.btn_notify'));
        // @ts-ignore
        [$t,];
    }
}
var __VLS_13;
if (__VLS_ctx.showGroupModal) {
    // @ts-ignore
    [showGroupModal,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ onClick: (__VLS_ctx.cancelCreateGroup) },
        ...{ class: "fixed inset-0 flex items-center justify-center z-50" },
    });
    // @ts-ignore
    [cancelCreateGroup,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "absolute inset-0 backdrop-blur-sm bg-white/30" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "relative bg-white rounded-xl shadow-2xl p-6 w-96 max-w-[90%] transform transition-all animate-fade-in" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex justify-between items-center mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "text-lg font-bold text-gray-800" },
    });
    (__VLS_ctx.$t('demo.group_modal.title'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        ...{ class: "block text-sm font-medium text-gray-700 mb-2" },
    });
    (__VLS_ctx.$t('demo.group_modal.label'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.input)({
        ...{ onKeyup: (__VLS_ctx.confirmCreateGroup) },
        type: "text",
        value: (__VLS_ctx.newGroupName),
        placeholder: (__VLS_ctx.$t('demo.group_modal.placeholder')),
        ...{ class: "w-full p-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition" },
        autofocus: true,
    });
    // @ts-ignore
    [$t, confirmCreateGroup, newGroupName,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "flex gap-2 space-x-4 justify-center" },
    });
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.cancelCreateGroup) },
        ...{ class: "btn-violet btn-effect-5" },
    });
    // @ts-ignore
    [cancelCreateGroup,];
    (__VLS_ctx.$t('demo.group_modal.btn_cancel'));
    // @ts-ignore
    [$t,];
    __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
        ...{ onClick: (__VLS_ctx.confirmCreateGroup) },
        disabled: (__VLS_ctx.isCreatingGroup),
        ...{ class: "btn-violet btn-effect-5" },
    });
    // @ts-ignore
    [confirmCreateGroup, isCreatingGroup,];
    (__VLS_ctx.isCreatingGroup ? __VLS_ctx.$t('demo.group_modal.creating') : __VLS_ctx.$t('demo.group_modal.btn_create'));
    // @ts-ignore
    [$t, $t, isCreatingGroup,];
}
/** @type {__VLS_StyleScopedClasses['project-container']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-16']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['md:h-[400px]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:gap-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mySwiper']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['md:w-2/3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border-1']} */ ;
/** @type {__VLS_StyleScopedClasses['border-violet-300']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:scale-105']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:bg-opacity-10']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['md:w-1/3']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:mt-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-800']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-section']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-header']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['demo-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-violet-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-violet-500']} */ ;
/** @type {__VLS_StyleScopedClasses['to-purple-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-700']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-violet']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-50']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-orange-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-2']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-violet-500']} */ ;
/** @type {__VLS_StyleScopedClasses['to-purple-600']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['resize-none']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-violet-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-violet-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-violet']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:bg-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-[700px]']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['!text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['!text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['!text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-violet-2000']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-32']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-violet']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-48']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-20']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-amber-50']} */ ;
/** @type {__VLS_StyleScopedClasses['to-orange-50']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-amber-200']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-amber-200']} */ ;
/** @type {__VLS_StyleScopedClasses['text-amber-800']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1']} */ ;
/** @type {__VLS_StyleScopedClasses['right-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5-submit']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-violet-400']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-violet-300']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-violet-400']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-violet-300']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-amber-50']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-amber-200']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-amber-800']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-amber-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-violet']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-90']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['border-amber-400']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-amber-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-amber-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5-submit']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['to-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-4']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/10']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/10']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/10']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/10']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-violet-700']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-orange-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-orange-700']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-violet']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-64']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['border-violet-300']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-violet-200']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5-delete']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-violet']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['italic']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-fit']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-violet']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['h-32']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-end']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-violet-400']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-t']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-violet']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-violet']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-violet-2000']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-violet-600']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/30']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-96']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[90%]']} */ ;
/** @type {__VLS_StyleScopedClasses['transform']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-fade-in']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-violet-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-violet-500']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-4']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-violet']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-violet']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-effect-5']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        Swiper: Swiper,
        SwiperSlide: SwiperSlide,
        Pagination: Pagination,
        Autoplay: Autoplay,
        showDemo: showDemo,
        toggleDemo: toggleDemo,
        demoType: demoType,
        fiscalData: fiscalData,
        taxableResult: taxableResult,
        vatAmount: vatAmount,
        docMessage: docMessage,
        generateTaxDeclaration: generateTaxDeclaration,
        generateDocument: generateDocument,
        loan: loan,
        monthlyPayment: monthlyPayment,
        totalPayment: totalPayment,
        totalInterest: totalInterest,
        amortizationPercent: amortizationPercent,
        booking: booking,
        reservationMessage: reservationMessage,
        minDate: minDate,
        nurseEvents: nurseEvents,
        eventReservationMessage: eventReservationMessage,
        adminStats: adminStats,
        makeReservation: makeReservation,
        selectNurseEvent: selectNurseEvent,
        reserveEvent: reserveEvent,
        addDemoEvent: addDemoEvent,
        resetDemoData: resetDemoData,
        events: events,
        selectedEvent: selectedEvent,
        registration: registration,
        registrationMessage: registrationMessage,
        downloadMessage: downloadMessage,
        heartData: heartData,
        heartHistory: heartHistory,
        addEvent: addEvent,
        selectEvent: selectEvent,
        deleteEvent: deleteEvent,
        registerToEvent: registerToEvent,
        simulateHeartData: simulateHeartData,
        downloadResource: downloadResource,
        formatCurrency: formatCurrency,
        notifyDemo: notifyDemo,
        newPost: newPost,
        posts: posts,
        showComments: showComments,
        groups: groups,
        stats: stats,
        selectedPlan: selectedPlan,
        paymentMethod: paymentMethod,
        isProcessing: isProcessing,
        paymentMessage: paymentMessage,
        createPost: createPost,
        addMediaPost: addMediaPost,
        addEventPost: addEventPost,
        deletePost: deletePost,
        likePost: likePost,
        toggleComment: toggleComment,
        addComment: addComment,
        showGroupModal: showGroupModal,
        newGroupName: newGroupName,
        isCreatingGroup: isCreatingGroup,
        createGroup: createGroup,
        confirmCreateGroup: confirmCreateGroup,
        cancelCreateGroup: cancelCreateGroup,
        joinGroup: joinGroup,
        processPayment: processPayment,
    }),
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
