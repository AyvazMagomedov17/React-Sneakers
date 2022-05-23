import { NavLink } from 'react-router-dom'
import s from '../../styles/Header/burgerMenu.module.scss'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { addLockScroll, removeLockScroll } from '../../hooks/hooks'
type Props = {
    totalPrice: number
    clickOnBasketButton: () => void
    basketSvg: string
    likeSvg: string
    avatarSvg: string
    setBurgerMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    burgerMenuIsOpen: boolean
}

const BurgerMenu = ({ burgerMenuIsOpen, setBurgerMenuIsOpen, totalPrice, clickOnBasketButton, basketSvg, likeSvg, avatarSvg }: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const clickOnExitButton = () => {
        setIsOpen(false)
        setTimeout(() => {
            setBurgerMenuIsOpen(false)

        }, 400);
    }
    const clickOnBasket = () => {
        setIsOpen(false)
        setTimeout(() => {
            clickOnBasketButton()
            setBurgerMenuIsOpen(false)
        }, 600);


    }
    useEffect(() => {
        setTimeout(() => {
            setIsOpen(true)
        }, 1);
    }, [burgerMenuIsOpen])
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
                }} className={cn(s.rightRow, isOpen ? s.open : s.closed)}>
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