import s from '../../styles/common/listOfItems.module.scss'
import { productType } from '../../types/apiTypes'
import Good from '../Products/Product'
import ProductsLoader from '../Products/ProductsLoader'
import Loader from './Loader'
type Props = {
    arrayOfItems: productType[] | undefined,
    isLoading: boolean,
    showLikeAndBasketbutton?: boolean
    isArrayOfBookmarks?: boolean,
    setProductsInfoIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    getProduct: (id: string) => void

}

const ListOfItems = ({ getProduct, setProductsInfoIsOpen, isArrayOfBookmarks = false, arrayOfItems, isLoading, showLikeAndBasketbutton = true }: Props) => {
    const arrayOfNumbersProductsLoader = [1, 2, 3, 4, 5, 6, 7, 8]
    let arrayOfProductsLoader = arrayOfNumbersProductsLoader.map((i) => {
        return <ProductsLoader />
    })
    if (arrayOfItems?.length == 0 && !isLoading) {
        debugger
        return (
            <div className={s.notFind}>Ничего не найдено(</div>
        )
    }
    return (
        <div className={s.items}>
            {isLoading ? arrayOfProductsLoader : arrayOfItems?.map(item => <Good getProduct={getProduct} setProductsInfoIsOpen={setProductsInfoIsOpen} isArrayOfBookmarks={isArrayOfBookmarks} showAddInBasketButton={showLikeAndBasketbutton} showLikeButton={showLikeAndBasketbutton} {...item} />)}
        </div>
    )
}

export default ListOfItems