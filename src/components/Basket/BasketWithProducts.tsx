import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { basketSliceActions } from '../../redux/reducers/basketSlice'
import { deleteItemFromBasketSagaAc } from '../../redux/sagas/basketSagas'
import { toggleIsInBasketSagaAC } from '../../redux/sagas/productsSagas'
import { getBasketProductsSelector, getRecessionIsLoading, getTotalBasketPriceSelector } from '../../redux/Selectors/basketSliceSelectors'
import { getProductsSelector } from '../../redux/Selectors/productsSliceSelectors'
import s from '../../styles/Basket/basketWithProducts.module.scss'
import BasketButton from './BasketButton'
import BasketItem from './BasketItem'
import Loader from '../common/Loader'
import { useEffect } from 'react'
import { addShoppingItemInShoppingWorkerAC } from '../../redux/sagas/shoppingSagas'
import { getBookmarksItemsSelector } from '../../redux/Selectors/bookmarksSliceSelectors'
import { toggleIsInBasketBookmarkSagaAc } from '../../redux/sagas/bookmarksSagas'
type Props = {}

const BasketWithProducts = (props: Props) => {
    const delay = () => new Promise((resolve) => setTimeout(resolve, 300))
    const dispatch = useAppDispatch()
    const basketItems = useAppSelector(getBasketProductsSelector)
    const products = useAppSelector(getProductsSelector)
    const bookmarksItems = useAppSelector(getBookmarksItemsSelector)
    let totalPrice = useAppSelector(getTotalBasketPriceSelector)
    const recessionIsLoading = useAppSelector(getRecessionIsLoading)
    useEffect(() => {
        return function () {
            dispatch(basketSliceActions.toggleRecessionIsLoading(false))
            dispatch(basketSliceActions.toggleBasketItemsIsCheckout(true))
        }
    }, [])
    const checkout = async () => {
        for (let i = 0; i < basketItems.length; i++) {
            const element = basketItems[i];
            dispatch(addShoppingItemInShoppingWorkerAC({
                description: element.description, id: element.id,
                idForBasket: element.idForBasket, img: element.img, isInBasket: false, isLiked: false, price: element.price, title: element.title
            }))
            dispatch(deleteItemFromBasketSagaAc(element.id))
            dispatch(basketSliceActions.setTotalPrice(0))
            await delay()
        }
        for (let i = 0; i < products.length; i++) {
            const element = products[i];
            if (element.isInBasket) {
                dispatch(toggleIsInBasketSagaAC(element.id, false))
                await delay()
            }
        }
        for (let i = 0; i < bookmarksItems.length; i++) {
            const element = bookmarksItems[i]
            if (element.isInBasket) {
                dispatch(toggleIsInBasketBookmarkSagaAc(element.id, false))
                await delay()
            }
        }

    }
    if (recessionIsLoading) {
        return <Loader isLoading={recessionIsLoading} />
    }
    const clickOncheckoutButton = () => {
        checkout()
        dispatch(basketSliceActions.toggleRecessionIsLoading(true))

    }
    return (
        <div className={s.basketWithProducts}>

            {basketItems?.map((item) => {
                return <BasketItem totalPrice={totalPrice} idForBasket={item.idForBasket} key={item.idForBasket} title={item.title} price={item.price} isInBasket={item.isInBasket} img={item.img} id={item.id} />
            })}
            <div className={s.totalPrice}>
                <span className={s.priceDescription}>Итого:</span>
                <div className={s.price}>{totalPrice.toLocaleString('ru')} руб.</div>
            </div>
            <button className={s.button}>
                <BasketButton onClick={clickOncheckoutButton} width={325}>
                    Оформить заказ <span className={s.arrow}>→</span>
                </BasketButton>
            </button>
        </div>
    )
}

export default BasketWithProducts