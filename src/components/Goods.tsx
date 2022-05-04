import s from '../styles/goods.module.scss'
type Props = {}

const Goods = (props: Props) => {
    return (
        <div className={s.goods}>
            <div className={s.body}>
                <div className={s.column}>
                    <h2 className={s.title}>Все кроссовки</h2>
                </div>
            </div>
        </div>
    )
}

export default Goods