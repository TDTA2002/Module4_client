import React, { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Addcategory from './Addcategory';
import { Link, useNavigate } from 'react-router-dom';
import apis from '@/services/apis';

interface Category {
    id: string,
    title: String,
    updateAt: Date,
    count: number
}

export default function Productlist() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    interface CategoryWithProductCount {  // Thêm trường count vào Category
        id: string,
        title: String,
        updateAt: Date,
        count: number  // Thêm trường count vào Category
    }
    // const [categories, setCategories] = useState([]);
    const [count, setCount] = useState([]);
    // useEffect(() => {
    //     api.categoryApi.findMany()
    //         .then(res => {
    //             if (res.status == 200) {
    //                 setCategories(res.data.data);
    //                 for (let i = 0; i < res.data.data.length; i++) {
    //                     api.productApi.findByCategory(res.data.data[i].id)
    //                         .then(res => {
    //                             console.log("res", res.data.data.length)
    //                         })
    //                 }
    //             }
    //         })
    //         .catch(err => {

    //         })
    // }, [])
    const [categories, setCategories] = useState<CategoryWithProductCount[]>([]); // Cập nhật kiểu dữ liệu
    useEffect(() => {
        setIsLoading(true);
        apis.categoryApi.findMany()
            .then(res => {
                if (res.status === 200) {
                    const categoriesWithCount = res.data.data.map((category: any) => {
                        return {
                            ...category,
                            count: 0  // Khởi tạo số lượng sản phẩm ban đầu là 0
                        };
                    });
                    setCategories(categoriesWithCount);

                    // Lặp qua danh sách danh mục và tìm số lượng sản phẩm cho mỗi danh mục
                    categoriesWithCount.forEach((category: { id: string; }) => {
                        apis.productApi.findByCategory(category.id)
                            .then((res: { status: number; data: { data: string | any[]; }; }) => {
                                if (res.status === 200) {
                                    const productCount = res.data.data.length;
                                    setCategories(prevCategories => prevCategories.map(prevCategory => {
                                        if (prevCategory.id === category.id) {
                                            return {
                                                ...prevCategory,
                                                count: productCount
                                            };
                                        }
                                        return prevCategory;
                                    }));
                                }
                            })
                            .catch((err: any) => {
                                // Xử lý lỗi nếu cần
                            });
                    });
                }
            })
            .catch(err => {
                // Xử lý lỗi nếu cần
            })
            .finally(() => {
                setIsLoading(false); // Kết thúc loading
            });
    }, [])

    console.log("categories", categories);

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Products</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="#">Dashboard</a>
                        </li>
                        <li>
                            <i className="bx bx-chevron-right" />
                        </li>
                        <li>
                            <a className="active" href="#">
                                Category
                            </a>
                        </li>
                    </ul>
                </div>

                <a href="#" className="btn-download">
                    <i className="bx bxs-cloud-download" />
                    <span className="text" data-mdb-toggle="modal"
                        data-mdb-target="#exampleModal">Add New</span>
                </a>
            </div>
            <Addcategory />

            <div className="table-data">
                <div className="order">
                    <div className="head">
                        <h3>Categories</h3>
                        <i className="bx bx-search" />
                        <i className="bx bx-filter" />
                    </div>
                    <table>
                        <thead>

                            <tr>
                                <th>#</th>
                                <th>Category</th>
                                <th>#SKU</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? <div className="d-flex justify-content-center loading-wrapper">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> : categories?.map((category, index) => (
                                <tr key={Math.random() * Date.now()} className='category'>
                                    <td>{index + 1}</td>
                                    <td className='name'>{(category as Category).title}</td>
                                    <td>{(category as Category).count}</td>
                                    <td>
                                        <span className="status pending">Pending</span>
                                    </td>
                                </tr>
                            ))}


                            {/* <tr>
                            <td>
                                <img src="img/people.png" alt="User" />
                                <p>John Doe</p>
                            </td>
                            <td>01-10-2021</td>
                            <td>
                                <span className="status pending">Pending</span>
                            </td>
                            <td>
                                <span className="status pending">Pending</span>
                            </td>
                            <td>
                                <button type="button" className='button-danger' >DELETE</button>
                                <button type="button" className='button-success'>UPDATE</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src="img/people.png" alt="User" />
                                <p>John Doe</p>
                            </td>
                            <td>01-10-2021</td>
                            <td>
                                <span className="status process">Process</span>
                            </td>
                            <td>
                                <span className="status pending">Pending</span>
                            </td> <td>
                                <span className="status pending">Pending</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src="img/people.png" alt="User" />
                                <p>John Doe</p>
                            </td>
                            <td>01-10-2021</td>
                            <td>
                                <span className="status pending">Pending</span>
                            </td>
                            <td>
                                <span className="status pending">Pending</span>
                            </td>
                            <td>
                                <button type="button" className='button-danger' >DELETE</button>
                                <button type="button" className='button-success'>UPDATE</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src="img/people.png" alt="User" />
                                <p>John Doe</p>
                            </td>
                            <td>01-10-2021</td>
                            <td>
                                <span className="status completed">Completed</span>
                            </td>
                            <td>
                                <span className="status pending">Pending</span>
                            </td> <td>
                                <span className="status pending">Pending</span>
                            </td>
                        </tr> */}
                        </tbody>
                    </table>

                </div>

            </div>
        </main >
    )
}
