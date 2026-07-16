import WorkspaceLayout from "../../layouts/WorkspaceLayout/WorkspaceLayout"
import Sidebar from "../../components/Sidebar/Sidebar"
import PageEditor from "../../components/PageEditor/PageEditor"
import type { PageSummary } from "../../types/page"
import { useState } from "react"

const mockPages: PageSummary[] = [
    { id: '1', title: 'React 학습 노트' },
    { id: '2', title: '오늘 할 일' },
    { id: '3', title: '프로젝트 아이디어' },
]

function WorkspacePage() {

    const [selectedPageId, setSelectedPageId] = useState<string | null>(null)

    return (
        <WorkspaceLayout>
            <Sidebar 
                pages={mockPages}
                selectedPageId = {selectedPageId}
                onSelectPage = {setSelectedPageId}
            />
            <PageEditor/>
        </WorkspaceLayout>
    )
}

export default WorkspacePage