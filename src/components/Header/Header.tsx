import logoSvg from '../../assets/Header/logo.svg'
import basketSvg from '../../assets/Header/basket.svg'
import likeSvg from '../../assets/Header/like.svg'
import { NavLink } from "react-router-dom"
import s from '../../styles/header.module.scss'
type PropsType = {

}



const Header = ({ }: PropsType) => {
    return (
        <div className={s.header}>
            <div className={s.container}>
                <div className={s.body}>
                    <div className={s.row}>
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
                        <div className={s.right}>
                            <div className={s.rightRow}>
                                <div className={s.basket}>
                                    <div className={s.basketImg}>
                                        <img src={basketSvg} alt="basket" />

                                    </div>
                                    <div className={s.totalPrice}>
                                        1205 руб.
                                    </div>
                                </div>
                                <div className={s.like}>
                                    <img src={likeSvg} alt="like" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header