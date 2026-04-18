export interface Action {
    label: string
    type: 'route' | 'link' | 'download'
    target: string
    icon: string
}

export interface Message {
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
    actions?: Action[]
    messageId?: string
    category?: string
    confidence?: number
    allowFeedback?: boolean
    isAutoCorrection?: boolean
}

export interface IntentionDetection {
    category: string
    confidence: number
    matchedKeywords: string[]
}
