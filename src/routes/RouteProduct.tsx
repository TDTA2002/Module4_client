import Lazy from "@/utils/lazies/Lazy";
import { Route } from "react-router-dom";

export default
  <>
    <Route path="/products" element={Lazy(() => import("@pages/products/Product"))()}>
    </Route>
    <Route path="products/:categoryId" element={Lazy(() => import("@pages/products/Product"))()}></Route>

    <Route path="/detail/:id" element={Lazy(() => import("@pages/products/productDetails/ProductDetail"))()}></Route>

    <Route path="/carts" element={Lazy(() => import("@pages/carts/Cart"))()}>
    </Route>
    <Route path="/check-order" element={Lazy(() => import("@pages/checkOrder/CheckOrder"))()}></Route>
    <Route path="/thank" element={Lazy(() => import("@pages/thank/Thank"))()}></Route>
    {/* <Route path="/bill" element={Lazy(() => import("@pages/bill/Bill"))()}></Route>
    <Route path="/receipt" element={Lazy(() => import("@pages/receipt/Receipt"))()}></Route> */}

  </>
