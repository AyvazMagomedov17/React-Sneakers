import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import reducer from "./reducers";
import rootSaga from "./sagas/sagas";

const rootReducer = combineReducers({
    reducer: reducer
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer,
    //@ts-expect-error
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(rootSaga)

export default store