import { BiShoppingBag } from 'react-icons/bi';
import './navbar.scss';
import { useEffect, useState } from 'react';
import InputWithAnimation from './search';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
const App = () => {
    const [scrolling, setScrolling] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="nav">
            <div className='nav_content'>
                <div className="logo"><img src="https://img.etimg.com/thumb/msid-59738997,width-480,height-360,imgsize-21421,resizemode-75/nike.jpg" alt="" /></div>
                <div className="menu">
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li>Products</li>
                        <li>Forum</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <div className='right_content'>
                    <i className="fas fa-search" onClick={handleShow} ></i>
                    <Link to={'/carts'} className="cart"><BiShoppingBag /></Link>
                    <Offcanvas show={show} onHide={handleClose} placement="top" style={{ height: '40%'}}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            Nội dung của Offcanvas ở vị trí top.
                        </Offcanvas.Body>
                    </Offcanvas>

                </div>
            </div>

        </div>
    );
};

export default App;
