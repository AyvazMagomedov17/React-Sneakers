import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { basketSliceActions } from '../../redux/reducers/basketSlice'
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
    const [contentIsOpen, setContentIsOpen] = useState(true)
    const dispatch = useAppDispatch()
    const totalBasketItemsCount = useAppSelector(getTotalBasketItemsCountSelector)
    const basketItemsCheckout = useAppSelector(getBasketItemsIsCheckout)
    const isSetShopping = useAppSelector(getIsSetShoppingSelector)
    console.log(isSetShopping, 'isSetShopping')

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
            <AnimatePresence>
                {contentIsOpen && <motion.div initial={{ position: 'relative', right: -300, transitionTimingFunction: 'linear' }}
                    animate={{ position: "relative", right: 0, transitionDuration: '0.1s', transitionTimingFunction: 'linear' }}
                    exit={{ position: "relative", right: -700, transitionDuration: '0.3s', transitionTimingFunction: 'linear' }}
                >
                    <div onClick={(e) => e.stopPropagation()} className={s.content}>
                        <div className={s.top}>
                            <h3 className={s.title}>Корзина</h3>
                            <button onClick={removeBasket} className={s.exitButton}>✖</button>
                        </div>

                        <div className={s.body}>
                            {totalBasketItemsCount !== 0 ? <BasketWithProducts /> : basketItemsCheckout && isSetShopping ? <BasketWithoutProducts buttonCallback={removeBasket} descripton='Ваш заказ скоро будет передан курьерской доставке' title='Заказ оформлен!' img={chekoutJpg} /> : <BasketWithoutProducts img={withoutProductsJpg} buttonCallback={removeBasket} descripton='Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.' title="Корзина пустая" />}
                        </div>
                    </div>
                </motion.div>}
            </AnimatePresence>

        </div >
    )
}

export default Basket