import type { PageSummary } from "../../types/page"

type PageListItemProps = {
    page: PageSummary
    isSelected: boolean
    onSelectPage: (pageId: string) => void
}

function PageListItem({ page, isSelected, onSelectPage }: PageListItemProps){
    return (
        <li>
            <button 
                type="button"
                className={`page-list-item${isSelected ? ' is-selected' : ''}`}
                aria-pressed={isSelected}
                onClick={() => onSelectPage(page.id)}
            >{page.title}
            </button>
        </li>
    )
}

export default PageListItem