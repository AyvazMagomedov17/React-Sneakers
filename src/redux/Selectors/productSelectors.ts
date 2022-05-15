import { RootStateType } from '../store';
export const getProductSelector = (state: RootStateType) => {
    return state.productSlice.product
}
export const getProductIsLoadingSelector = (state: RootStateType) => {
    return state.productSlice.productIsLoading
}