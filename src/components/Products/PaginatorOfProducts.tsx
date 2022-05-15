import s from '../../styles/Products/paginatorOfProducts.module.scss'


type PropsType = {
    setCurrentPage: (payloud: number) => void,
    totalDataLength: number | undefined
    currentProductsLength: number | undefined
    currentPage: number
}

const PaginatorOfProducts = ({ currentPage, setCurrentPage, currentProductsLength, totalDataLength }: PropsType) => {
    if ((totalDataLength != undefined && currentProductsLength != undefined) && (currentProductsLength < totalDataLength)) {
        return (
            <div className={s.paginator}>
                <button onClick={() => setCurrentPage(currentPage + 1)} className={s.button}>
                    Показать еще...
                </button>
            </div>
        )
    } else {
        return <div></div>
    }
}

export default PaginatorOfProducts