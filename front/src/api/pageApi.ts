import type { PageSummary } from "../types/page"
import axiosInstance from "./axiosInstance"

export async function getPages(): Promise<PageSummary[]> {
    const response = 
        await axiosInstance.get<PageSummary[]>('/pages')
        
    return response.data
}