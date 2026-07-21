export interface PageSummary {
    id: string
    title: string
}

export interface PageDetail {
    id: string
    title: string
    content: string
    updatedAt: string
}

export interface CreatePageRequest {
    title: string
    content: string
    updatedAt: string
}

export interface UpdatePageRequest {
    title: string
    content: string
    updatedAt: string
}