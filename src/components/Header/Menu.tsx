import { NavLink } from 'react-router-dom'
import s from '../../styles/Header/menu.module.scss'
import cn from 'classnames'
type Props = {
    totalPrice: number
    clickOnBasketButton: () => void
    basketSvg: string
    likeSvg: string
    avatarSvg: string
}

const Menu = ({ totalPrice, avatarSvg, basketSvg, clickOnBasketButton, likeSvg }: Props) => {
    return (
        <div className={s.right}>
            <div className={s.rightRow}>
                <button onClick={clickOnBasketButton} className={cn(s.basket, s.rightButton)}>
                    <div className={s.basketImg}>
                        <img src={basketSvg} alt="basket" />
                    </div>
                    <div className={s.totalPrice}>
                        {totalPrice.toLocaleString('ru')} руб.
                    </div>
                </button>
                <NavLink to='/bookmarks'>
                    <button className={cn(s.like, s.rightButton)}>
                        <img src={likeSvg} alt="like" />
                    </button>
                </NavLink>
                <NavLink to='/shopping'>
                    <button className={cn(s.avatar, s.rightButton)}>
                        <img src={avatarSvg} alt="avatar" />
                    </button>
                </NavLink>

            </div>

        </div>
    )
}

export default Menu