import Lazy from "@/utils/lazies/Lazy";
import { Route } from "react-router-dom";

export default
    <Route path="/admin" element={Lazy(() => import("@admin/Admin"))()}>
        <Route path="add_product" element={Lazy(() => import("@admin/Productlist"))()}></Route>
        <Route path="add_category" element={Lazy(() => import("@admin/Category"))()}></Route>
        <Route path="list_user" element={Lazy(() => import("@admin/User"))()}></Route>
        <Route path="order" element={Lazy(() => import("@admin/Order"))()}></Route>
        <Route path="Userbill" element={Lazy(() => import("@admin/UserBill"))()}></Route>
        <Route path="order/:orderId" element={Lazy(() => import("@admin/OrderDetail"))()}></Route>
        <Route path="Userbill/:orderId" element={Lazy(() => import("@admin/UserOrderDetail"))()}></Route>

        <Route path="" element={Lazy(() => import("@admin/Home"))()}></Route>
    </Route>