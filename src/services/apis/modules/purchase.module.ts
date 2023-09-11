import axios from "axios";

export default {
    createGuestReceipt: async function (newGuestReceipt: any, guestReceiptDetailList: any) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "purchase", {
            newGuestReceipt,
            guestReceiptDetailList
        })
    },
    userGuestReceipt: async function (newUserReceipt: any, userReceiptDetailList: any, userId: string) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "userpurchase", {
            newUserReceipt,
            userReceiptDetailList,
            userId
        })
    },
    findGuestReceipt: async function (data: {
        email: string;
        otp?: string;
    }) {
        let body: any = {
            guestEmail: data.email
        }
        if (data.otp) {
            body.otp = data.otp
        }
        return await axios.post(import.meta.env.VITE_SV_HOST + "purchase/order-history", body)
    },
    findAll: async function (maxItemPage: number, skipItem: number) {
        return await axios.get(`${import.meta.env.VITE_SV_HOST}/purchase?maxItemPage=${maxItemPage}&skipItem=${skipItem}`);
    },
    findUserAll: async function (maxItemPage: number, skipItem: number) {
        return await axios.get(`${import.meta.env.VITE_SV_HOST}/userpurchase?maxItemPage=${maxItemPage}&skipItem=${skipItem}`);
    },
    findById: async function (orderId: string) {
        return await axios.get(`${import.meta.env.VITE_SV_HOST}/purchase/${orderId}`);
    },
    findUserById: async function (orderId: string) {
        return await axios.get(`${import.meta.env.VITE_SV_HOST}/userpurchase/${orderId}`);
    },
    update: async function (orderId: string, data: {
        state: string,
        type: boolean
    }) {
        return await axios.patch(`${import.meta.env.VITE_SV_HOST}/purchase/${orderId}`, data);
    },
}