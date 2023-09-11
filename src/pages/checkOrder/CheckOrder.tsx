import { useState } from 'react';
import './checkorder.scss';
// import ReceiptDetail from './ReceiptDetail';
import { useNavigate } from 'react-router-dom';
import OTPVerification from './Otp/Otp';
import { message } from 'antd';
import apis from '@/services/apis';

interface Receipt {
  id: string,
  state: string,
  total: number,
  createAt: Date,
  email: string
}

export default function Receipt() {
  const [loading, setLoading] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [receipts, setReceipts] = useState([]);
  const [isShowOTP, setIsShowOTP] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [isShowReceipts, setIsShowReceipts] = useState(false);
  const navigate = useNavigate();
  function handleGetOtp() {
    setLoading(true);
    apis.purchaseApi.findGuestReceipt({ email: emailInput })
      .then(res => {
        setLoading(false);
        if (res.status == 200) {
          console.log("res", res)
          message.success(res.data.message)
          setIsShowOTP(true);
          setIsShow(false);
        }
        else (
          message.error(res.data.message)
        )
      })
      .catch(err => {
        setLoading(false);
        console.log("lỗi", err)
      })

  }
  function handleGetReceipt(otp: string) {
    apis.purchaseApi.findGuestReceipt({ email: emailInput, otp: otp ?? "29121999" })
      .then(res => {
        if (res.status == 200) {
          setIsShowOTP(false);
          setIsShowReceipts(true);
          console.log("res", res.data.data)
          setReceipts(res.data.data)
        }
      })
  }
  return (
    <div style={{ height: "530px" }}>
      {isShow ? <div className='getOTP-container'>
        <h5>Enter your email to get OTP</h5>
        <input type="text" placeholder='Enter your email' value={emailInput} onChange={(e) => {
          setEmailInput(e.target.value)
        }} /><br />
        <button onClick={() => {
          handleGetOtp()
        }}>{loading ? <span className='loading-spinner'></span> : "Submit"}</button>
      </div> : <></>}
      {isShowOTP ? <OTPVerification handleGetReceipt={handleGetReceipt} /> : <></>}
      {isShowReceipts ?
        <div className="d-flex">
          <section className="invoice-list-page">
            <div className="invoice-list-page__header">
              <div className="container">
                <div className="d-flex flex-row align-items-center">
                  <div className="col">
                    <h2>Invoices</h2>
                    <p className="detail">
                      There are <span>{receipts.length}</span> total invoices
                    </p>
                  </div>

                </div>
              </div>
            </div>
            <div className="invoice-list-page__content">
              <div className="container">
                {receipts?.map((receipt, index) => (
                  <div className="invoice-item">
                    <div className="d-flex flex-row align-items-center">
                      <div className="col">
                        <span className="id">
                          #<span>{(receipt as Receipt).id}</span>
                        </span>
                      </div>
                      <div className="col text-truncate">
                        <span className="date">{(receipt as Receipt).createAt.toLocaleString()}</span>
                      </div>
                      <div className="col">
                        <span className="company">{(receipt as Receipt).email}</span>
                      </div>
                      <div className="col text-end">
                        <span className="amount">$ {(receipt as Receipt).total}</span>
                      </div>
                      <div className="col-3 text-center">
                        <span className="status status--pending">{(receipt as Receipt).state}</span>
                      </div>
                      <div className="col-1 text-end">
                        <button className="btn btn-arrow">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-chevron-right"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        : <></>
      }
    </div>


  )
}