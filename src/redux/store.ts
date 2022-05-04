import createSagaMiddleware from 'redux-saga'
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({

})
const sagaMiddleware = createSagaMiddleware()


const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(sagaMiddleware),
    })
}

export type RootStateType = ReturnType<typeof rootReducer>
export type AppStoreType = ReturnType<typeof setupStore>
export type AppDispatchType = AppStoreType['dispatch']

/* export const store = createStore(rootReducer,
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(sagaMiddleware))) */