import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { filterType, productType } from "../../types/apiTypes"


const productsInitialState = {
    products: [] as Array<productType>,
    productsIsLoading: false,
    error: '' as string,
    productsTotalCount: 0,
    currentPage: 1,
    isAnythingChangedLoading: false,
    filter: {
        isLiked: null as any,
        title: '' as string
    } as filterType

}

export const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: productsInitialState,
    reducers: {
        setProducts(state, action: PayloadAction<Array<productType>>) {
            state.products = action.payload
        },
        toggleIsLoading(state, { payload, type }: PayloadAction<boolean>) {
            state.productsIsLoading = payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setIsAnythingChangeInProduct(state, action: PayloadAction<{ id: string, product: productType }>) {
            state.products.map((product) => {
                if (product.id === action.payload.id) {
                    return state.products.splice(state.products.indexOf(product), 1, action.payload.product)
                }
                return state.products
            })
        },
        setTotalProductsCount(state, action: PayloadAction<number>) {
            state.productsTotalCount = action.payload
        },
        toggleIsAnythingChangedLoading(state, action: PayloadAction<boolean>) {
            state.isAnythingChangedLoading = action.payload
        },
        setFilter(state, action: PayloadAction<filterType>) {
            state.filter = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        }

    }

})

export const productsSliceReducer = productsSlice.reducer
export const productsSliceActions = productsSlice.actions
export const productsSliceName = productsSlice.name