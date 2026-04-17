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
}
