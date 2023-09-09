import store, { StoreType } from '@/stores'

import { useDispatch, useSelector } from 'react-redux';
import Addproduct from './Addproduct';
import { useEffect, useState } from 'react';
import apis from '@/services/apis';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import './scss/productlist.scss'

interface Product {
    stt: number;
    id: string;
    name: string;
    avatar: string;
    price: GLfloat;
    des: string;
    active: boolean;
}
export default function Productlist() {
    const [products, setProducts] = useState<Product[]>([]);
    const [maxItemPage, setMaxItemPage] = useState(4);
    const [skipItem, setSkipItem] = useState(0);
    const [maxPage, setMaxPage] = useState<any[]>([]);
    const currentPage = Math.ceil(skipItem / maxItemPage);

    useEffect(() => {
        apis.productApi.findMany(maxItemPage, skipItem)
            .then(res => {
                if (res.status == 200) {
                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                    }
                    setMaxPage(maxPageArr);
                    setSkipItem(res.data.data.length)
                    setProducts(res.data.data)
                }
            })
    }, [])

    function changePage(pageItemObj: any) {
        apis.productApi.findMany(maxItemPage, pageItemObj.skip)
            .then(res => {
                if (res.status == 200) {
                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                    }
                    setMaxPage(maxPageArr);
                    setSkipItem(pageItemObj.skip)
                    setProducts(res.data.data)
                }
            })
    }

    

    return (
        // <div style={{ width: "100%" }}>

        //     <div style={{ display: 'flex', justifyContent: "space-between", fontSize: "24px", color: "gray", marginBottom: "10px", marginTop: "10px" }}>
        //         <div style={{}}>
        //             Product
        //         </div>
        //         <div className='Addnew'
        //             data-mdb-toggle="modal"
        //             data-mdb-target="#exampleModal">
        //             Add New
        //         </div>
        //     </div>
        //     <Addproduct />

        //     <table className="table" style={{ width: "100%" }}>
        //         <thead>
        //             <tr>
        //                 <th>ID</th>
        //                 <th>User</th>
        //                 <th>Email</th>
        //                 <th>Status</th>
        //                 <th>Action</th>

        //             </tr>
        //         </thead>
        //         <tbody>
        //             <tr>
        //                 <th scope="row">1</th>
        //                 <td><Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngDLxVdX-4fhpWyG8hDPxUWyGV1B9uOXJ3Q&usqp=CAU" alt="avatar" /> Mark</td>
        //                 <td>Otto</td>
        //                 <td >
        //                     <div style={{
        //                         background: "rgba(0, 128, 0, 0.05)",
        //                         color: "green",
        //                         width: "50px",
        //                         textAlign: "center"
        //                     }}>active</div>
        //                 </td>
        //                 <td>
        //                     <button type="button" className='button-danger' >DELETE</button>
        //                     <button type="button" className='button-success'>UPDATE</button>
        //                 </td>
        //             </tr>
        //             <tr>
        //                 <th scope="row">2</th>
        //                 <td><Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngDLxVdX-4fhpWyG8hDPxUWyGV1B9uOXJ3Q&usqp=CAU" alt="avatar" /> Mark</td>
        //                 <td>Thornton</td>
        //                 <td> <div style={{
        //                     background: "rgba(255, 0, 0, 0.05)",
        //                     color: "crimson",
        //                     width: "60px",
        //                     textAlign: "center"
        //                 }}>passive</div></td>
        //                 <td>
        //                     <button type="button" className='button-danger' >DELETE</button>
        //                     <button type="button" className='button-success'>UPDATE</button>
        //                 </td>
        //             </tr>
        //             <tr>
        //                 <th scope="row">3</th>
        //                 <td><Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngDLxVdX-4fhpWyG8hDPxUWyGV1B9uOXJ3Q&usqp=CAU" alt="avatar" /> Mark</td>
        //                 <td>the Bird</td>
        //                 <td>@twitter</td>
        //                 <td>
        //                     <button type="button" className='button-danger' >DELETE</button>
        //                     <button type="button" className='button-success'>UPDATE</button>
        //                 </td>
        //             </tr>
        //         </tbody>
        //     </table >
        // </div>
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
                                My Store
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
            <Addproduct />

            <div className="table-data">
                <div className="order">
                    <div className="head">
                        <h3>Recent Orders</h3>
                        <i className="bx bx-search" />
                        <i className="bx bx-filter" />
                    </div>
                    <table>
                        <thead>

                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr>
                                    <td>{index + 1 + skipItem}</td>
                                    <td>
                                        <img src={product.avatar} alt="User" />
                                        <div>{product.name}</div>
                                        <p></p>
                                    </td>
                                    <td>
                                        <span >{product.price}$</span>
                                    </td>

                                    <td>
                                        <button type="button" className="status delete" >DELETE</button>
                                        <button type="button" className="status update">UPDATE</button>
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
                    <div className='page_box'>
                        <FaAngleLeft   />
                        {maxPage.map(item => (
                            <span
                                key={item.number}
                                className={`item_page ${currentPage + 1 == item.number ? 'active' : ''}`}
                                onClick={() => changePage(item)}
                            >
                                {item.number}
                            </span>
                        ))}
                        <FaAngleRight />
                    </div>
                </div>

            </div>
        </main >
    )
}
