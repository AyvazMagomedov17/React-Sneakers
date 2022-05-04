import { GetSneakersType } from './../types/apiTypes';
import axios from "axios";

const instanse = axios.create({
    baseURL: 'https://62703f986a36d4d62c16e46e.mockapi.io/',

})

export const sneakersApi = {
    getSneakers: async () => {
        const response = await instanse.get('items')
        const data: Array<GetSneakersType> = response.data
        return data
    },
    deleteSneakers: async (id: number) => {
        const response = await instanse.delete(`items/${id}`)
        const data: Array<GetSneakersType> = response.data
        return data

    },
    postSneakers: async (sneaker: GetSneakersType) => {
        const response = await instanse.post(`items`, sneaker)
        const data: Array<GetSneakersType> = response.data
        return data

    },
    changeSneakers: async (id: number, price: number) => {
        const response = await instanse.put(`items/${id}`, { price: price })
        const data: Array<GetSneakersType> = response.data
        return data

    }
}