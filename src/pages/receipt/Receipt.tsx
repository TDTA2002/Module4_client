import apis from '@/services/apis';
import { StoreType } from '@/stores';
import { userAction } from '@/stores/slices/user.slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Receipt() {
    const dispatch = useDispatch();
    const store = useSelector(store => store) as StoreType;
    const [receipts, setReceipts] = useState([]);
    // const [guestReceiptDetail, setGuestReceiptDetail] = useState<OrderItemDetail[]>([]);


    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("token")) {
            apis.userApi.authentication()
                .then(res => {
                    if (res.status == 200) {
                        dispatch(userAction.setLoginData(res.data.data))
                    } else {
                        localStorage.removeItem("token")
                    }
                })
        }
    }, [])

    console.log("receipts", store.userStore.data?.id);


    useEffect(() => {
        if (store.userStore.data?.id) {
            setIsLoading(true);
            apis.purchaseApi.findUserById(store.userStore.data?.id)
                .then(res => {
                    if (res.status === 200) {
                        console.log("res.data.data.userReceiptDetail", res.data.data.userReceiptDetail);
                        
                        setReceipts(res.data.data.userReceiptDetail);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [store.userStore.data?.id]);


    return (
        // <div>
        //     <div className="invoice-list-page__content">
        //         <div className="container">
        //             {receipts?.map((receipt, index) => (
        //                 <div className="invoice-item">
        //                     <div className="d-flex flex-row align-items-center">
        //                         <div className="col">
        //                             <span className="id">
        //                                 #<span>{(receipt as Receipt).id}</span>
        //                             </span>
        //                         </div>
        //                         <div className="col text-truncate">
        //                             <span className="date">{(receipt as Receipt).createAt.toLocaleString()}</span>
        //                         </div>
        //                         <div className="col">
        //                             <span className="company">{(receipt as Receipt).email}</span>
        //                         </div>
        //                         <div className="col text-end">
        //                             <span className="amount">$ {(receipt as Receipt).total}</span>
        //                         </div>
        //                         <div className="col-3 text-center">
        //                             <span className="status status--pending">{(receipt as Receipt).state}</span>
        //                         </div>
        //                         <div className="col-1 text-end">
        //                             <button className="btn btn-arrow">
        //                                 <svg
        //                                     xmlns="http://www.w3.org/2000/svg"
        //                                     width={24}
        //                                     height={24}
        //                                     viewBox="0 0 24 24"
        //                                     fill="none"
        //                                     stroke="currentColor"
        //                                     strokeWidth={2}
        //                                     strokeLinecap="round"
        //                                     strokeLinejoin="round"
        //                                     className="feather feather-chevron-right"
        //                                 >
        //                                     <polyline points="9 18 15 12 9 6" />
        //                                 </svg>
        //                             </button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        // </div>
        <div>dqsq</div>
    )
}
