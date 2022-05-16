import { NavLink } from 'react-router-dom'
import s from '../../styles/Header/burgerMenu.module.scss'
import cn from 'classnames'
import { useEffect } from 'react'
import { addLockScroll, removeLockScroll } from '../../hooks/hooks'
type Props = {
    totalPrice: number
    clickOnBasketButton: () => void
    basketSvg: string
    likeSvg: string
    avatarSvg: string
    setBasketMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const BurgerMenu = ({ setBasketMenuIsOpen, totalPrice, clickOnBasketButton, basketSvg, likeSvg, avatarSvg }: Props) => {
    const clickOnExitButton = () => {
        setBasketMenuIsOpen(false)
    }
    const clickOnBasket = () => {
        clickOnBasketButton()
        setBasketMenuIsOpen(false)

    }
    useEffect(() => {
        addLockScroll()
        return function () {
            removeLockScroll()
        }
    }, [])
    return (

        <div onClick={clickOnExitButton} className={s.right}>
            <div onClick={clickOnExitButton} className={s.content}>
                <div onClick={e => {
                    e.stopPropagation()
                }} className={s.rightRow}>
                    <button onClick={clickOnExitButton} className={s.extiButton}>✖</button>

                    <div onClick={clickOnBasket} className={s.rowButton}>
                        <span className={s.buttonText}>Корзина</span>
                        <button className={cn(s.basket, s.rightButton)}>
                            <div className={s.basketImg}>
                                <img src={basketSvg} alt="basket" />
                            </div>

                        </button>
                    </div>

                    <NavLink to='/bookmarks'>
                        <div onClick={clickOnExitButton} className={s.rowButton}>
                            <div className={s.buttonText}>Избранное</div>
                            <button className={cn(s.like, s.rightButton)}>
                                <img src={likeSvg} alt="like" />
                            </button>
                        </div>
                    </NavLink>
                    <NavLink to='/shopping'>
                        <div onClick={clickOnExitButton} className={s.rowButton}>
                            <div className={s.buttonText}>Покупки</div>
                            <button className={cn(s.avatar, s.rightButton)}>
                                <img src={avatarSvg} alt="avatar" />
                            </button>
                        </div>
                    </NavLink>

                </div>
            </div>


        </div>
    )
}

export default BurgerMenu