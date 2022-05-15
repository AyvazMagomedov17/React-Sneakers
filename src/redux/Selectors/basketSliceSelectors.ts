import { RootStateType } from './../store';
export const getBasketProductsSelector = (state: RootStateType) => {
    return state.basketSlice.basketProducts
}
export const getTotalBasketPriceSelector = (state: RootStateType) => {
    return state.basketSlice.totalPrice
}

export const getTotalBasketItemsCountSelector = (state: RootStateType) => {
    return state.basketSlice.totalBasketItemsCount
}
export const getRecessionIsLoading = (state: RootStateType) => {
    return state.basketSlice.recessionIsLoading
}
export const getBasketItemsIsCheckout = (state: RootStateType) => {
    return state.basketSlice.basketItemsIsCheckout
}