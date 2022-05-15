import { productsSliceActions } from '../reducers/productsSlice';
import { productType } from '../../types/apiTypes';
import { productsApi } from '../../api/productsApi';
import { actionChannel, call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { productSliceActions, productSliceReducer } from '../reducers/productSlice';

export const TOGGLE_IS_IN_BASKET = 'productsSaga/toggleIsInBasket'
export const TOGGLE_IS_LIKED = 'productsSaga/toggleIsLiked'
export const GET_PRODUCTS = 'productsSaga/GET_GOODS'
export const GET_PRODUCTS_PRODUCT = 'productsSaga/GET_PRODUCT'
const SEARCH_GOODS = 'productsSaga/SEARCH_GOODS'

type toggleIsInBasketSagaACType = ReturnType<typeof toggleIsInBasketSagaAC>
type toggleIsLikedSagaACType = ReturnType<typeof toggleIsLikedSagaAC>
type searchProductsSagaACType = ReturnType<typeof searchProductsSagaAC>
type getProductSagaAcType = ReturnType<typeof getProductsProductSagaAc>
export const toggleIsInBasketSagaAC = (id: string, isInBasket: boolean) => ({
    type: TOGGLE_IS_IN_BASKET as typeof TOGGLE_IS_IN_BASKET,
    id,
    isInBasket
})
export const toggleIsLikedSagaAC = (id: string, isLiked: boolean) => ({
    type: TOGGLE_IS_LIKED as typeof TOGGLE_IS_IN_BASKET,
    id,
    isLiked
})

export const searchProductsSagaAC = (request: string | undefined, isLiked: boolean) => ({
    type: SEARCH_GOODS as typeof SEARCH_GOODS,
    request,
    isLiked

})
export const getProductsProductSagaAc = (id: string) => ({
    type: GET_PRODUCTS_PRODUCT as typeof GET_PRODUCTS_PRODUCT,
    id
})

function* getProductWorker(action: getProductSagaAcType) {
    yield put(productSliceActions.toggleProductLoading(true))
    try {
        const product: productType = yield call(productsApi.getProduct, action.id)
        yield put(productSliceActions.getProduct(product))
        yield put(productSliceActions.toggleProductLoading(false))

    } catch (error) {
        console.log('Ошибка в getProductProductsWorker', error)
        yield put(productSliceActions.toggleProductLoading(true))
    }

}
function* searchProductsWorker(action: searchProductsSagaACType) {
    yield put(productsSliceActions.toggleIsLoading(true))
    try {
        const products: productType[] = yield call(productsApi.searchProductsApi, action.request, action.isLiked)
        yield put(productsSliceActions.setProducts(products))
        yield put(productsSliceActions.toggleIsLoading(false))
    } catch (error) {
        yield put(productsSliceActions.setError(error))
    }





}

function* toggleIsLikedWorker({ type, id, isLiked }: toggleIsLikedSagaACType) {
    const product: productType = yield call(productsApi.changeIsLiked, id, isLiked)
    yield put(productsSliceActions.setIsAnythingChangeInProduct({ id: id, product: product }))
}


function* toggleIsInBasketWorker({ type, id, isInBasket }: toggleIsInBasketSagaACType) {
    yield put(productsSliceActions.toggleIsAnythingChangedLoading(true))

    const product: productType = yield call(productsApi.changeIsInBasket, id, isInBasket)
    yield put(productsSliceActions.setIsAnythingChangeInProduct({ id: id, product: product }))
    yield put(productsSliceActions.toggleIsAnythingChangedLoading(false))

}

function* getProductsWorker() {

    yield put(productsSliceActions.toggleIsLoading(true))

    const data: productType[] = yield call(productsApi.getProducts)
    yield put(productsSliceActions.setProducts(data))
    yield put(productsSliceActions.setTotalProductsCount(data.length))
    yield put(productsSliceActions.toggleIsLoading(false))
}



export function* getProductsWatcher() {
    yield takeLeading(GET_PRODUCTS, getProductsWorker)
    yield takeLeading(TOGGLE_IS_LIKED, toggleIsLikedWorker)
    yield takeLatest(SEARCH_GOODS, searchProductsWorker)
    //@ts-ignore
    const chanell = yield actionChannel(TOGGLE_IS_IN_BASKET)
    yield takeLeading(chanell, toggleIsInBasketWorker)
    yield takeLeading(GET_PRODUCTS_PRODUCT, getProductWorker)


}