import type { PageSummary } from "../../types/page"
import PageListItem from "../PageListItem/PageListItem"

type PageListProps = {
    pages: PageSummary[]
    selectedPageId: string | null
    onSelectPage: (pageId: string) => void
}

function PageList({ pages, selectedPageId, onSelectPage }: PageListProps){
    return (
        <ul className="page-list">
            {pages.map((page) => (
                <PageListItem 
                    key={page.id} 
                    page={page} 
                    isSelected={page.id === selectedPageId}
                    onSelectPage={onSelectPage}
                />
            ))}
        </ul>
    )
}

export default PageList