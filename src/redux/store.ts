import { bookmarksSliceName, bookmarksSliceReducer } from './reducers/bookmarksSlice';
import { shoppingSliceName, shoppingSliceReducer } from './reducers/shoppingSlice';
import { basketSliceName, basketSliceReducer } from './reducers/basketSlice';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas';
import { productsSliceName, productsSliceReducer } from './reducers/productsSlice';
import { productSliceName, productSliceReducer } from './reducers/productSlice';


const rootReducer = combineReducers({
    [productsSliceName]: productsSliceReducer,
    [basketSliceName]: basketSliceReducer,
    [shoppingSliceName]: shoppingSliceReducer,
    [bookmarksSliceName]: bookmarksSliceReducer,
    [productSliceName]: productSliceReducer
})

const sagaMiddleware = createSagaMiddleware()
const setupStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(sagaMiddleware),
    });
    sagaMiddleware.run(rootSaga)
    return store;
};

export type RootStateType = ReturnType<typeof rootReducer>
export type AppStoreType = ReturnType<typeof setupStore>
export type AppDispatchType = AppStoreType['dispatch']

export default setupStore