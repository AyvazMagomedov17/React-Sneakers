import s from '../styles/commercial.module.scss'
import adidasSvg from '../assets/img/Main/adidas.svg'
import commercialJpg from '../assets/img/Main/commercial.jpg'
type Props = {}

const Commercial = (props: Props) => {
    return (
        <div className={s.commercial}>
            <div className={s.body}>
                <div className={s.row}>
                    <div className={s.left}>
                        <div className={s.adidasImg}>
                            <img src={adidasSvg} alt="adidas image" />
                        </div>
                        <p className={s.text}>
                            <span className={s.green}>Stan Smith</span>,
                            Forever!
                        </p>
                        <button className={s.buyButton}>
                            купить
                        </button>
                    </div>
                    <div className={s.right}>
                        <div className={s.mainImg}>
                            <img src={commercialJpg} alt="commercial" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Commercial