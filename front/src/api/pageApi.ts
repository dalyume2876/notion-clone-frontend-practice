import type { CreatePageRequest, PageSummary, PageDetail, UpdatePageRequest } from "../types/page"
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

export async function createPage(
    data: CreatePageRequest
): Promise<PageDetail> {
    const response = await axiosInstance.post<PageDetail>(
        `/pages`,
        data,
    )

    return response.data
}

export async function updatePage(
    pageId: string,
    data: UpdatePageRequest
): Promise<PageDetail> {
    const response = await axiosInstance.patch<PageDetail>(
        `/pages/${pageId}`,
        data,
    )

    return response.data
}

export async function deletePage(
    pageId: string,
): Promise<void> {
    await axiosInstance.delete(`/pages/${pageId}`)
}