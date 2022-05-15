

import { instanse } from ".";
import { productType } from "../types/apiTypes";



export const productsApi = {
    getProducts: async () => {
        const response = await instanse.get('items')
        const data: Array<productType> = response.data
        return data
    },
    deleteProducts: async (id: number) => {
        const response = await instanse.delete(`items/${id}`)
        const data: Array<productType> = response.data
        return data

    },
    postProducts: async (sneaker: productType) => {
        const response = await instanse.post(`items`, sneaker)
        const data: Array<productType> = response.data
        return data

    },
    changeIsInBasket: async (id: string, isInBasket: boolean) => {
        const response = await instanse.put(`items/${id}`, { isInBasket: isInBasket })
        const data: productType = response.data
        return data
    },
    changeIsLiked: async (id: string, isLiked: boolean) => {
        const response = await instanse.put(`items/${id}`, { isLiked: isLiked })
        const data: productType = response.data
        return data
    },
    searchProductsApi: async (request: string | undefined, isLiked: boolean) => {
        if (request) {
            const response = await instanse.get(`items?title=${request}`)
            const data: productType[] = response.data
            return data
        }
        if (isLiked) {
            debugger
            const response = await instanse.get(`items?isLiked=${isLiked}`)
            const data: productType[] = response.data
            return data
        }

        if (!request && !isLiked) {

            const response = await instanse.get(`items`)
            const data: productType[] = response.data
            return data
        }
    },
    getProduct: async (id: string) => {
        const response = await instanse.get(`items/${id}`)
        const data: productType = response.data
        return data
    }
}