import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { deleteItemFromBookmarkSagaAc, getBookmarksProductSagaAC, GET_BOOKMARKS_ITEMS, toggleIsInBasketBookmarkSagaAc } from '../../redux/sagas/bookmarksSagas'
import { getBookmarksItemsSelector, getBookmarksItemsIsLoadingSelector, getTotalBookmarksItemsCountSelector } from '../../redux/Selectors/bookmarksSliceSelectors'
import s from '../../styles/MyBookmarks/myBookmarks.module.scss'
import WithoutProducts from '../Basket/WithoutProducts'
import withoutItemsJpg from '../../assets/img/Bookmarks/withoutItems.jpg'
import TopOfPage from '../common/TopOfPage'
import ListOfItems from '../common/ListOfItems'
import { getProductIsLoadingSelector, getProductSelector } from '../../redux/Selectors/productSelectors'
import ProductInfo from '../common/ProductInfo/ProductInfo'
import { addItemInBasketSagaAc, deleteItemFromBasketSagaAc } from '../../redux/sagas/basketSagas'
import { basketSliceActions } from '../../redux/reducers/basketSlice'
import { getTotalBasketPriceSelector } from '../../redux/Selectors/basketSliceSelectors'
import { getProductsSelector } from '../../redux/Selectors/productsSliceSelectors'
import { GET_PRODUCTS, toggleIsLikedSagaAC } from '../../redux/sagas/productsSagas'
type Props = {}

const Bookmarks = (props: Props) => {
    const dispatch = useAppDispatch()
    const products = useAppSelector(getProductsSelector)
    const bookmarksItemsIsLoading = useAppSelector(getBookmarksItemsIsLoadingSelector)
    const totalBookmarksItemsCount = useAppSelector(getTotalBookmarksItemsCountSelector)
    const bookmarksItems = useAppSelector(getBookmarksItemsSelector)

    const [productInfoIsOpen, setproductInfoIsOpen] = useState(false)
    const productIsLoading = useAppSelector(getProductIsLoadingSelector)
    const product = useAppSelector(getProductSelector)
    const totalPrice = useAppSelector(getTotalBasketPriceSelector)
    useEffect(() => {
        dispatch({ type: GET_BOOKMARKS_ITEMS })
        dispatch({ type: GET_PRODUCTS })
        setproductInfoIsOpen(false)
    }, [])
    const getProduct = (id: string) => {
        dispatch(getBookmarksProductSagaAC(id))
    }
    if (!totalBookmarksItemsCount) {
        return <WithoutProducts navigate navigateTo='/items' title='Закладок нет :(' img={withoutItemsJpg} descripton='Вы ничего не добавляли в закладки' />
    }
    const addInBasketProductInfo = () => {
        if (!product.isInBasket) {
            dispatch(addItemInBasketSagaAc(product))
            dispatch(toggleIsInBasketBookmarkSagaAc(product?.id, true))
            dispatch(basketSliceActions.setTotalPrice(totalPrice + product.price))
            setproductInfoIsOpen(false)
        }
        if (product.isInBasket) {
            dispatch(deleteItemFromBasketSagaAc(product?.id))
            dispatch(toggleIsInBasketBookmarkSagaAc(product?.id, false))
            dispatch(basketSliceActions.setTotalPrice(totalPrice - product.price))
            setproductInfoIsOpen(false)
        }
    }
    const likeProductInfo = () => {
        if (product.isLiked) {
            dispatch(deleteItemFromBookmarkSagaAc(product.id))
            products.forEach(item => {
                if (item.idForBasket === product.idForBasket) {
                    dispatch(toggleIsLikedSagaAC(item.id, false))
                    setproductInfoIsOpen(false)
                }
            })


        }
    }
    return (
        <div className={s.bookmarks}>
            <div className={s.body}>
                <TopOfPage goBack title='Мои закладки' />
                {<ListOfItems getProduct={getProduct} setProductsInfoIsOpen={setproductInfoIsOpen} isArrayOfBookmarks={true} arrayOfItems={bookmarksItems} isLoading={bookmarksItemsIsLoading} />}
                {!productIsLoading && productInfoIsOpen && <ProductInfo likeFunc={likeProductInfo} addInBasket={addInBasketProductInfo} setIsOpen={setproductInfoIsOpen} {...product} />}
            </div>
        </div>
    )
}

export default Bookmarks