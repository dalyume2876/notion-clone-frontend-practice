import { BrowserRouter, Route, Routes } from 'react-router'
import WorkspacePage from '../pages/WorkspacePage/WorkspacePage'

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WorkspacePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter