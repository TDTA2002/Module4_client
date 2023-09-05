
import Home from './Home'
import { useState } from 'react'

import './scss/app.scss'
function App() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }

    return (
        <div className='grid-container'>
            {/* <Header OpenSidebar={OpenSidebar} /> */}
            {/* <Sildebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} /> */}
            <Home />
        </div>
    )
}

export default App

