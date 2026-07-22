import type { PageDetail } from "../../types/page"
import { useState } from "react"

interface PageEditorProps{
    page: PageDetail | null
    isLoading: boolean
    error: string | null
    onSave: (
        pageId: string,
        title: string,
        content: string,
    ) => Promise<void>
    onDelete: (pageId: string) => Promise<void>
}

function PageEditor({
    page,
    isLoading,
    error,
    onSave,
    onDelete
}: PageEditorProps) {

    const [localTitle, setLocalTitle] = useState(page?.title ?? "")
    const [localContent, setLocalContent] = useState(page?.content ?? "")
    const [isSaving, setIsSaving] = useState(false)
    const [saveMessage, setSaveMessage] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState<string | null>(null)

    const handleSave = async () => {
        if(page === null || isSaving || isDeleting) {
            return
        }

        setIsSaving(true)
        setSaveMessage(null)

        try{
            await onSave(
                page.id,
                localTitle,
                localContent,
            )
            setSaveMessage("저장되었습니다.")
        } catch (caughError){
            console.error(caughError)
            setSaveMessage("저장에 실패했습니다.")
        } finally{
            setIsSaving(false)
        }
    }

    const handleDelete = async () => {
        if (page === null || isDeleting || isSaving) {
            return
        }

        setIsDeleting(true)
        setDeleteError(null)

        try {
            await onDelete(page.id)
        } catch (caughError) {
            console.error(caughError)
            setDeleteError("문서를 삭제하지 못했습니다.")
            setIsDeleting(false)
        }
    }

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
            <input 
                type="text" 
                aria-label="문서 제목"
                value={localTitle}
                onChange={(event) => setLocalTitle(event.target.value)}
            />

            <textarea 
                aria-label="문서 본문"
                value={localContent}
                onChange={(event) => setLocalContent(event.target.value)}
            />

            <button
                type="button"
                onClick={handleSave} 
                disabled={isSaving || isDeleting}
            >
                {isSaving ? "저장 중..." : "저장"}
            </button>

            <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting || isSaving}
            >
                {isDeleting ? "삭제중..." : "삭제"}
            </button>

            {deleteError && (
                <p role="alert">{deleteError}</p>
            )}

            {saveMessage && (
                <p role="status">{saveMessage}</p>
            )}

            <small>
                마지막 수정 : {new Date(page.updatedAt).toLocaleDateString()}
            </small>
        </main>
    )
}

export default PageEditor