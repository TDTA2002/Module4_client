import Lazy from "@/utils/lazies/Lazy";
import { Route } from "react-router-dom";

export default
    <Route path="/admin" element={Lazy(() => import("@admin/App"))()}>
     
    </Route>