import s from '../../../styles/common/ProductInfo/productInfoDescription.module.scss'
type Props = {
    title: string,
    description: string,
    price: number
}

const ProductInfoDescription = ({ title, description, price }: Props) => {
    return (
        <div className={s.productInfoDescription}>
            <div className={s.body}>
                <h3 className={s.title}>{title}</h3>
                <div className={s.description}><p>Описание:</p> {description}</div>
                <div className={s.priceBox}>
                    <span className={s.price}><p>Цена:</p>{price.toLocaleString('ru')} руб.</span>
                </div>

            </div>
        </div>
    )
}

export default ProductInfoDescription