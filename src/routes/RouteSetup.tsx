import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Lazy Function */
import Lazy from '@utils/lazies/Lazy';

/* Components */
import Home from '@pages/homes/Home';

/* Route Setup */
import RouteProduct from "./RouteProduct";
import RouteUser from "./RouteUser";
import RouteAdmin from "./RouteAdmin";
export default function RouteSetup() {
  return (
    <BrowserRouter>
        <Routes>
            {/* Home - Navbar + Footer */}
            <Route path="/" element={<Home></Home>}>
              <Route path="about" element={Lazy(() => import("@components/Test"))()}></Route>
              <Route path="infor" element={<>Thông Tin</>}></Route>
              {/* Products */}
              {RouteProduct}
            </Route>
             {/* Users */}
            {RouteUser}
            {RouteAdmin}
        </Routes>
    </BrowserRouter>
  )
}
