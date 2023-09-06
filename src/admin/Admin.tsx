import { useState } from "react";
import "./admin.scss";
import { BiCategoryAlt } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { AiOutlineAppstoreAdd, AiOutlineCodeSandbox, AiOutlineCluster } from "react-icons/ai";
import { Outlet, useNavigate } from "react-router-dom";
const Sidebar = () => {
    const navigate = useNavigate();
    const [isSidebarExpanded, setSidebarExpanded] = useState(false);

    

    return (
        <div className="admin_section">
            <div className={`sidebar ${isSidebarExpanded ? "expanded" : ""}`}>
                <div className="logo">
                    <img src="data:image/png;base64,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" alt="logo" />
                    <h2>Admin Pages</h2>
                </div>
                <ul className="links">
                    <h4>Category manage</h4>
                    <li
                        onClick={() => {
                            navigate("/admin/list_category");
                        }}
                    >
                        <span className=""><BiCategoryAlt /></span>
                        <p>List Category</p>
                    </li>
                    <li
                        onClick={() => {
                            navigate("/admin/add_category");
                        }}
                    >
                        <span className=""><AiOutlineAppstoreAdd /></span>
                        <p>Add Category</p>
                    </li>

                    <h4>Product manage</h4>
                    <li
                        onClick={() => {
                            navigate("/admin");
                        }}>
                        <span className=""><AiOutlineCluster /></span>
                        <p>List Product</p>
                    </li>
                    <li
                        onClick={() => {
                            navigate("/admin/add_product");
                        }}
                    >
                        <span className=""><AiOutlineCodeSandbox /></span>
                        <p>Add Product</p>
                    </li>

                    <h4>User manage</h4>
                    <li onClick={() => {
                        navigate("/admin/list_user");
                    }}>
                        <span className=""><FaUsers /></span>
                        <p>List User</p>
                    </li>
                </ul>
            </div>
            <div className="content_admin">
                <div className="body_content">
                    <Outlet />
                </div>
            </div>
        </div>

    );
};

export default Sidebar;