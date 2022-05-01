import { LOAD_DATA, SET_POSTS } from './../reducers/index';
import axios from 'axios';
import { call, fork, put, take, takeEvery, takeLatest, takeLeading, join, select } from 'redux-saga/effects';
import { SET_PEOPLE } from '../reducers';

const instanse = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    withCredentials: true
})
const getData = async (pattern: string) => {
    const response = await instanse.get(pattern)
    return response.data
}
export function* loadPeope() {
    const peoples: Promise<any> = yield call(getData, 'users')
    yield put({ type: SET_PEOPLE, payloud: peoples })
    return peoples
}
export function* loadPosts() {
    const posts: Promise<any> = yield call(getData, 'posts')
    yield put({ type: SET_POSTS, payloud: posts })
}
//SAGA-WORKER
export function* workerSaga() {
    //@ts-ignore
    const people: Promise<any> | any = yield fork(loadPeope)
    yield join(people)
    yield fork(loadPosts)
    //@ts-ignore
    const store = yield select(s => s)
    console.log(store)
}
//SAGA-WATCHER
export function* watchLoadDataSaga() {
    yield takeEvery(LOAD_DATA, workerSaga)
}
export default function* rootSaga() {
    yield fork(watchLoadDataSaga)
}