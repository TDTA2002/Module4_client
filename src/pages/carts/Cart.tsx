import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import apis from '@/services/apis';

interface Product {
    id: string;
    name: string;
    avatar: string;
    price: number;
    des: string;
    categoryId: string;
    productPictures: {
        id: string;
        path: string;
    }[];
}

interface CartItem {
    productId: string;
    quantity: number;
}

interface CartItemDetail extends CartItem {
    productDetail: Product;
}

export default function Cart() {
    const [cart, setCart] = useState<CartItemDetail[]>([]);
    const cartLocal = JSON.parse(localStorage.getItem("carts") ?? "[]");
    const [quantity, setQuantity] = useState(0);

    async function formatCart() {
        let cartTemp: CartItemDetail[] = [];
        let totalQuantity = 0;

        for (let i in cartLocal) {
            let productDetail = await apis.productApi.findById(cartLocal[i].productId).then(res => res.data.data);
            cartTemp.push({
                ...cartLocal[i],
                productDetail,
            });
            totalQuantity += cartLocal[i].quantity;
        }

        setCart(cartTemp);
        setQuantity(totalQuantity);
    }

    useEffect(() => {
        formatCart();
    }, []);

    function handleRemoveFromCart(productId: string) {
        let updatedCart = cartLocal.filter((item: { productId: string; }) => item.productId !== productId);
        localStorage.setItem("carts", JSON.stringify(updatedCart));
        formatCart();
        Modal.success({
            content: "Xóa sản phẩm thành công",
        });
    }

    function handleDecrease(idProduct: any) {
        const updatedCart = cartLocal.map((item: { productId: any; quantity: number; }) => {
            if (item.productId === idProduct && item.quantity > 1) {
                item.quantity -= 1;
            }
            return item;
        });

        localStorage.setItem("carts", JSON.stringify(updatedCart));
        formatCart();
    }

    function handleIncrease(idProduct: any) {
        const updatedCart = cartLocal.map((item: { productId: any; quantity: number; }) => {
            if (item.productId === idProduct) {
                item.quantity += 1;
            }
            return item;
        });

        localStorage.setItem("carts", JSON.stringify(updatedCart));
        formatCart();
    }

    return (
        <div className="container mx-auto mt-10" style={{ marginBottom: "50px" }}>
            <div className="flex shadow-md my-10">
                <div className="w-3/4 bg-white px-10 py-10">
                    <div className="flex justify-between border-b pb-8">
                        <h1 className="font-semibold text-2xl">Giỏ hàng</h1>
                        <h2 className="font-semibold text-2xl">{quantity} Sản phẩm</h2>
                    </div>
                    <div className="flex mt-10 mb-5">
                        <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                            Chi tiết sản phẩm
                        </h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                            Số lượng
                        </h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                            Giá
                        </h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                            Tổng cộng
                        </h3>
                    </div>
                    {cart?.map(item => (
                        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={item.productId}>
                            <div className="flex w-2/5">
                                <div className="w-20">
                                    <img
                                        className="h-24"
                                        src={item.productDetail.avatar}
                                        alt=""
                                    />
                                </div>
                                <div className="flex flex-col justify-between ml-4 flex-grow">
                                    <span className="font-bold text-sm">{item.productDetail.name}</span>
                                    {/* <span className="text-red-500 text-xs">{item.productDetail.des}</span> */}
                                    <a
                                        className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                                        onClick={() => handleRemoveFromCart(item.productId)}
                                    >
                                        Xóa
                                    </a>
                                </div>
                            </div>
                            <div className="flex justify-center w-1/5">
                                <svg
                                    className="fill-current text-gray-600 w-3 cursor-pointer"
                                    viewBox="0 0 448 512"
                                    onClick={() => handleDecrease(item.productId)}
                                >
                                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                </svg>

                                <span className="mx-2 border text-center w-8">{item.quantity}</span>
                                <svg
                                    className="fill-current text-gray-600 w-3 cursor-pointer"
                                    viewBox="0 0 448 512"
                                    onClick={() => handleIncrease(item.productId)}
                                >
                                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c-17.67 0-32-14.33-32-32V304h144c17.67 0-32-14.33-32-32v-32c0-17.67-14.33-32-32-32z" />
                                </svg>
                            </div>
                            <span className="text-center w-1/5 font-semibold text-sm">${item.productDetail.price}</span>
                            <span className="text-center w-1/5 font-semibold text-sm">${item.productDetail.price * item.quantity}</span>
                        </div>
                    ))}
                    <Link to={'/products'} className="flex font-semibold text-indigo-600 text-sm mt-10">
                        <svg
                            className="fill-current mr-2 text-indigo-600 w-4"
                            viewBox="0 0 448 512"
                        >
                            <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                        </svg>
                        Tiếp tục mua sắm
                    </Link>
                </div>
                <div id="summary" className="w-1/4 px-8 py-10">
                    <h1 className="font-semibold text-2xl border-b pb-8">Tóm tắt đơn hàng</h1>

                    <div className="border-t mt-8">
                        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                            <span>Tổng giá trị</span>
                            <span>${ }</span>
                        </div>
                        <Link to={'/checkout'}>
                            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                                Thanh toán
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
