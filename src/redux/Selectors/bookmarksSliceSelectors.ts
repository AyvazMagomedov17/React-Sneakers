import { RootStateType } from './../store';

export const getBookmarksItemsSelector = (state: RootStateType) => {
    return state.bookmarkSlice.bookmarksItems
}
export const getBookmarksItemsIsLoadingSelector = (state: RootStateType) => {
    return state.bookmarkSlice.bookmarksItemsIsLoading
}
export const getTotalBookmarksItemsCountSelector = (state: RootStateType) => {
    return state.bookmarkSlice.totalBookmarksItemsCount
}