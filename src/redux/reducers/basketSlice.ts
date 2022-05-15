import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { productType } from './../../types/apiTypes';
const baskeInitialState = {
    basketProducts: [] as productType[],
    totalPrice: 0,
    totalBasketItemsCount: 0,
    basketProductsIsLoading: false,
    recessionIsLoading: false,
    basketItemsIsCheckout: false,
}

const basketSlice = createSlice({
    name: 'basketSlice',
    initialState: baskeInitialState,
    reducers: {
        setTotalPrice(state, action: PayloadAction<number>) {
            state.totalPrice = action.payload
        },
        getBasketProducts(state, action: PayloadAction<productType[]>) {
            state.basketProducts = action.payload
        },
        setTotalBasketItemsCount(state, action: PayloadAction<number>) {
            state.totalBasketItemsCount = action.payload
        },
        addItemInBasket(state, action: PayloadAction<productType>) {

            state.basketProducts = [action.payload, ...state.basketProducts]
            state.totalBasketItemsCount = state.basketProducts.length
        },
        toggleBasketProductsIsLoading(state, action: PayloadAction<boolean>) {
            state.basketProductsIsLoading = action.payload
        },
        deleteItemFromBasket(state, action: PayloadAction<productType>) {
            state.basketProducts.map(item => {
                if (item.id === action.payload.id) {
                    return state.basketProducts.splice(state.basketProducts.indexOf(item), 1)
                }
            })
            state.totalBasketItemsCount = state.basketProducts.length
        },
        toggleRecessionIsLoading(state, action: PayloadAction<boolean>) {

            state.recessionIsLoading = action.payload
        },
        toggleBasketItemsIsCheckout(state, action: PayloadAction<boolean>) {
            state.basketItemsIsCheckout = action.payload
        }

    }
})

export const basketSliceActions = basketSlice.actions
export const basketSliceReducer = basketSlice.reducer
export const basketSliceName = basketSlice.name