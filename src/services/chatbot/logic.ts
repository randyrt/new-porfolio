import { TOPIC_KEYWORDS, PERSONAL_KEYWORDS } from './constants'
import { Action } from './types'

export const isOnTopic = (question: string): boolean => {
    const lowerQuestion = question.toLowerCase().trim()

    return TOPIC_KEYWORDS.some(keyword => {
        try {
            const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const regex = new RegExp(`\\b${escaped}\\b`, 'i')
            return regex.test(lowerQuestion)
        } catch (e) {
            return lowerQuestion.includes(keyword)
        }
    })
}

export const isPersonalInfoRequest = (question: string): boolean => {
    const lowerQuestion = question.toLowerCase().trim()

    return PERSONAL_KEYWORDS.some(keyword => {
        try {
            const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const regex = new RegExp(`\\b${escaped}\\b`, 'i')
            return regex.test(lowerQuestion)
        } catch (e) {
            return lowerQuestion.includes(keyword)
        }
    })
}

export const findLocalResponse = (userQuestion: string, kb: Record<string, string>): string | null => {
    const question = userQuestion.toLowerCase().trim()

    for (const [keywords, response] of Object.entries(kb)) {
        const keywordList = keywords.split('|')

        if (keywordList.some(keyword => {
            try {
                const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'i')
                return regex.test(question)
            } catch (e) {
                return question.includes(keyword.toLowerCase())
            }
        })) {
            return response
        }
    }
    return null
}

export const detectActions = (text: string, t: any): Action[] => {
    const actions: Action[] = []
    const lowerText = text.toLowerCase()

    if (lowerText.includes('cv') || lowerText.includes('curriculum') || lowerText.includes('parcours')) {
        actions.push({
            label: t('nav.home'),
            type: 'route',
            target: '/home',
            icon: 'fa-solid fa-home'
        })
        actions.push({
            label: t('nav.webcup'),
            type: 'route',
            target: '/webcup24',
            icon: 'fa-solid fa-trophy'
        })
        actions.push({
            label: t('home.download_cv'),
            type: 'download',
            target: '/images/cv/Randy_real_cv.pdf',
            icon: 'fa-solid fa-download'
        })
    }

    if (lowerText.includes('contact') || lowerText.includes('whatsapp') || lowerText.includes('joindre') || lowerText.includes('écrire') || lowerText.includes('message')) {
        actions.push({
            label: 'WhatsApp',
            type: 'link',
            target: 'https://wa.me/261333026839',
            icon: 'fa-brands fa-whatsapp'
        })
        actions.push({
            label: t('nav.contact'),
            type: 'route',
            target: '/contact',
            icon: 'fa-solid fa-envelope'
        })
    }

    const projectMap: Record<string, string> = {
        'fid-connect|fidconnect': 'fid-connect',
        'qcp': 'qcp',
        'echo-webline|echo webline': 'echo-webline',
        'afr-fan|afrfan': 'afr-fan',
        'nurse': 'nurses'
    }

    for (const [pattern, id] of Object.entries(projectMap)) {
        const regex = new RegExp(`\\b(?:${pattern})\\b`, 'i')
        if (regex.test(lowerText)) {
            actions.push({
                label: `${t('chat.actions.view')} ${id.replace('-', ' ').toUpperCase()}`,
                type: 'route',
                target: `/projects#${id}`,
                icon: 'fa-solid fa-arrow-right'
            })
        }
    }

    const techMap: Record<string, string> = {
        'laravel': 'laravel',
        'vue|nuxt': 'vue',
        'docker': 'docker',
        'mobile|ionic|flutter': 'mobile',
        'symfony': 'symfony',
        'python': 'python',
        'cicd|ci/cd': 'cicd'
    }

    for (const [pattern, id] of Object.entries(techMap)) {
        const regex = new RegExp(`\\b(?:${pattern})\\b`, 'i')
        if (regex.test(lowerText)) {
            actions.push({
                label: `${t('chat.actions.details')} ${id.toUpperCase()}`,
                type: 'route',
                target: `/skills#${id}`,
                icon: 'fa-solid fa-microchip'
            })
        }
    }

    if (lowerText.includes('webcup')) {
        actions.push({
            label: `${t('chat.actions.details')} WEBCUP`,
            type: 'route',
            target: '/webcup24',
            icon: 'fa-solid fa-trophy'
        })
    }

    if ((lowerText.includes('projet') || lowerText.includes('project')) && !actions.some(a => a.target.includes('/projects#'))) {
        actions.push({
            label: t('nav.projects'),
            type: 'route',
            target: '/projects',
            icon: 'fa-solid fa-layer-group'
        })
    }

    if ((lowerText.includes('compétence') || lowerText.includes('skill') || lowerText.includes('techno')) && !actions.some(a => a.target.includes('/skills#'))) {
        actions.push({
            label: t('nav.skills'),
            type: 'route',
            target: '/skills',
            icon: 'fa-solid fa-code'
        })
    }

    if (lowerText.includes('expérience') || lowerText.includes('career') || lowerText.includes('parcours')) {
        actions.push({
            label: t('nav.about'),
            type: 'route',
            target: '/about',
            icon: 'fa-solid fa-briefcase'
        })
    }

    return actions
}
