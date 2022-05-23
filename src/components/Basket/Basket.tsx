import { useEffect, useState } from 'react'
import cn from 'classnames'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getBasketItemsIsCheckout, getTotalBasketItemsCountSelector } from '../../redux/Selectors/basketSliceSelectors'
import s from '../../styles/Basket/basket.module.scss'
import BasketWithProducts from './BasketWithProducts'
import BasketWithoutProducts from './WithoutProducts'
import withoutProductsJpg from '../../assets/img/Basket/withoutProducts.jpg'
import chekoutJpg from '../../assets/img/Basket/checkout.jpg'
import { getIsSetShoppingSelector } from '../../redux/Selectors/shoppingSliceSelectors'
import { shoppingSliceActions } from '../../redux/reducers/shoppingSlice'
import { GET_BASKET_ITEMS } from '../../redux/sagas/basketSagas'
import { addLockScroll, lockScrol, removeLockScroll } from '../../hooks/hooks'
type PropsType = {
    isActive: boolean
    setIsBasketOpen: React.Dispatch<React.SetStateAction<boolean>>

}

const Basket = ({ isActive, setIsBasketOpen, }: PropsType) => {
    const removeBasket = () => {
        setTimeout(() => {
            setIsBasketOpen(false)
        }, 300);
        setContentIsOpen(false)
    }
    useEffect(() => {
        setTimeout(() => {
            setContentIsOpen(true)
        }, 0.1)
    }, [isActive])
    const [contentIsOpen, setContentIsOpen] = useState(false)
    const dispatch = useAppDispatch()
    const totalBasketItemsCount = useAppSelector(getTotalBasketItemsCountSelector)
    const basketItemsCheckout = useAppSelector(getBasketItemsIsCheckout)
    const isSetShopping = useAppSelector(getIsSetShoppingSelector)

    useEffect(() => {
        dispatch({ type: GET_BASKET_ITEMS })
        lockScrol()
        addLockScroll()
        return function () {
            dispatch(shoppingSliceActions.toggleIsSetShopping(false))
            removeLockScroll()
        }
    }, [])


    return (
        <div onClick={removeBasket} className={s.basket}>

            <div onClick={(e) => e.stopPropagation()} className={cn(s.content, contentIsOpen ? s.contentIsOpen : s.contentIsClosed)}>
                <div className={s.top}>
                    <h3 className={s.title}>Корзина</h3>
                    <button onClick={removeBasket} className={s.exitButton}>✖</button>
                </div>

                <div className={s.body}>
                    {totalBasketItemsCount !== 0 ? <BasketWithProducts /> : basketItemsCheckout && isSetShopping ? <BasketWithoutProducts buttonCallback={removeBasket} descripton='Ваш заказ скоро будет передан курьерской доставке' title='Заказ оформлен!' img={chekoutJpg} /> : <BasketWithoutProducts img={withoutProductsJpg} buttonCallback={removeBasket} descripton='Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.' title="Корзина пустая" />}
                </div>
            </div>


        </div >
    )
}

export default Basket