import './navbar.scss';

import { Link } from 'react-router-dom';
import InputWithAnimation from './search';
const App = () => {
    // const [scrolling, setScrolling] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (window.scrollY > 100) {
    //             setScrolling(true);
    //         } else {
    //             setScrolling(false);
    //         }
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    return (
        <div className="nav">
            <div className='nav_content'>
                <div className="logo"><svg aria-hidden="true" className="pre-logo-svg" color='orange' focusable="false" viewBox="0 0 24 24" role="img" width="54px" height="54px" fill="none"><path fill="currentColor" fill-rule="evenodd" d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z" clip-rule="evenodd"></path></svg></div>
                <div className="menu">
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/products'}>Products</Link></li>
                        <li>Forum</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <InputWithAnimation />

            </div>

        </div>
    );
};

export default App;
