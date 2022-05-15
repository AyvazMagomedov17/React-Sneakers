import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productType } from './../../types/apiTypes';
const initialState = {
    bookmarksItems: [] as productType[],
    bookmarksItemsIsLoading: false,
    totalBookmarksItemsCount: 1
}

const bookmarksSlice = createSlice({
    name: 'bookmarkSlice',
    initialState: initialState,
    reducers: {
        getBookmarksItems(state, action: PayloadAction<productType[]>) {
            state.bookmarksItems = action.payload
        },
        toggleBookmarksItemsIsLoading(state, action: PayloadAction<boolean>) {
            state.bookmarksItemsIsLoading = action.payload
        },
        deleteBookmarksItem(state, action: PayloadAction<productType>) {
            state.bookmarksItems.map(item => {
                if (item.id === action.payload.id) {
                    return state.bookmarksItems.splice(state.bookmarksItems.indexOf(item), 1)
                }
            })
            state.totalBookmarksItemsCount = state.bookmarksItems.length
        },
        setTotalBookmarksItemsCount(state, action: PayloadAction<number>) {
            state.totalBookmarksItemsCount = action.payload
        },
        setIsAnythingChangedInBookmark(state, action: PayloadAction<productType>) {
            state.bookmarksItems.map(item => {
                if (item.id === action.payload.id) {
                    return state.bookmarksItems.splice(state.bookmarksItems.indexOf(item), 1, action.payload)
                }
                return state.bookmarksItems
            })
        },
        deleteItemFromBookmarks(state, action: PayloadAction<productType>) {
            state.bookmarksItems.map(item => {
                if (item.id === action.payload.id) {
                    return state.bookmarksItems.splice(state.bookmarksItems.indexOf(item), 1)
                }
                return state.bookmarksItems
            })
        }
    }
})
export const bookmarksSliceActions = bookmarksSlice.actions
export const bookmarksSliceReducer = bookmarksSlice.reducer
export const bookmarksSliceName = bookmarksSlice.name