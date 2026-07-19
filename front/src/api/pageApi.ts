import type { PageSummary, PageDetail } from "../types/page"
import axiosInstance from "./axiosInstance"

export async function getPages(): Promise<PageSummary[]> {
    const response = 
        await axiosInstance.get<PageSummary[]>('/pages')
        
    return response.data
}

export async function getPageById(
    pageId: string,
    signal?: AbortSignal,
): Promise<PageDetail> {
    const response = await axiosInstance.get<PageDetail>(
        `/pages/${pageId}`,
        { signal },
    )

    return response.data
}