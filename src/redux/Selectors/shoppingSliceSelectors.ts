import { RootStateType } from './../store';
export const getShoppingItemsSelector = (state: RootStateType) => {
    return state.shoppingSlice.shoppingItems
}

export const getIsSetShoppingSelector = (state: RootStateType) => {
    return state.shoppingSlice.isSetShopping
}
export const getTotalShoppingCountSelector = (state: RootStateType) => {
    return state.shoppingSlice.totalShopingCount
}
export const getShoppingItemsIsLoadingSelector = (state: RootStateType) => {
    return state.shoppingSlice.shoppingItemsIsLoading
}