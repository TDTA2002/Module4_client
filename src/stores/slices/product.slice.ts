import { createSlice } from "@reduxjs/toolkit";
export interface ProductState {
    [x: string]: any;
    data: any
}
const initialState: ProductState = {
    data: null
}
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductData: (state, action) => {
            return {
                data: action.payload
            }
        }
    }
})

export const productActions = {
    ...productSlice.actions
}
export const productReducer = productSlice.reducer


// import { createSlice } from "@reduxjs/toolkit";

// export interface ProductState {
//     data: any
// }

// const initialState: ProductState = {
//     data: null
// }

// const productSlice = createSlice({
//     name: "product",
//     initialState,
//     reducers: {
//         setProductData: (state, action) => {
//             return {
//                 data: action.payload
//             }
//         }
//     }
// })

// export const productAction = {
//     ...productSlice.actions
// }

// export const productReducer = productSlice.reducer