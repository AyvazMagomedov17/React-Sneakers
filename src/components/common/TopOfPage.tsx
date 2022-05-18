import { NavLink } from 'react-router-dom'
import s from '../../styles/common/topOfPage.module.scss'
import goBackSvg from '../../assets/img/Shopping/goBack.svg'
type Props = {
    title: string,
    goBack?: boolean
}

const TopOfPage = ({ title, goBack }: Props) => {
    return (
        <div className={s.top}>
            {goBack && <NavLink to='/items'>
                <img className={s.goBackImg} src={goBackSvg} alt="go back image" />
            </NavLink>}
            <div className={s.title}>{title}</div>

        </div>
    )
}

export default TopOfPage