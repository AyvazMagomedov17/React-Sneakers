import { productsApi } from './../../api/productsApi';
import { productSliceActions } from './../reducers/productSlice';
import { basketSliceActions } from './../reducers/basketSlice';
import { productType } from './../../types/apiTypes';
import { shoppingApi } from './../../api/shoppingApi';
import { call, put, takeLeading, actionChannel } from 'redux-saga/effects'
import { shoppingSliceActions } from '../reducers/shoppingSlice';
const ADD_SHOPPING_ITEM_IN_SHOPPING = 'shoppingSaga/ADD_SHOPPING_ITEM_IN_SHOPPING'
const GET_PRODUCT = 'shoppingSaga/GET_PRODUCT'
export const GET_SHOPPINGS = 'shoppingSaga/GET_SHOPPINGS'

type addShoppingItemInShoppingWorkerACType = ReturnType<typeof addShoppingItemInShoppingWorkerAC>
type getShoppingProductSagaAcType = ReturnType<typeof getShoppingProductSagaAc>

export const addShoppingItemInShoppingWorkerAC = (product: productType) => ({
    type: ADD_SHOPPING_ITEM_IN_SHOPPING as typeof ADD_SHOPPING_ITEM_IN_SHOPPING,
    product
})
export const getShoppingProductSagaAc = (id: string) => ({
    type: GET_PRODUCT as typeof GET_PRODUCT,
    id
})

function* getProductWorker(action: getShoppingProductSagaAcType) {
    yield put(productSliceActions.toggleProductLoading(true))
    try {
        const product: productType = yield call(shoppingApi.getShoppingItem, action.id)
        yield put(productSliceActions.getProduct(product))
        yield put(productSliceActions.toggleProductLoading(false))

    } catch (error) {
        console.log('Ошибка в getProductShoppingWorker', error)
        yield put(productSliceActions.toggleProductLoading(true))
    }
}

function* getShoppingsWorker() {
    yield put(shoppingSliceActions.toggleIsSetShopping(true))
    yield put(shoppingSliceActions.toggleShoppingItemsIsLoading(true))
    try {
        const data: productType[] = yield call(shoppingApi.getShopping)
        yield put(shoppingSliceActions.getShoppingItems(data))
        yield put(shoppingSliceActions.setTotalShoppingCount(data.length))
        yield put(shoppingSliceActions.toggleShoppingItemsIsLoading(false))
    } catch (error) {

        yield put(shoppingSliceActions.toggleShoppingItemsIsLoading(false))
        yield put(shoppingSliceActions.setTotalShoppingCount(0))
    }



}
function* addShoppingItemInShoppingWorker({ type, product }: addShoppingItemInShoppingWorkerACType) {
    yield put(shoppingSliceActions.toggleIsSetShopping(true))

    try {
        const item: productType = yield call(shoppingApi.addShopping, product)

    } catch (error) {
        yield put(basketSliceActions.toggleBasketItemsIsCheckout(false))

    }

}
export function* shoppingWatcher() {
    yield takeLeading(GET_SHOPPINGS, getShoppingsWorker)
    //@ts-ignore
    const channel = yield actionChannel(ADD_SHOPPING_ITEM_IN_SHOPPING)
    yield takeLeading(channel, addShoppingItemInShoppingWorker)
    yield takeLeading(GET_PRODUCT, getProductWorker)

}