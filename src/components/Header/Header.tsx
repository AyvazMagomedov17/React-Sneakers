import logoSvg from '../../assets/Header/logo.svg'
import basketSvg from '../../assets/Header/basket.svg'
import likeSvg from '../../assets/Header/like.svg'
import avatarSvg from '../../assets/Header/avatar.svg'
import s from '../../styles/Header/header.module.scss'
import { useAppSelector } from '../../hooks/redux'
import { NavLink } from 'react-router-dom'
import BurgerButton from './BurgerButton'
import { useState } from 'react'
import Menu from './Menu'
import BurgerMenu from './BurgerMenu'

type PropsType = {
    setIsBasketOpen: React.Dispatch<React.SetStateAction<boolean>>
}



const Header = ({ setIsBasketOpen }: PropsType) => {
    const totalPrice = useAppSelector(state => state.basketSlice.totalPrice)
    const [basketMenuIsOpen, setBasketMenuIsOpen] = useState(false)
    const clickOnBasketButton = () => {
        setIsBasketOpen(true)
    }
    return (
        <div className={s.header}>
            <div className={s.container}>
                <div className={s.body}>
                    <div className={s.row}>
                        <NavLink to='/'>
                            <div className={s.logoBox}>
                                <div className={s.logoImg}>
                                    <img src={logoSvg} alt="logotype" />
                                </div>
                                <div className={s.logoText}>
                                    <span className={s.name}>
                                        REACT SNEAKERS
                                    </span>
                                    <span className={s.description}>
                                        Магазин лучших кроссовок
                                    </span>
                                </div>
                            </div>
                        </NavLink>
                        {basketMenuIsOpen ? <BurgerMenu setBasketMenuIsOpen={setBasketMenuIsOpen} clickOnBasketButton={clickOnBasketButton} avatarSvg={avatarSvg} totalPrice={totalPrice} likeSvg={likeSvg} basketSvg={basketSvg} /> : <Menu avatarSvg={avatarSvg} basketSvg={basketSvg} clickOnBasketButton={clickOnBasketButton} likeSvg={likeSvg} totalPrice={totalPrice} />
                        }
                        <BurgerButton setBasketMenuIsOpen={setBasketMenuIsOpen} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header