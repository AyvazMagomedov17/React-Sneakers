import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ItemsPage from "../../pages/ItemsPage";
import Header from "../Header/Header";
import s from '../../styles/App/app.module.scss'
import React, { Suspense, useEffect, useState } from "react";
import Basket from "../Basket/Basket";
import { useAppDispatch, } from "../../hooks/redux";
import { GET_BASKET_ITEMS } from "../../redux/sagas/basketSagas";
import { GET_BOOKMARKS_ITEMS } from "../../redux/sagas/bookmarksSagas";
import Loader from "../common/Loader";

const BookmarksPage = React.lazy(() => import('../../pages/BookmarksPage'));
const ShoppingPage = React.lazy(() => import('../../pages/ShoppingPage'));

const App = () => {
    const dispatch = useAppDispatch()
    const [isBasketOpen, setIsBasketOpen] = useState(false)
    useEffect(() => {
        dispatch({ type: GET_BASKET_ITEMS })
        dispatch({ type: GET_BOOKMARKS_ITEMS })

    }, [])

    return (
        <BrowserRouter>
            <div className={s.app}>
                <Header setIsBasketOpen={setIsBasketOpen} />
                <div className={s.container} >
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            <Route path="/" element={<Navigate to='/items' />} />
                            <Route path="/items" element={<ItemsPage />} />
                            <Route path="/shopping" element={<ShoppingPage />} />
                            <Route path="/bookmarks" element={<BookmarksPage />} />
                        </Routes>
                    </Suspense>
                </div>
                {isBasketOpen && <Basket setIsBasketOpen={setIsBasketOpen} isActive={isBasketOpen} />}
            </div>
        </BrowserRouter>
    )
}

export default App;
