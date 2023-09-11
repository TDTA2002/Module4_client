import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Button, Modal, message } from 'antd';
// import { useSelector } from 'react-redux';
// import { StoreType } from '@/stores';
import apis from '@/services/apis';

type UpdateProductProp = {
    product: any,

}

interface Category {
    id: string;
    title: string;
    avatar: string;
}

interface Picture {
    file: File;
    url: string;
}

const Update: React.FC<UpdateProductProp> = (props) => {
    const imgPreviewRef: MutableRefObject<HTMLImageElement | null> = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        apis.categoryApi.findMany()
            .then(res => {
                if (res.status != 200) {
                    // alert(res.data.message)
                } else {
                    setCategories(res.data.data)
                }
            })
    }, [])

    async function updateProduct(eventForm: FormDataEvent) {
        eventForm.preventDefault();
        let updateInfor = {
            categoryId: (eventForm.target as any).categoryId.value,
            name: (eventForm.target as any).name.value,
            des: (eventForm.target as any).des.value,
            price: Number((eventForm.target as any).price.value),
        };
        let formData = new FormData();
        if ((eventForm.target as any).avatar.files.length > 0) {
            formData.append("avatar", (eventForm.target as any).avatar.files[0]);
        }
        formData.append("product_infor", JSON.stringify(updateInfor));
        console.log("formData", updateInfor);

        apis.productApi.update((props.product).id, formData).then(res => {
            if (res.status == 200) {
                message.success("Update product successfully")
            } else {
                Modal.error({
                    content: res.data.message
                })
            }
        }).catch(err => {
            console.log("err", err)
        })
    }

    // function setAvatarFile(arg0: File) {
    //     throw new Error('Function not implemented.');
    // }

    return (
        <>
            <button className="status update" onClick={showModal}>
                Update
            </button>

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <form onSubmit={(e) => {
                    updateProduct(e as any)
                }}>
                    <div className='product-image'>
                        <img style={{ width: "100px" }} src={props.product.avatar} alt="Product Avatar" ref={imgPreviewRef} />
                        <input
                            name="avatar"
                            onChange={(event) => {
                                if (imgPreviewRef.current) {
                                    if (event.target.files && event.target.files.length > 0) {
                                        const blobUrl = URL.createObjectURL(event.target.files[0]);
                                        imgPreviewRef.current.src = blobUrl;
                                    } else {
                                        console.log('Chưa chọn hình!');
                                    }
                                }
                            }}

                            type="file"
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="">Name</label><br /><input type="text" defaultValue={props.product.name} name='name' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="">Price</label><br />
                        <input type="text" defaultValue={props.product.price} name='price' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Category</label><br />
                        <select name='categoryId' defaultValue={props.product.categoryId}>
                            {
                                categories.map(category => <option key={Math.random() * Date.now()} value={(category as Category).id}>{(category as Category).title}</option>)
                            }
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="">Description</label><br />
                        <textarea name="des" defaultValue={props.product.des}></textarea>
                    </div>
                    <button type='submit' style={{ background: "blue" }} >
                        Complete
                    </button>
                </form>

            </Modal >

        </>




    );
};

export default Update;
