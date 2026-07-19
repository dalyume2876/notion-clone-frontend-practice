import type { PageDetail } from "../../types/page"

interface PageEditorProps{
    page: PageDetail | null
    isLoading: boolean
    error: string | null
}

function PageEditor({
    page,
    isLoading,
    error
}: PageEditorProps) {

    if (isLoading){
        return <main className="page-editor">문서를 불러오는 중입니다...</main>
    }

    if (error){
        return <main className="page-editor">{error}</main>
    }

    if (page === null){
        return (
            <main className="page-editor">
                <h1>편집할 문서를 선택해 주세요.</h1>
                <p>선택한 문서의 내용이 여기에 표시됩니다.</p>
            </main>
        )
    }

    return (
        <main className="page-editor">
            <h1>{page.title}</h1>
            <p>{page.content}</p>
            <small>
                마지막 수정 : {new Date(page.updatedAt).toLocaleDateString()}
            </small>
        </main>
    )
}

export default PageEditor