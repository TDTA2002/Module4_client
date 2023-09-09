import axios from "axios";

export default {
    create: async function (formData: FormData) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "products", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    getAllProducts: async function () {
        return await axios.get(import.meta.env.VITE_SV_HOST + "products")
    },
    findMany: async function (maxItemPage: number, skipItem: number) {
        return await axios.get(`${import.meta.env.VITE_SV_HOST}/products/manyproduct?maxItemPage=${maxItemPage}&skipItem=${skipItem}`);
    },
    findById: async function (productId: string) {
        return await axios.get(import.meta.env.VITE_SV_HOST + "products/" + productId)
    },
    findByCategory: async function (categoryId: string) {
        return await axios.get(import.meta.env.VITE_SV_HOST + `connection/${categoryId}`)
    },
}