import type { PageSummary } from "../../types/page"
import PageList from "../PageList/PageList"

type SidebarProps = {
    pages: PageSummary[]
    selectedPageId: string | null
    onSelectPage: (pageId: string) => void
    isLoading: boolean
    error: string | null
}

function Sidebar({ pages, selectedPageId, onSelectPage, isLoading, error }: SidebarProps) {
    return (
        <aside className="sidebar">
            <h2>Notion Class</h2>
            <button type="button">+ 새 페이지</button>
            {isLoading && <p>불러오는 중...</p>}

            {error && <p role="alert">{error}</p>}

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