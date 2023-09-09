import Lazy from "@/utils/lazies/Lazy";
import { Route } from "react-router-dom";

export default
  <>
    <Route path="/products" element={Lazy(() => import("@pages/products/Product"))()}>
    </Route>
    <Route path="/products/:id" element={Lazy(() => import("@pages/products/productDetails/ProductDetail"))()}></Route>

    <Route path="/carts" element={Lazy(() => import("@pages/carts/Cart"))()}>
    </Route>
    <Route path="/check-order" element={Lazy(() => import("@pages/checkOrder/CheckOrder"))()}></Route>

  </>
