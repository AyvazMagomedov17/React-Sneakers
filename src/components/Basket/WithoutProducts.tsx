import s from '../../styles/Basket/withoutProducts.module.scss'
import BasketButton from './BasketButton'
import { NavLink } from 'react-router-dom'

type PropsType = {
    descripton: string
    buttonCallback?: any,
    img: string,
    title: string,
    navigate?: string | boolean,
    navigateTo?: string
}

const WithoutProducts = ({ navigateTo = '/', navigate, buttonCallback, img, title, descripton }: PropsType) => {
    return (
        <div className={s.basketWithoutProducts}>
            <div className={s.body}>
                <div className={s.withoutProductsImg}>
                    <img src={img} alt="no products" />
                </div>
                <div className={s.text}>
                    <p className={s.title}>
                        {title}
                    </p>
                    <p className={s.description}>
                        {descripton}
                    </p>
                </div>
                {navigate ? <NavLink to={navigateTo}>
                    <BasketButton onClick={() => {
                        buttonCallback()
                    }} width={245}>
                        <span className={s.arrow}>←</span> Вернуться назад
                    </BasketButton>
                </NavLink> : <BasketButton onClick={() => {
                    buttonCallback()
                }} width={245}>
                    <span className={s.arrow}>←</span> Вернуться назад
                </BasketButton>}

            </div>

        </div>
    )
}

export default WithoutProducts