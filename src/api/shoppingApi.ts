import { productType } from './../types/apiTypes';
import { instanse } from "."


export const shoppingApi = {
    getShopping: async () => {
        const response = await instanse.get('shopping')
        const data: productType[] = response.data
        return data
    },
    addShopping: async (product: productType) => {
        const response = await instanse.post('shopping', product)
    },
    getShoppingItem: async (id: string) => {
        const response = await instanse.get(`shopping/${id}`)
        const data: productType = response.data
        return data
    }

}