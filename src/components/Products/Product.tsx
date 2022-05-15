import s from '../../styles/Products/product.module.scss'
import { productType } from '../../types/apiTypes'
import likeSvg from '../../assets/img/Good/like.svg'
import notLikeSvg from '../../assets/img/Good/notLike.svg'
import addSvg from '../../assets/img/Good/add.svg'
import addedSvg from '../../assets/img/Good/added.svg'
import cn from 'classnames'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { toggleIsInBasketSagaAC, toggleIsLikedSagaAC } from '../../redux/sagas/productsSagas'
import { addItemInBasketSagaAc, deleteItemFromBasketSagaAc } from '../../redux/sagas/basketSagas'
import { basketSliceActions } from '../../redux/reducers/basketSlice'
import { addItemInBookmarksSagaAc, deleteItemFromBookmarkSagaAc, toggleIsInBasketBookmarkSagaAc, toggleIsLikedBookmarkSagaAc } from '../../redux/sagas/bookmarksSagas'
import { getBookmarksItemsSelector } from '../../redux/Selectors/bookmarksSliceSelectors'
import { getProductsSelector } from '../../redux/Selectors/productsSliceSelectors'
export const GOOD_ARRAY_OF_GOODS = 'GOOD_ARRAY_OF_GOODS'
export const GOOD_ARRAY_OF_BOOKMARKS = 'GOOD_ARRAY_OF_BOOKMARKS'


interface PropsType extends productType {
    showLikeButton?: boolean,
    showAddInBasketButton?: boolean,
    isArrayOfBookmarks?: boolean,
    isArrayofShopping?: boolean
    isArrayOfProductrs?: boolean
    setProductsInfoIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    getProduct: (id: string) => void

}

const Product = ({ setProductsInfoIsOpen, getProduct, isArrayOfBookmarks, description, title, id, img, isInBasket, isLiked, price, idForBasket, showAddInBasketButton = true, showLikeButton = true }: PropsType) => {
    const productItem = {
        title,
        id,
        img,
        isInBasket: true,
        isLiked,
        idForBasket,
        price,
        description
    }
    const dispatch = useAppDispatch()
    const basketProducts = useAppSelector(state => state.basketSlice.basketProducts)
    const products = useAppSelector(getProductsSelector)
    const bookmarksItems = useAppSelector(getBookmarksItemsSelector)
    const totalPrice = useAppSelector(state => state.basketSlice.totalPrice)
    const clickOnLikeButton = (e: any) => {
        if (isLiked && !isArrayOfBookmarks) {
            dispatch(toggleIsLikedSagaAC(id, false))
            bookmarksItems.forEach(item => {
                if (item.idForBasket === idForBasket) {
                    dispatch(deleteItemFromBookmarkSagaAc(item.id))
                }
            })

        }
        if (isLiked && isArrayOfBookmarks) {
            dispatch(deleteItemFromBookmarkSagaAc(id))
            products.forEach(product => {
                if (product.idForBasket === idForBasket) {
                    dispatch(toggleIsLikedSagaAC(product.id, false))
                }
            })
        }
        if (!isLiked) {
            dispatch(toggleIsLikedSagaAC(id, true))
            dispatch(addItemInBookmarksSagaAc({ id, idForBasket, img, description, isInBasket: false, price, title, isLiked: true }))
        }
        e.stopPropagation()
    }
    const clikOnAddInBasketButton = (e: any) => {
        if (!isArrayOfBookmarks) {
            if (!isInBasket) {
                dispatch(addItemInBasketSagaAc(productItem))
                dispatch(toggleIsInBasketSagaAC(id, true))
                dispatch(basketSliceActions.setTotalPrice(totalPrice + price))
            } else {
                basketProducts?.forEach((item) => {

                    if (item.idForBasket === idForBasket) {

                        dispatch(deleteItemFromBasketSagaAc(item.id))
                        dispatch(toggleIsInBasketSagaAC(id, false))
                        dispatch(basketSliceActions.setTotalPrice(totalPrice - price))
                    }
                })
            }
        } else {
            if (!isInBasket) {

                dispatch(addItemInBasketSagaAc(productItem))
                dispatch(toggleIsInBasketBookmarkSagaAc(id, true))
                dispatch(basketSliceActions.setTotalPrice(totalPrice + price))
            } else {
                basketProducts?.forEach((item) => {
                    if (item.idForBasket === idForBasket) {

                        dispatch(deleteItemFromBasketSagaAc(item.id))
                        dispatch(toggleIsInBasketBookmarkSagaAc(id, false))
                        dispatch(basketSliceActions.setTotalPrice(totalPrice - price))
                    }
                })
            }
        }
        e.stopPropagation()
    }
    const clickGetProduct = () => {
        getProduct(id)
        setProductsInfoIsOpen(true)
    }
    return (
        <div onClick={clickGetProduct} className={s.contaiter}>
            <div className={s.product}>
                <div className={s.column}>
                    <div className={s.photoBox}>
                        <div className={s.likeImg}>
                            {showLikeButton && <button onClick={(e) => {
                                clickOnLikeButton(e)
                            }} className={cn(s.likeButton, isLiked ? s.redButton : s.notRedButton)}>
                                {isLiked ? <img alt='like' src={likeSvg} /> : <img alt='notLike' src={notLikeSvg} />
                                }
                            </button>}
                        </div>
                        <div className={s.sneakerImg}>
                            <img src={img} alt="sneaker" />
                        </div>
                    </div>
                    <div className={s.title}>{title}</div>
                    <div className={s.priceBox}>
                        <div className={s.price}>
                            <span className={s.priceDescription}>
                                Цена:
                            </span>
                            <span className={s.priceData}>
                                {price.toLocaleString('ru')} рублей
                            </span>
                        </div>
                        {showAddInBasketButton && <button className={cn(s.addButton, isInBasket ? s.greenButton : s.notGreenButton)} onClick={(e) => {
                            clikOnAddInBasketButton(e)
                        }}  >{isInBasket ? <img alt='added' src={addedSvg} /> : <img alt='add' src={addSvg} />}</button>}
                    </div>
                </div>

            </div >

        </div>

    )
}

export default Product