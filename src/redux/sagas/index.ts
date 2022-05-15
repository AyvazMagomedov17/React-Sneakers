
import { all, call, spawn } from "redux-saga/effects";
import { getProductsWatcher } from "./productsSagas";
import { basketWatcher } from './basketSagas';
import { shoppingWatcher } from "./shoppingSagas";
import { bookmarksWatcher } from "./bookmarksSagas";

export default function* rootSaga() {
    const sagas = [getProductsWatcher, basketWatcher, shoppingWatcher, bookmarksWatcher]
    const retrySagas = sagas.map(saga => {
        return spawn(function* () {
            while (true) {
                try {
                    yield call(saga)
                    break
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
    yield all(retrySagas);
}