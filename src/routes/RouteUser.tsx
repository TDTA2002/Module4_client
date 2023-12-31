import Lazy from "@/utils/lazies/Lazy";
import { Route } from "react-router-dom";

export default
    <>
        {/* <Route path="/register" element={Lazy(() => import("@pages/users/Register"))()} />
        <Route path="/login" element={Lazy(() => import("@pages/users/Login"))()} /> */}
        <Route path="/form" element={Lazy(() => import("@/pages/users/Test"))()} />
        <Route path="/checkoutuser" element={Lazy(() => import("@/pages/users/checkout/Checkout"))()} />

    </>
