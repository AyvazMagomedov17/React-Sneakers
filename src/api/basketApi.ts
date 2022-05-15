import { productType } from './../types/apiTypes';
import { instanse } from '.';
export const basketApi = {
    getBasketItems: async () => {
        const response = await instanse.get('basket')
        const data: productType[] = response.data
        return data
    },
    addItemInBasket: async (item: productType) => {
        const response = await instanse.post('/basket', item)
        const data: productType = response.data
        return data
    },
    deleteItemFromBasket: async (id: string) => {
        const response = await instanse.delete(`basket/${id}`)
        const data: productType = response.data
        return data
    },
    clearBasket: async () => {
        const response = await instanse.post(`basket`)
    },

}