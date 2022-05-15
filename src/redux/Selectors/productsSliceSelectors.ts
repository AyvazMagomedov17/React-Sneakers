import { RootStateType } from '../store';
export const getIsProductsLoading = (state: RootStateType) => {
    return state.productsSlice.productsIsLoading
}
export const getProductsSelector = (state: RootStateType) => {
    return state.productsSlice.products
}
export const getIsAnythingChangedLoading = (state: RootStateType) => {
    return state.productsSlice.isAnythingChangedLoading
}
export const getFilterSelector = (state: RootStateType) => {
    return state.productsSlice.filter
}