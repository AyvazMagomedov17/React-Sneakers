import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ItemsPage from "../../pages/ItemsPage";
import Header from "../Header/Header";
import s from '../../styles/App/app.module.scss'
import { useEffect, useState } from "react";
import Basket from "../Basket/Basket";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import ShoppingPage from "../../pages/ShoppingPage";
import BookmarksPage from "../../pages/BookmarksPage";
import { GET_BASKET_ITEMS } from "../../redux/sagas/basketSagas";
import { GET_BOOKMARKS_ITEMS } from "../../redux/sagas/bookmarksSagas";
import { GET_PRODUCTS } from "../../redux/sagas/productsSagas";

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
                    <Routes>
                        <Route path="/" element={<Navigate to='/items' />} />
                        <Route path="/items" element={<ItemsPage />} />
                        <Route path="/shopping" element={<ShoppingPage />} />
                        <Route path="/bookmarks" element={<BookmarksPage />} />
                    </Routes>
                </div>
                {isBasketOpen && <Basket setIsBasketOpen={setIsBasketOpen} isActive={isBasketOpen} />}
            </div>
        </BrowserRouter>
    )
}

export default App;
