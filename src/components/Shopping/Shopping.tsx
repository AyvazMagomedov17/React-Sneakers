import s from '../../styles/Shopping/shopping.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getShoppingItemsIsLoadingSelector, getShoppingItemsSelector, getTotalShoppingCountSelector } from '../../redux/Selectors/shoppingSliceSelectors'
import { useEffect, useState } from 'react'
import { shoppingSliceActions } from '../../redux/reducers/shoppingSlice'
import WithoutProducts from '../Basket/WithoutProducts'
import withoutJpg from '../../assets/img/Shopping/without.jpg'
import TopOfPage from '../common/TopOfPage'
import ListOfItems from '../common/ListOfItems'
import { getShoppingProductSagaAc, GET_SHOPPINGS } from '../../redux/sagas/shoppingSagas'
import { getProductIsLoadingSelector, getProductSelector } from '../../redux/Selectors/productSelectors'
import ProductInfo from '../common/ProductInfo/ProductInfo'
import { addItemInBasketSagaAc, deleteItemFromBasketSagaAc } from '../../redux/sagas/basketSagas'
import { basketSliceActions } from '../../redux/reducers/basketSlice'
import { getTotalBasketPriceSelector } from '../../redux/Selectors/basketSliceSelectors'
type Props = {}

const Shopping = (props: Props) => {
    const shoppingItemsIsLoading = useAppSelector(getShoppingItemsIsLoadingSelector)
    const totalShoppingCount = useAppSelector(getTotalShoppingCountSelector)
    const [productInfoIsOpen, setproductInfoIsOpen] = useState(false)
    const dispatch = useAppDispatch()
    const shoppingItems = useAppSelector(getShoppingItemsSelector)
    const productsIsLoading = useAppSelector(getProductIsLoadingSelector)
    const product = useAppSelector(getProductSelector)
    const totalPrice = useAppSelector(getTotalBasketPriceSelector)
    useEffect(() => {
        setproductInfoIsOpen(false)
        dispatch({ type: GET_SHOPPINGS })
    }, [])
    if (!totalShoppingCount) {
        return (
            <WithoutProducts navigate={true} navigateTo='/items'
                img={withoutJpg} title='У вас нет заказов' descripton='Вы нищеброд?  Оформите хотя бы один заказ.' />
        )
    }
    const getProduct = (id: string) => {
        dispatch(getShoppingProductSagaAc(id))
    }

    return (
        <div className={s.shopping}>
            <div className={s.body}>
                <TopOfPage goBack title='Мои покупки' />
                {<ListOfItems getProduct={getProduct} setProductsInfoIsOpen={setproductInfoIsOpen} showLikeAndBasketbutton={false} arrayOfItems={shoppingItems} isLoading={shoppingItemsIsLoading} />}
            </div>
            {!productsIsLoading && productInfoIsOpen && <ProductInfo isShoppingProduct={true} setIsOpen={setproductInfoIsOpen} {...product} />}
        </div>
    )
}

export default Shopping