import { useState } from "react";
import "./scss/admin.scss";
import { BiCategoryAlt } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { AiOutlineAppstoreAdd, AiOutlineCodeSandbox, AiOutlineCluster } from "react-icons/ai";
import { Link, Outlet, useNavigate } from "react-router-dom";
const Sidebar = () => {
    const navigate = useNavigate();
    const [isSidebarExpanded, setSidebarExpanded] = useState(false);

    const [activeMenuItem, setActiveMenuItem] = useState<number | null>(0);
    const [sidebarHidden, setSidebarHidden] = useState(false);
    const [searchFormVisible, setSearchFormVisible] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const handleMenuItemClick = (index: number) => {
        setActiveMenuItem(index);
    };

    const toggleSidebar = () => {
        setSidebarHidden(!sidebarHidden);
    };

    const toggleSearchForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (window.innerWidth < 576) {
            e.preventDefault();
            setSearchFormVisible(!searchFormVisible);
        }
    };

    const handleDarkModeChange = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark');
    };

    return (
        <>
            <section id="sidebar" className={sidebarHidden ? 'hide' : ''}>
                <a href="#" className="brand">
                    <i className="bx bxs-smile" />
                    <span className="text">Admin</span>
                </a>
                <ul className="side-menu top">
                    <li className={activeMenuItem === 0 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(0)}>
                            <i className="bx bxs-dashboard" />
                            <Link to={""} className="text">Dashboard</Link>
                        </a>
                    </li>
                    <li className={activeMenuItem === 1 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(1)}>
                            <i className="bx bxs-shopping-bag-alt" />
                            <Link to={"add_product"} className="text">My Store</Link>
                        </a>
                    </li>
                    <li className={activeMenuItem === 2 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(2)}>
                            <i className="bx bxs-doughnut-chart" />
                            <Link to={"add_category"} className="text">Analytics</Link>
                        </a>
                    </li>
          
                    <li className={activeMenuItem === 3 ? 'active' : ''}>
                        <a href="#" onClick={() => handleMenuItemClick(3)}>
                            <i className="bx bxs-group" />
                            <Link to={"list_user"} className="text">Users</Link>
                        </a>
                    </li>
                </ul>
                <ul className="side-menu">
                    <li>
                        <a href="#">
                            <i className="bx bxs-cog" />
                            <span className="text">Settings</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="logout">
                            <i className="bx bxs-log-out-circle" />
                            <span className="text">Logout</span>
                        </a>
                    </li>
                </ul>
            </section>

            <section id="content">
                {/* NAVBAR */}
                <nav>
                    <i className="bx bx-menu" onClick={toggleSidebar} />
                    <a href="#" className="nav-link">
                        Categories
                    </a>
                    <form action="#">
                        <div className={`form-input${searchFormVisible ? ' show' : ''}`}>
                            <input type="search" placeholder="Search..." />
                            <button type="submit" className="search-btn" onClick={toggleSearchForm}>
                                <i className={`bx ${searchFormVisible ? 'bx-x' : 'bx-search'}`} />
                            </button>
                        </div>
                    </form>
                    <input type="checkbox" id="switch-mode" onChange={handleDarkModeChange} checked={darkMode} hidden/>
                    <label htmlFor="switch-mode" className="switch-mode"  />
                    <a href="#" className="notification">
                        <i className="bx bxs-bell" />
                        <span className="num">8</span>
                    </a>
                 
                </nav>
                {/* NAVBAR */}
                {/* MAIN */}
            <Outlet/>
                {/* MAIN */}
            </section>
        </>
    );
};



export default Sidebar;