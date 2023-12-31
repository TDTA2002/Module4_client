import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import './orderDetail.scss';
import { Link } from 'react-router-dom';
import api from '@/services/apis';

interface Product {
    name: string,
    avatar: string,
    price: number,
    des: string,
    categoryId: number,
    categoryName: string,
    updateAt: Date
}

interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

interface OrderItemDetail extends OrderItem {
    productDetail: Product
}

export default function OrderDetail() {
    const { orderId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<OrderItemDetail[]>([]);
    const [guestReceiptDetail, setGuestReceiptDetail] = useState<OrderItemDetail[]>([]);
    const [productVisible, setProductVisible] = useState(false);

    useEffect(() => {
        if (orderId) {
            setIsLoading(true);
            api.purchaseApi.findById(orderId)
                .then(res => {
                    if (res.status === 200) {
                        setGuestReceiptDetail(res.data.data?.guestReceiptDetail);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [orderId]);

    useEffect(() => {
        formatReceiptDetail();
        console.log("guestReceiptDetail", guestReceiptDetail)
    }, [guestReceiptDetail]);

    async function formatReceiptDetail() {
        let receiptDetailTemp: OrderItemDetail[] = [];
        for (let i in guestReceiptDetail) {
            let productDetail = await api.productApi.findById(guestReceiptDetail[i].productId);
            receiptDetailTemp.push({
                ...guestReceiptDetail[i],
                productDetail: productDetail.data.data
            });
        }
        setProducts(receiptDetailTemp);
    }

    console.log("guestReceiptDetail", guestReceiptDetail)

    return (
        // <div className='orderDetail-wrapper'>
        //     <table>
        //         <thead>
        //             <tr>
        //                 <th scope="col">ID</th>
        //                 <th scope="col">Product</th>
        //                 <th scope="col">Name</th>
        //                 <th scope="col">Quantity</th>
        //                 <th scope="col">Price (per item)</th>
        //                 <th scope="col">Total Price</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {isLoading ? <div className="d-flex justify-content-center loading-wrapper">
        //                 <div className="spinner-border" role="status">
        //                     <span className="visually-hidden">Loading...</span>
        //                 </div>
        //             </div> : products?.map((product, index) => (
        //                 <tr key={index} className='orderProductDetail'>
        //                     <td>{index + 1}</td>
        //                     <td><img src={product.productDetail.avatar} alt="noImage" className={`${productVisible ? 'show' : ''}`} /></td>
        //                     <td className='orderProductDetail-name'>{product.productDetail.name}</td>
        //                     <td className='orderProductDetail-name'>{product.quantity}</td>
        //                     <td>${product.productDetail.price}</td>
        //                     <td>${product.quantity * product.productDetail.price}</td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
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
                            <a href="#">Bill</a>
                        </li>
                        <li>
                            <i className="bx bx-chevron-right" />
                        </li>
                        <li>
                            <a className="active" href="#">
                                Details
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

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
                                <th>Avatar</th>
                                <th>Quantity</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Total</th>
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
                                products?.map((product, index) => (
                                    <tr key={Math.random() * Date.now()} className='order'>
                                        <td>{index + 1}</td>
                                        <td><img src={product.productDetail.avatar} alt="noImage" className={`${productVisible ? 'show' : ''}`} /></td>
                                        <td className='orderProductDetail-name'>{product.productDetail.name}</td>
                                        <td className='orderProductDetail-name'>{product.quantity}</td>
                                        <td>${product.productDetail.price}</td>
                                        <td>${product.quantity * product.productDetail.price}</td>

                                    </tr>

                                ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </main >
    )
}
