import WorkspaceLayout from "../../layouts/WorkspaceLayout/WorkspaceLayout"
import Sidebar from "../../components/Sidebar/Sidebar"
import PageEditor from "../../components/PageEditor/PageEditor"
import type { PageSummary, PageDetail } from "../../types/page"
import { useEffect, useState } from "react"
import { createPage, getPageById, getPages } from "../../api/pageApi"

function WorkspacePage() {

    const [selectedPageId, setSelectedPageId] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState<PageDetail | null>(null)
    const [isPageLoading, setIsPageLoading] = useState(false)
    const [pageError, setPageError] = useState<string | null>(null)
    const [pages, setPages] = useState<PageSummary[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isCreatingPage, setIsCreatingPage] = useState(false)
    const [createError, setCreateError] = useState<string | null>(null)

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

    useEffect(() => {
        if (selectedPageId === null) {
            return
        }

        const controller = new AbortController()

        const fetchPage = async () => {
            setIsPageLoading(true)
            setPageError(null)
            setCurrentPage(null)

            try {
                const data = await getPageById(
                    selectedPageId,
                    controller.signal,
                )
                setCurrentPage(data)
            } catch (caughError) {
                if(!controller.signal.aborted) {
                    console.error(caughError)
                    setPageError("문서를 불러오지 못했습니다.")
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsPageLoading(false)
                }
            }
        }

        fetchPage()

        return () => controller.abort()
    }, [selectedPageId])

    const handleCreatePage = async () => {
        if (isCreatingPage) {
            return
        }

        setIsCreatingPage(true)
        setCreateError(null)

        try {
            const createdPage = await createPage({
                title: "제목 없음",
                content: "",
                updatedAt: new Date().toISOString(),
            })

            const updatePages = await getPages()

            setPages(updatePages)
            setSelectedPageId(createdPage.id)
        } catch(caughtError) {
            console.error(caughtError)
            setCreateError("문서를 생성하지 못했습니다.")
        } finally {
            setIsCreatingPage(false)
        }
    }



    return (
        <WorkspaceLayout>
            <Sidebar
                pages={pages}
                selectedPageId={selectedPageId}
                onSelectPage={setSelectedPageId}
                onCreatePage={handleCreatePage}
                isLoading={isLoading}
                isCreatingPage={isCreatingPage}
                error={error}
                createError={createError}
            />
            <PageEditor 
                page={currentPage}
                isLoading={isPageLoading}
                error={pageError}
            />
        </WorkspaceLayout>
    )
}

export default WorkspacePage