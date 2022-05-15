import { bookmarksSliceActions } from './../reducers/bookmarksSlice';
import { bookmarksApi } from './../../api/bookmarksApi';
import { productType } from './../../types/apiTypes';
import { takeLeading, call, put, actionChannel } from 'redux-saga/effects';
import { productSliceActions } from '../reducers/productSlice';
export const GET_BOOKMARKS_ITEMS = 'bookmarksSaga/GET_BOOKMARKS_ITEMS'
const TOGGLE_IS_LIKED_BOOKMARK = 'bookmarksSaga/TOGGLE_IS_LIKED_BOOKMARK'
const TOGGLE_IS_IN_BASKET_BOOKMARK = 'bookmarksSaga/TOGGLE_IS_IN_BASKET_BOOKMARK'
const DELETE_ITEM_FROM_BOOKMARK = 'bookmarksSaga/DELETE_ITEM_FROM_BOOKMARK'
const ADD_ITEM_IN_BOOKMARK = 'bookmarksSaga/ADD_ITEM_IN_BOOKMARK'
const GET_PRODUCT = 'bookmarksSaga/GET_PRODUCT'

type toggleIsLikedBookmarkSagaAcType = ReturnType<typeof toggleIsLikedBookmarkSagaAc>
type toggleIsInBasketBookmarkSagaAcType = ReturnType<typeof toggleIsInBasketBookmarkSagaAc>
type deleteItemFromBookmarkSagaAcType = ReturnType<typeof deleteItemFromBookmarkSagaAc>
type addItemInBookmarksSagaAcType = ReturnType<typeof addItemInBookmarksSagaAc>
type getBookmarksProductSagaAC = ReturnType<typeof getBookmarksProductSagaAC>
export const toggleIsLikedBookmarkSagaAc = (id: string, isLiked: boolean) => ({
    type: TOGGLE_IS_LIKED_BOOKMARK as typeof TOGGLE_IS_LIKED_BOOKMARK,
    id,
    isLiked
})
export const toggleIsInBasketBookmarkSagaAc = (id: string, isInBasket: boolean) => ({
    type: TOGGLE_IS_IN_BASKET_BOOKMARK as typeof TOGGLE_IS_IN_BASKET_BOOKMARK,
    id,
    isInBasket
})
export const deleteItemFromBookmarkSagaAc = (id: string) => ({
    type: DELETE_ITEM_FROM_BOOKMARK as typeof DELETE_ITEM_FROM_BOOKMARK,
    id
})
export const addItemInBookmarksSagaAc = (item: productType) => ({
    type: ADD_ITEM_IN_BOOKMARK as typeof ADD_ITEM_IN_BOOKMARK,
    item
})
export const getBookmarksProductSagaAC = (id: string) => ({
    type: GET_PRODUCT as typeof GET_PRODUCT,
    id
})

function* getProductWorker(action: getBookmarksProductSagaAC) {
    yield put(productSliceActions.toggleProductLoading(true))
    try {
        const product: productType = yield call(bookmarksApi.getBookmarkItem, action.id)
        yield put(productSliceActions.getProduct(product))
        yield put(productSliceActions.toggleProductLoading(false))

    } catch (error) {
        console.log('Ошибка в getProductBookmarksWorker', error)
        yield put(productSliceActions.toggleProductLoading(true))
    }
}
function* toggleIsLikedBookmarkWorker(action: toggleIsLikedBookmarkSagaAcType) {
    try {
        const item: productType = yield call(bookmarksApi.toggleIsLikedBookmark, action.id, action.isLiked)
        yield put(bookmarksSliceActions.setIsAnythingChangedInBookmark(item))
    } catch (error) {
        console.log('Ошибка в toggleIsLikedBookmarkWorker', error)
    }
}

function* toggleIsInBasketBookmarkWorker(action: toggleIsInBasketBookmarkSagaAcType) {
    try {
        const item: productType = yield call(bookmarksApi.toggleIsInBasketBookmark, action.id, action.isInBasket)
        yield put(bookmarksSliceActions.setIsAnythingChangedInBookmark(item))
    } catch (error) {
        console.log('Ошибка в toggleIsInBasketBookmarkWorker', error)
    }
}

function* deleteItemFromBookmarkWorker(action: deleteItemFromBookmarkSagaAcType) {
    try {
        const item: productType = yield call(bookmarksApi.deleteBookmark, action.id)
        yield put(bookmarksSliceActions.deleteBookmarksItem(item))
    } catch (error) {
        console.log('Ошибка в deleteItemFromBookmarkWorker', error)
    }
}

function* addItemInBookmarksWorker(action: addItemInBookmarksSagaAcType) {
    try {
        const item: productType = yield call(bookmarksApi.addBookmarkItem, action.item)
        const items: productType[] = yield call(bookmarksApi.getBookmarks)
        yield put(bookmarksSliceActions.getBookmarksItems(items))
    } catch (error) {

    }
}

function* getBookmarksItemsWorker() {
    yield put(bookmarksSliceActions.toggleBookmarksItemsIsLoading(true))
    try {
        const items: productType[] = yield call(bookmarksApi.getBookmarks)
        yield put(bookmarksSliceActions.getBookmarksItems(items))
        yield put(bookmarksSliceActions.setTotalBookmarksItemsCount(items.length))
        yield put(bookmarksSliceActions.toggleBookmarksItemsIsLoading(false))
    } catch (error) {
        yield put(bookmarksSliceActions.toggleBookmarksItemsIsLoading(false))
        yield put(bookmarksSliceActions.setTotalBookmarksItemsCount(0))
    }

}

export function* bookmarksWatcher() {
    yield takeLeading(GET_BOOKMARKS_ITEMS, getBookmarksItemsWorker)
    yield takeLeading(TOGGLE_IS_LIKED_BOOKMARK, toggleIsLikedBookmarkWorker)

    yield takeLeading(DELETE_ITEM_FROM_BOOKMARK, deleteItemFromBookmarkWorker)
    yield takeLeading(ADD_ITEM_IN_BOOKMARK, addItemInBookmarksWorker)
    yield takeLeading(GET_PRODUCT, getProductWorker)
    //@ts-ignore
    const toggleIsInBasketChanell = yield actionChannel(TOGGLE_IS_IN_BASKET_BOOKMARK)
    yield takeLeading(toggleIsInBasketChanell, toggleIsInBasketBookmarkWorker)

}