import { productType } from './../types/apiTypes';
import { instanse } from '.';
export const bookmarksApi = {
    getBookmarks: async () => {
        const response = await instanse.get('bookmarks')
        const data: productType[] = response.data
        return data
    },
    deleteBookmark: async (id: string) => {
        const response = await instanse.delete(`bookmarks/${id}`)
        const data: productType = response.data
        return data
    },
    toggleIsLikedBookmark: async (id: string, isLiked: boolean) => {
        const response = await instanse.put(`bookmarks/${id}`, { isLiked: isLiked })
        const data: productType = response.data
        return data
    },
    toggleIsInBasketBookmark: async (id: string, isInBasket: boolean) => {
        const response = await instanse.put(`bookmarks/${id}`, { isInBasket })
        const data: productType = response.data
        return data
    },
    addBookmarkItem: async (item: productType) => {
        const response = await instanse.post('bookmarks', item)
        const data: productType[] = response.data
        return data
    },
    getBookmarkItem: async (id: string) => {
        const response = await instanse.get(`bookmarks/${id}`)
        const data: productType = response.data
        return data
    }
}