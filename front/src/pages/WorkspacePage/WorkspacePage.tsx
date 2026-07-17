import WorkspaceLayout from "../../layouts/WorkspaceLayout/WorkspaceLayout"
import Sidebar from "../../components/Sidebar/Sidebar"
import PageEditor from "../../components/PageEditor/PageEditor"
import type { PageSummary } from "../../types/page"
import { useEffect, useState } from "react"
import { getPages } from "../../api/pageApi"

function WorkspacePage() {

    const [selectedPageId, setSelectedPageId] = useState<string | null>(null)
    const [pages, setPages] = useState<PageSummary[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPages = async () => {
            setIsLoading(true)
            setError(null)

            try {
                const data = await getPages()
                setPages(data)
            } catch (caughError){
                console.error(caughError)
                setError('문서 목록을 불러오지 못했습니다.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchPages()
    }, [])

    return (
        <WorkspaceLayout>
            <Sidebar 
                pages={pages}
                selectedPageId = {selectedPageId}
                onSelectPage = {setSelectedPageId}
                isLoading={isLoading}
                error={error}
            />
            <PageEditor/>
        </WorkspaceLayout>
    )
}

export default WorkspacePage