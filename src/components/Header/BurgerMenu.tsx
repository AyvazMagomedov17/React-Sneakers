import { NavLink } from 'react-router-dom'
import s from '../../styles/Header/burgerMenu.module.scss'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { addLockScroll, removeLockScroll } from '../../hooks/hooks'
import { AnimatePresence, motion } from 'framer-motion'
type Props = {

    totalPrice: number
    clickOnBasketButton: () => void
    basketSvg: string
    likeSvg: string
    avatarSvg: string
    setBurgerMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const BurgerMenu = ({ setBurgerMenuIsOpen, totalPrice, clickOnBasketButton, basketSvg, likeSvg, avatarSvg }: Props) => {
    const [isOpen, setIsOpen] = useState(true)
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
        }, 400);


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
                <AnimatePresence>
                    {isOpen && <motion.div initial={{ position: 'relative', width: '100vw', height: '100vh', left: -300, transitionTimingFunction: 'linear' }}
                        animate={{ overflow: 'hidden', position: "relative", width: '100vw', height: '100vh', left: 0, transitionDuration: '0.1s', transitionTimingFunction: 'linear' }}
                        exit={{ position: "relative", width: '100vw', height: '100vh', left: -500, transitionDuration: '0.3s', transitionTimingFunction: 'linear' }}>
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

                    </motion.div>}
                </AnimatePresence>

            </div>


        </div>
    )
}

export default BurgerMenu