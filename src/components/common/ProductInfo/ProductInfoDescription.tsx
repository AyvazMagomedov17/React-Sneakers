import { useRef, useState } from 'react'
import s from '../../../styles/common/ProductInfo/productInfoDescription.module.scss'
type Props = {
    title: string,
    description: string,
    price: number
}

const ProductInfoDescription = ({ title, description, price }: Props) => {
    const [showInFullDescription, setShowInFullDescription] = useState(false)
    const windowWidth = window.innerWidth
    const descriptionSize2 = 200
    const descriptionSize3 = 350



    if (description.length > descriptionSize3 && windowWidth <= 558 && !showInFullDescription) {
        description = description.slice(0, descriptionSize3) + '...'
    }
    if (description.length > descriptionSize2 && windowWidth <= 455 && !showInFullDescription) {
        description = description.slice(0, descriptionSize2) + '...'
    }

    return (
        <div className={s.productInfoDescription}>
            <div className={s.body}>
                <div className={s.titleAndDescription}></div>
                <h3 className={s.title}>{title}</h3>
                <div className={s.description}><p>Описание:</p> {description} {!showInFullDescription && <button onClick={() => {
                    setShowInFullDescription(true)
                }}>Показать полностью</button>}</div>
                <div className={s.priceBox}>
                    <span className={s.price}><p>Цена:</p>{price.toLocaleString('ru')} руб.</span>
                </div>

            </div>
        </div>
    )
}

export default ProductInfoDescription