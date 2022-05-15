import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productType } from './../../types/apiTypes';

const shoppingInitialState = {
    shoppingItems: [] as productType[],
    totalShopingCount: 1,
    isSetShopping: false,
    shoppingItemsIsLoading: false
}
type InitialStateType = typeof shoppingInitialState
const shoppingSlice = createSlice({
    name: 'shoppingSlice',
    initialState: shoppingInitialState as InitialStateType,
    reducers: {
        getShoppingItems(state: InitialStateType, action: PayloadAction<productType[]>) {
            state.shoppingItems = action.payload
        },
        addShoppingItem(state, action: PayloadAction<productType>) {
            state.shoppingItems.push(action.payload)
        },
        setTotalShoppingCount(state, action: PayloadAction<number>) {
            state.totalShopingCount = action.payload
        },
        toggleIsSetShopping(state, action: PayloadAction<boolean>) {
            state.isSetShopping = action.payload
        },
        toggleShoppingItemsIsLoading(state, action: PayloadAction<boolean>) {
            state.shoppingItemsIsLoading = action.payload
        }

    }
})
export const shoppingSliceName = shoppingSlice.name
export const shoppingSliceActions = shoppingSlice.actions
export const shoppingSliceReducer = shoppingSlice.reducer
