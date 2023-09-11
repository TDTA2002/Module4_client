import store, { StoreType } from '@/stores'

import { useDispatch, useSelector } from 'react-redux';
import Addproduct from './Addproduct';
import { useEffect, useState } from 'react';
import apis from '@/services/apis';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import './scss/productlist.scss'
import Update from './Updateproduct';

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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        apis.productApi.findMany(maxItemPage, skipItem)
            .then(res => {
                if (res.status == 200) {
                    // console.log("res.data", res.data)
                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                    }
                    setMaxPage(maxPageArr);
                    // setSkipItem(res.data.data.length)
                    setProducts(res.data.data)
                }
            })
            .catch(err => {

            })
            .finally(() => {
                setIsLoading(false);
            });
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
                                Products
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
                        <h3>Products</h3>
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
                            {isLoading ?
                                <div role="status">
                                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                :

                                products.map((product, index) => (
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
                                            <Update product={product} />
                                        </td>
                                    </tr>
                                ))

                            }
                        </tbody>
                    </table>
                    <div className='page_box'>
                        <FaAngleLeft />
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
