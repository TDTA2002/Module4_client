import React from 'react'
import './bill.scss'

export default function Bill() {
    return (
        <div className="d-flex">
            <section className="invoice-list-page">
                <div className="invoice-list-page__header">
                    <div className="container">
                        <div className="d-flex flex-row align-items-center">
                            <div className="col">
                                <h2>Invoices</h2>
                                <p className="detail">
                                    There are <span>7</span> total invoices
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="invoice-list-page__content">
                    <div className="container">
                        <div className="invoice-item">
                            <div className="d-flex flex-row align-items-center">
                                <div className="col">
                                    <span className="id">
                                        #<span>RT3080</span>
                                    </span>
                                </div>
                                <div className="col text-truncate">
                                    <span className="date">Due 19 Aug 2022</span>
                                </div>
                                <div className="col">
                                    <span className="company">Jensen Huang</span>
                                </div>
                                <div className="col text-end">
                                    <span className="amount">$ 1,800.90</span>
                                </div>
                                <div className="col-3 text-center">
                                    <span className="status status--sent">Sent</span>
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
                        <div className="invoice-item">
                            <div className="d-flex flex-row align-items-center">
                                <div className="col">
                                    <span className="id">
                                        #<span>XM9141</span>
                                    </span>
                                </div>
                                <div className="col text-truncate">
                                    <span className="date">Due 20 Sep 2022</span>
                                </div>
                                <div className="col">
                                    <span className="company">Alex Grim</span>
                                </div>
                                <div className="col text-end">
                                    <span className="amount">$ 1,142.35</span>
                                </div>
                                <div className="col-3 text-center">
                                    <span className="status status--pending">Pending</span>
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
                    </div>
                </div>
            </section>
        </div>

    )
}
