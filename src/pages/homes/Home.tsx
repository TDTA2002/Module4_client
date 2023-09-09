import './home.scss'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbars/Navbar'
import Footer from './components/Footers/Footer'
import { useEffect, useState } from 'react';
import apis from '@/services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { userAction } from '@/stores/slices/user.slice';

export default function Home() {
  const dispatch = useDispatch();
  const store = useSelector(store => store) as StoreType;
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
  // console.log("store.userStore.data", store.userStore.data.isAdmin);

  const [isAdmin, setIsAdmin] = useState(false);
  const checkAdmin = () => {
    if (store.userStore.data?.isAdmin) {
      setIsAdmin(!isAdmin)
    }
  }
  useEffect(() => {
    checkAdmin()
  }, [store.userStore])


  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Bạn có muốn đăng xuất không?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="root_page">
      <section className="before_nav">
        <div className="before_nav_content">

          <>
            {store.userStore?.data?.user_name ? (
              <span className="feature_item" onClick={() => handleLogout()}>
                <h1 className="brand_name">what's up {store.userStore.data.firstName}</h1>
              </span>
            ) : (
              <div >
                WelCome
              </div>
            )}
          </>
          <div className="feature">
            <span className="feature_item">Support Pages</span>
            <span className="feature_item">  {isAdmin ? <span onClick={() => navigate("/admin")}>Admin</span> : <span onClick={() => navigate("/profile")}>Profile</span>}</span>


            <>
              {store.userStore?.data?.user_name ? (
                <span className="feature_item" onClick={() => handleLogout()}>
                  Logout
                </span>
              ) : (
                <Link to="form" className="feature_item">
                  Login
                </Link>
              )}
            </>
          </div>
        </div>

      </section>
      {/* Navbar */}
      <Navbar />
      {/* <Carousel /> */}
      {/* Body */}
      {/* <Test /> */}
      <Outlet />

      {/* Footer */}
      <Footer />
    </div>
  )
}
