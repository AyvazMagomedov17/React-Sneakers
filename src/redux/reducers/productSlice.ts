import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productType } from './../../types/apiTypes';
const inititalState = {
    product: {} as productType,
    productIsLoading: false
}

const productSlice = createSlice({
    initialState: inititalState,
    name: 'productSlice',
    reducers: {
        getProduct(state, action: PayloadAction<productType>) {
            state.product = action.payload
        },
        toggleProductLoading(state, action: PayloadAction<boolean>) {
            state.productIsLoading = action.payload
        },
        deleteProduct(state, action: PayloadAction<productType>) {
            state.productIsLoading = false
        }
    }
})

export const productSliceName = productSlice.name
export const productSliceReducer = productSlice.reducer
export const productSliceActions = productSlice.actions