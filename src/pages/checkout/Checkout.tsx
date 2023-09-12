import { useEffect, useState } from 'react';
import './checkout.scss';
import apis from '@/services/apis';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import { StoreType } from '@/stores';


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
    }[]
}

interface CartItem {
    productId: string;
    quantity: number;
    price: number;
}

interface CartItemDetail extends CartItem {
    productDetail: Product
}

interface newGuestReceipt {
    email: string;
    phoneNumber: string;
    total: number;
    payMode: string;
}

interface newUserReceipt {
    total: number;
    payMode: string;
}

export default function Checkout() {
    const [cart, setCart] = useState<CartItemDetail[]>([]);
    const [loading, setLoading] = useState(false);
    const [isLogin, checkIsLogin] = useState(localStorage.getItem("token"));
    const userStore = useSelector((store: StoreType) => store.userStore);
    // console.log("userStore", userStore.data.id)

    async function formatCart() {
        let cartTemp: CartItemDetail[] = [];
        let carts: CartItem[] = JSON.parse(localStorage.getItem("carts") ?? "[]");
        for (let i in carts) {
            let productDetail = await apis.productApi.findById(carts[i].productId).then(res => res.data.data)
            cartTemp.push({
                ...carts[i],
                productDetail
            })
        }
        setCart(cartTemp);
    }

    useEffect(() => {
        formatCart();
    }, [localStorage.getItem("carts")]);

    function handleOrder(e: any) {
        setLoading(true);
        e.preventDefault();
        let newGuestReceipt: newGuestReceipt = {
            email: e.target.email.value,
            phoneNumber: e.target.phone.value,
            total: cart.reduce((value, cur) => {
                return value + cur.quantity * cur.productDetail.price
            }, 0),
            payMode: e.target.payMode.value
        }

        let newUserReceipt: newUserReceipt = {
            total: cart.reduce((value, cur) => {
                return value + cur.quantity * cur.productDetail.price
            }, 0),
            payMode: e.target.payMode.value
        }

        if (isLogin) {
            let userReceiptDetailList = JSON.parse(localStorage.getItem("carts") ?? "[]")

            apis.purchaseApi.userGuestReceipt(newUserReceipt, userReceiptDetailList, userStore.data.id)
                .then(res => {
                    console.log("res", res)
                    if (res.status == 200) {
                        setLoading(false);
                        localStorage.removeItem("carts");
                        message.success(res.data.message);
                        window.location.href = "/thank"
                    } else {
                        message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log("err", err)
                    setLoading(false);
                })
        } else {
            let guestReceiptDetailList = JSON.parse(localStorage.getItem("carts") ?? "[]")

            apis.purchaseApi.createGuestReceipt(newGuestReceipt, guestReceiptDetailList)
                .then(res => {
                    console.log("res", res)
                    if (res.status == 200) {
                        setLoading(false);
                        localStorage.removeItem("carts");
                        message.success(res.data.message);
                        window.location.href = "/thank"
                    } else {
                        message.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.log("err", err)
                    setLoading(false);
                })
        }
    }

    return (
        <>
            <div>
                <div></div>
                <main role="main">
                    <div className="container mt-4">

                        <input type="hidden" name="kh_tendangnhap" defaultValue="dnpcuong" />
                        <div className="py-5 text-center">
                            <i className="fa fa-credit-card fa-4x" aria-hidden="true" />
                            <h2>Thanh toán</h2>

                        </div>
                        <div className="row">

                            <div className="col-md-4 order-md-2 mb-4">
                                <h4 className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="text-muted">Giỏ hàng</span>
                                    <span className="badge badge-secondary badge-pill">{cart.length}</span>
                                </h4>

                                {cart.length > 0 ?
                                    cart?.map((product, index) => (
                                        <div >
                                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                                <div style={{ display: "flex", gap: "15px", marginBottom: "10px" }}>
                                                    <img src={product.productDetail.avatar} alt="" style={{ width: "50px" }} />
                                                    <div>
                                                        <h6 className="my-0">{product.productDetail.name}</h6>
                                                        <small className="text-muted">${product.productDetail.price} x {product.quantity}</small>
                                                    </div>
                                                </div>
                                                <span className="text-muted">${product.productDetail.price * product.quantity}</span>
                                            </li>
                                        </div>
                                    ))
                                    : <div>Your Order is empty</div>}
                                <ul className="list-group mb-3">
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Tổng thành tiền</span>
                                        <strong>143520000</strong>
                                    </li>
                                </ul>

                            </div>
                            <div className="col-md-8 order-md-1">
                                <div className='main'>

                                    {
                                        isLogin ? <form action="" onSubmit={(e) => handleOrder(e)}>
                                            <div className="form-group">
                                                <input type="text" placeholder='Email' required className='email' name='email' />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" placeholder='Address' required className='address' />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" placeholder='Apartment, suite, etc. (optional)' required className='apartment' />
                                            </div>

                                            <div className="form-group">
                                                <input type="text" placeholder='Phone (optional)' required className='phone' name='phone' />
                                            </div>
                                            <div className='payMode'>
                                                <div className='cash'>
                                                    <input type="radio" name='payMode' value="CASH" /> <span>CASH</span>
                                                </div>
                                                <div className='zalo'>
                                                    <input type="radio" name='payMode' value="ZALO" /> <span>ZALO</span>
                                                </div>
                                            </div>

                                            <button className='continue-button' type='submit'> {loading ? <span className='loading-spinner'></span> : "Continue to shipping"}
                                            </button>
                                        </form>
                                            :
                                            <form action="" onSubmit={(e) => handleOrder(e)}>
                                                <div className="form-group">
                                                    <input type="text" placeholder='First name' required className='firstName' />
                                                    <input type="text" placeholder='Last name' required className='lastName' />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" placeholder='Email' required className='email' name='email' />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" placeholder='Address' required className='address' />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" placeholder='Apartment, suite, etc. (optional)' required className='apartment' />
                                                </div>

                                                <div className="form-group">
                                                    <input type="text" placeholder='Phone (optional)' required className='phone' name='phone' />
                                                </div>
                                                <div className='payMode'>
                                                    <div className='cash'>
                                                        <input type="radio" name='payMode' value="CASH" /> <span>CASH</span>
                                                    </div>
                                                </div>

                                                <button className='continue-button' type='submit'> {loading ? <span className='loading-spinner'></span> : "Continue to shipping"}
                                                </button>
                                            </form>
                                    }
                                    <div className='checkout-content'></div>
                                </div>
                                <hr className="mb-4" />

                            </div>

                        </div>
                    </div>
                    {/* End block content */}
                </main>
            </div>
        </>

    )
}
