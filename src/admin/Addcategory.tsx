import api from '@/services/apis'
import React, { useState, useEffect } from 'react';
import { Input, message } from 'antd';


const Addcategory: React.FC = () => {
    const [loading, setLoading] = useState(false);
    function addNewCategory(e: FormDataEvent) {
        e.preventDefault();
        setLoading(true);
        if ((e.target as any).title.value != "") {
            let newCategory = {
                title: (e.target as any).title.value,
            }

            api.categoryApi.create(newCategory)
                .then((res: any) => {
                    if (res.status == 200) {
                        setLoading(false);
                        message.success(res.data.message);
                    } else {
                        setLoading(false);
                        message.warning(res.data.message);
                    }
                })
                .catch((err: any) => {
                    message.error('An error occurred during registration. Please try again.');
                    setLoading(false);
                })
        } else {
            message.warning("Category name is required");
            setLoading(false);
        }

    }

    return (
        <>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <form action="" onSubmit={(e) => { addNewCategory(e as any) }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Add Category

                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-mdb-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">


                                <div className='form-group'>
                                    <label htmlFor="">Title</label><br />
                                    <Input type="text" name='title' />
                                </div>
                                <button type='submit' className='save-button'>
                                    {loading ? <span className='loading-spinner'></span> : "Save"}
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-mdb-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button type='submit' className="btn btn-primary" style={{background:"blue"}} data-mdb-dismiss="modal">
                                    Save changes
                                </button>
                            </div>
                        </div>

                    </div>
                </form>
            </div >

        </>
    )
}
export default Addcategory;