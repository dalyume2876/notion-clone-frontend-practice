import type { ReactNode } from "react"

type WorkspaceLayoutProps = {
    children: ReactNode
}

function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
    return (
        <div className="workspace-layout">
            {children}
        </div>
    )
}

export default WorkspaceLayout