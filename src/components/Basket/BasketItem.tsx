import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { basketSliceActions } from '../../redux/reducers/basketSlice'
import { shoppingSliceActions } from '../../redux/reducers/shoppingSlice'
import { deleteItemFromBasketSagaAc } from '../../redux/sagas/basketSagas'
import { toggleIsInBasketBookmarkSagaAc } from '../../redux/sagas/bookmarksSagas'
import { toggleIsInBasketSagaAC } from '../../redux/sagas/productsSagas'
import { getBookmarksItemsSelector } from '../../redux/Selectors/bookmarksSliceSelectors'
import s from '../../styles/Basket/basketItem.module.scss'
type Props = {
    title: string
    price: number,
    img: string,
    id: string,
    isInBasket: boolean
    totalPrice: number
    idForBasket: number
}

const BasketItem = ({ idForBasket, img, title, price, id, totalPrice }: Props) => {
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.productsSlice.products)
    const bookmarksItems = useAppSelector(getBookmarksItemsSelector)

    const clickOnDeleteButton = async () => {
        products?.forEach(item => {
            dispatch(deleteItemFromBasketSagaAc(id))
            if (item.idForBasket === idForBasket && item.isInBasket) {

                dispatch(toggleIsInBasketSagaAC(item.id, false))
                dispatch(basketSliceActions.setTotalPrice(totalPrice - price))
                dispatch(shoppingSliceActions.toggleIsSetShopping(false))
            }
        })
        bookmarksItems?.forEach(item => {
            dispatch(deleteItemFromBasketSagaAc(id))
            if (item.idForBasket === idForBasket && item.isInBasket) {

                dispatch(toggleIsInBasketBookmarkSagaAc(item.id, false))
                dispatch(basketSliceActions.setTotalPrice(totalPrice - price))
                dispatch(shoppingSliceActions.toggleIsSetShopping(false))
            }
        })
    }
    return (
        <div className={s.basketItem}>
            <div className={s.body}>
                <div className={s.imageBox}>
                    <div className={s.sneakerImg}>
                        <img src={img} alt='sneaker image' />
                    </div>
                </div>
                <div className={s.descriptionBox}>
                    <span className={s.title}>{title}</span>
                    <span className={s.price}>{price.toLocaleString('ru')} руб.</span>
                </div>
                <div className={s.delete}>
                    <button onClick={clickOnDeleteButton} className={s.deleteButton}>×</button>
                </div>

            </div>
        </div>
    )
}

export default BasketItem