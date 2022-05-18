import { memo, useEffect, useState } from 'react'
import s from '../../styles/Products/products.module.scss'
import { productType } from '../../types/apiTypes'
import PaginatorOfProducts from './PaginatorOfProducts'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { productsSliceActions } from '../../redux/reducers/productsSlice'
import { getFilterSelector, getIsProductsLoading } from '../../redux/Selectors/productsSliceSelectors'
import { getProductsProductSagaAc, GET_PRODUCTS_PRODUCT, searchProductsSagaAC, toggleIsInBasketSagaAC, toggleIsLikedSagaAC } from '../../redux/sagas/productsSagas'
import { useLocation, useNavigate } from 'react-router'
import TopOfPage from '../common/TopOfPage'
import ListOfItems from '../common/ListOfItems'
import ProductInfo from '../common/ProductInfo/ProductInfo'
import { getProductIsLoadingSelector, getProductSelector } from '../../redux/Selectors/productSelectors'
import { addItemInBasketSagaAc, deleteItemFromBasketSagaAc } from '../../redux/sagas/basketSagas'
import { basketSliceActions } from '../../redux/reducers/basketSlice'
import { getBasketProductsSelector, getTotalBasketPriceSelector } from '../../redux/Selectors/basketSliceSelectors'
import { getBookmarksItemsSelector } from '../../redux/Selectors/bookmarksSliceSelectors'
import { addItemInBookmarksSagaAc, deleteItemFromBookmarkSagaAc, GET_BOOKMARKS_ITEMS } from '../../redux/sagas/bookmarksSagas'
import Search from '../common/Search'
type Props = {}

const Products = memo((props: Props) => {
    const location = useLocation().search
    const parsLocation = new URLSearchParams(location)
    let history = useNavigate()
    const dispatch = useAppDispatch()
    const currentPage = useAppSelector(state => state.productsSlice.currentPage)
    const filter = useAppSelector(getFilterSelector)
    const setCurrentPage = (payloud: number) => {
        dispatch(productsSliceActions.setCurrentPage(payloud))
    }
    const [currentPageProducts, setCurrentPageProducts] = useState<Array<productType> | undefined>([])
    const products = useAppSelector(state => state.productsSlice.products)
    const productsIsLoading = useAppSelector(getIsProductsLoading)
    const [inputValue, setInputValue] = useState('')
    const filteredProducts = currentPageProducts?.filter(product => {
        return product.title.toLowerCase().includes(inputValue.toLowerCase())
    })
    const basketProducts = useAppSelector(getBasketProductsSelector)
    const bookmarksItems = useAppSelector(getBookmarksItemsSelector)
    useEffect(() => {
        setCurrentPageProducts(products?.slice(0, currentPage * 8))
    }, [products, currentPage])
    useEffect(() => {

        if (filter.isLiked && filter.title) {
            history(`/items?title=${filter.title}`)
            dispatch(searchProductsSagaAC(filter.title, true))
        }
        if (!filter.isLiked && filter.title) {
            history(`/items?title=${filter.title}`)
            dispatch(searchProductsSagaAC(filter.title, false))
        }
        if (filter.isLiked && !filter.title) {
            dispatch(searchProductsSagaAC(filter.title, true))
            history(`/items?isLiked=${true}`)
        }
        if (!filter.isLiked && !filter.title) {

            history(`/items`)
            dispatch(searchProductsSagaAC(filter.title, false))
        }



    }, [filter])
    const [productsInfoIsOpen, setProductsInfoIsOpen] = useState(false)
    useEffect(() => {

        const parsedTitle = parsLocation.get('title')
        const parsedIsLiked = parsLocation.get('isLiked')
        switch (parsedIsLiked) {
            case 'true':
                dispatch(productsSliceActions.setFilter({ title: filter.title, isLiked: true }))
                break
            default:
                dispatch(productsSliceActions.setFilter({ title: filter.title, isLiked: null }))
        }
        if (parsedTitle) {
            dispatch(productsSliceActions.setFilter({ title: parsedTitle, isLiked: null }))
        }
        setProductsInfoIsOpen(false)
    }, [])

    const getProduct = (id: string) => {
        dispatch(getProductsProductSagaAc(id))
    }
    const totalPrice = useAppSelector(getTotalBasketPriceSelector)
    const product = useAppSelector(getProductSelector)
    const productIsLoading = useAppSelector(getProductIsLoadingSelector)
    const addInBasketProductInfo = () => {
        if (!product.isInBasket) {
            dispatch(addItemInBasketSagaAc(product))
            dispatch(toggleIsInBasketSagaAC(product?.id, true))
            dispatch(basketSliceActions.setTotalPrice(totalPrice + product.price))
            setProductsInfoIsOpen(false)
        }
        if (product.isInBasket) {
            basketProducts.forEach(item => {
                if (product.idForBasket === item.idForBasket) {

                    dispatch(deleteItemFromBasketSagaAc(item.id))
                    dispatch(toggleIsInBasketSagaAC(product?.id, false))
                }
            })

            dispatch(basketSliceActions.setTotalPrice(totalPrice - product.price))
            setProductsInfoIsOpen(false)
        }
    }
    const likeProductInfo = () => {
        if (product.isLiked) {

            dispatch(toggleIsLikedSagaAC(product.id, false))
            bookmarksItems.forEach(item => {

                if (item.idForBasket === product.idForBasket) {

                    dispatch(deleteItemFromBookmarkSagaAc(item.id))
                    setProductsInfoIsOpen(false)
                }
            })
        } else {
            dispatch(toggleIsLikedSagaAC(product.id, true))
            dispatch(addItemInBookmarksSagaAc({ id: product.id, idForBasket: product.idForBasket, img: product.img, description: product.description, isInBasket: false, price: product.price, title: product.title, isLiked: true }))
            setProductsInfoIsOpen(false)
        }
    }

    return (
        <div className={s.products}>
            <div className={s.body}>
                <div className={s.column}>
                    <div className={s.top}>

                        <TopOfPage title='Все кроссовки' />
                        <Search />
                    </div>
                    <ListOfItems getProduct={getProduct} setProductsInfoIsOpen={setProductsInfoIsOpen} arrayOfItems={filteredProducts} isLoading={productsIsLoading} />
                    <PaginatorOfProducts currentPage={currentPage} currentProductsLength={currentPageProducts?.length} setCurrentPage={setCurrentPage} totalDataLength={products?.length} />


                </div>
            </div>
            {productsInfoIsOpen && !productIsLoading && <ProductInfo likeFunc={likeProductInfo} addInBasket={addInBasketProductInfo} setIsOpen={setProductsInfoIsOpen} {...product} />}
        </div>


    )
})

export default Products