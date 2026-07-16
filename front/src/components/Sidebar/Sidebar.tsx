import type { PageSummary } from "../../types/page"
import PageList from "../PageList/PageList"

type SidebarProps = {
    pages: PageSummary[]
    selectedPageId: string | null
    onSelectPage: (pageId: string) => void
}

function Sidebar({ pages, selectedPageId, onSelectPage }: SidebarProps) {
    return (
        <aside className="sidebar">
            <h2>Notion Class</h2>
            <button type="button">+ 새 페이지</button>
            <PageList 
                pages={pages}
                selectedPageId = {selectedPageId}
                onSelectPage = {onSelectPage}
            />
        </aside>
    )
}

export default Sidebar