import { basketSliceActions } from './../reducers/basketSlice';
import { productType } from './../../types/apiTypes';
import { basketApi } from './../../api/basketApi';
import { actionChannel, call, put, select, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects'
const ADD_ITEM_IN_BASKET = 'basketSaga/ADD_ITEM_IN_BASKET'
const DELETE_ITEM_FROM_BASKET = 'basketSaga/DELETE_ITEM_FROM_BASKET'
export const GET_BASKET_ITEMS = 'basketSaga/GET_BASKET_ITEMS'
type AddItemInBasketSagaAcType = ReturnType<typeof addItemInBasketSagaAc>
type DeleteItemFromBasketSagaAcType = ReturnType<typeof deleteItemFromBasketSagaAc>
export const addItemInBasketSagaAc = (item: productType) => ({
    type: ADD_ITEM_IN_BASKET as typeof ADD_ITEM_IN_BASKET,
    item
})
export const deleteItemFromBasketSagaAc = (id: string) => ({
    type: DELETE_ITEM_FROM_BASKET as typeof DELETE_ITEM_FROM_BASKET,
    id
})


function* deleteItemFromBasketWorker({ type, id }: DeleteItemFromBasketSagaAcType) {
    const item: productType = yield call(basketApi.deleteItemFromBasket, id)
    yield put(basketSliceActions.deleteItemFromBasket(item))
}

function* addItemInBasketWorker({ type, item }: AddItemInBasketSagaAcType) {
    const data: productType = yield call(basketApi.addItemInBasket, item)

    yield put(basketSliceActions.addItemInBasket(data))
}
function* getBasketItemsWorker() {
    yield put(basketSliceActions.toggleBasketProductsIsLoading(true))
    const items: productType[] = yield call(basketApi.getBasketItems)
    yield put(basketSliceActions.getBasketProducts(items))
    let totalprice = 0
    items.forEach((item) => {
        totalprice = totalprice + item.price
    })
    yield put(basketSliceActions.setTotalPrice(totalprice))
    yield put(basketSliceActions.setTotalBasketItemsCount(items.length))
    yield put(basketSliceActions.toggleBasketProductsIsLoading(false))

}
export function* basketWatcher() {
    yield takeLeading(GET_BASKET_ITEMS, getBasketItemsWorker)
    yield takeLeading(ADD_ITEM_IN_BASKET, addItemInBasketWorker)

    //@ts-ignore
    const chanell = yield actionChannel(DELETE_ITEM_FROM_BASKET)
    yield takeLeading(chanell, deleteItemFromBasketWorker)
}