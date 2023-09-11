import React, { useState, useEffect } from 'react';
import { BiShoppingBag } from 'react-icons/bi';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import './search.scss'
import apis from '@/services/apis';

interface Product {
    avatar: string;
    name: string;
    price: number;
}
interface Categories {
    title: string
}

const InputWithAnimation: React.FC = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [searchStatus, setSearchStatus] = useState(false);
    const [searchData, setSearchData] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Categories[]>([]);

    useEffect(() => {
        apis.categoryApi.findMany()
            .then(res => setCategories(res.data.data))
            .catch(err => console.log(err))
    }, []);

    let timeOut: NodeJS.Timeout;

    async function search(e: React.ChangeEvent<HTMLInputElement>) {
        console.log("search", e.target.value);
        clearTimeout(timeOut);
        if (e.target.value === "") {
            setSearchData([]);
            return;
        }

        timeOut = setTimeout(async () => {
            setSearchStatus(true);
            try {
                if (searchStatus) {
                    return;
                }
                const searchResult = await apis.productApi.findByName(e.target.value);
                if (searchResult.status === 200) {
                    setTimeout(() => {
                        setSearchStatus(false);
                        setSearchData(searchResult.data.data);
                    }, 1500);
                } else {
                    console.log("Lỗi khi gọi API tìm kiếm");
                }
            } catch (err) {
                console.log("Lỗi khi gọi API tìm kiếm");
            }
        }, 600);
    }


    return (
        <div className='right_content'>
            <i className="fas fa-search" onClick={handleShow}></i>
            <Link to={'/carts'} className="cart"><BiShoppingBag /></Link>
            <Offcanvas show={show} onHide={handleClose} placement="top" style={{ height: '75%' }}>
                <Offcanvas.Header closeButton style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="70px" height="70px" fill="none"><path fill="currentColor" fillRule="evenodd" d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z" clipRule="evenodd"></path></svg>
                    </div>
                    <div className="search__container">
                        <input className="search__input" type="text" placeholder="Search" onChange={search} />
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="productsearch" id="Products">
                        <div className="box">
                            {searchData.length > 0 ? (
                                searchData.map((result, index) => (
                                    <div className="card" key={index}>
                                        <div className="image">
                                            <img src={result.avatar} alt={`Product ${index}`} />
                                        </div>
                                        <div className="products_text">
                                            <h2>{result.name}</h2>
                                            <h3>${result.price}</h3>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ fontSize: "25px" }}>
                                    Popular Search Terms
                                    <br />
                                    <br />

                                    <div>
                                        {categories.map((category, id) => (
                                            <div>
                                                <Link to={`${category.title}`} style={{ fontSize: "20px" }} key={id}><strong>{category.title}</strong></Link>
                                                <br />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            )}
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div >
    );
};

export default InputWithAnimation;
