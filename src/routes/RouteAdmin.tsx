import Lazy from "@/utils/lazies/Lazy";
import { Route } from "react-router-dom";

export default
    <Route path="/admin" element={Lazy(() => import("@admin/Admin"))()}>
        <Route path="add_product" element={Lazy(() => import("@admin/Productlist"))()}></Route>
        <Route path="add_category" element={Lazy(() => import("@admin/Category"))()}></Route>
        <Route path="list_user" element={Lazy(() => import("@admin/User"))()}></Route>
        <Route path="" element={Lazy(() => import("@admin/Home"))()}></Route>
    </Route>