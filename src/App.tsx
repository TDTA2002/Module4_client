import './main.scss';
import RouteSetup from '@routes/RouteSetup';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from './stores'
import api from '@services/apis'
import { useEffect, useState } from 'react';
import { userAction } from './stores/slices/user.slice';

function App() {
  const dispatch = useDispatch();
  const store = useSelector(store => store) as StoreType;


  // useEffect(() => {
  //   api.productApi.getAllProducts()
  //     .then(res => {
  //       if (res.status == 200) {
  //         dispatch(productAction.setProducts(res.data.data))
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Lỗi khi lấy dữ liệu từ API:', error);
  //     });
  // }, []);


  useEffect(() => {
    if (localStorage.getItem("token")) {
      api.userApi.authentication()
        .then(res => {
          if (res.status == 200) {
            dispatch(userAction.setLoginData(res.data.data))
          } else {
            localStorage.removeItem("token")
          }
        })
    }
  }, [])


  return (
    <>

      {/* <h1>User is login: {store.userStore.data?.firstName} {store.userStore.data?.lastName}</h1> */}
      {/* Routing */}
      <RouteSetup />
    </>
  )
}



export default App

