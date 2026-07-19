import type { PageSummary } from "../../types/page"
import PageList from "../PageList/PageList"

type SidebarProps = {
    pages: PageSummary[]
    selectedPageId: string | null
    onSelectPage: (pageId: string) => void
    isLoading: boolean
    error: string | null
    onCreatePage: () => void
    isCreatingPage: boolean
    createError: string | null
}

function Sidebar({ pages, selectedPageId, onSelectPage, onCreatePage, isLoading, error, isCreatingPage, createError }: SidebarProps) {
    return (
        <aside className="sidebar">
            <h2>Notion Class</h2>
            <button type="button"
                    onClick={onCreatePage}
                    disabled={isCreatingPage}
            >
                {isCreatingPage ? "생성 중..." : "+ 새 페이지"}
            </button>

            {isLoading && <p>불러오는 중...</p>}

            {error && <p role="alert">{error}</p>}
            {createError && <p role="alert">{createError}</p>}

            {!isLoading && !error && (
                <PageList 
                    pages={pages}
                    selectedPageId = {selectedPageId}
                    onSelectPage = {onSelectPage}
                />
            )}
            
        </aside>
    )
}

export default Sidebar