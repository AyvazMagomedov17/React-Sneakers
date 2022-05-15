import { Dispatch, useEffect } from 'react'
import { useAppSelector } from '../../../hooks/redux'
import { getProductIsLoadingSelector } from '../../../redux/Selectors/productSelectors'
import s from '../../../styles/common/ProductInfo/productInfo.module.scss'
import { productType } from '../../../types/apiTypes'
import cn from 'classnames'
import ProductInfoDescription from './ProductInfoDescription'
import { addLockScroll, lockScrol, removeLockScroll } from '../../../hooks/hooks'
interface PropsType extends productType {
    setIsOpen: Dispatch<React.SetStateAction<boolean>>
    addInBasket?: () => void,
    isShoppingProduct?: boolean,
    likeFunc?: () => void

}

const ProductInfo = ({ likeFunc, addInBasket, setIsOpen, img, description, id, idForBasket, isInBasket, isLiked, price, title, isShoppingProduct = false }: PropsType) => {

    const clickOnCloseButton = () => {
        setIsOpen(false)
    }
    const setIsClose = () => {
        setIsOpen(false)
    }
    useEffect(() => {
        lockScrol()
        addLockScroll()
        return function () {
            removeLockScroll()
        }
    }, [])


    return (
        <div onClick={setIsClose} className={s.productInfo}>
            <div onClick={(e) => {
                e.stopPropagation()
            }} className={s.content}>
                <div className={s.body}>
                    <div className={s.top}>
                        <button onClick={clickOnCloseButton} className={s.closeButton}>✖</button>
                    </div>
                    <div className={s.row}>
                        <div className={s.left}>
                            <div className={s.image}>
                                <img src={img} alt="product image" />
                            </div>
                            {!isShoppingProduct &&
                                <div className={s.buttonsBox}>
                                    {isInBasket ? <button onClick={addInBasket} className={cn(s.deleteFromBasketButton, s.redButton)}>Удалить из корзины</button> : <button onClick={addInBasket} className={cn(s.addInBasketButton, s.greenButton)}>Добавить в корзину</button>
                                    }
                                    {isLiked ? <button onClick={likeFunc} className={cn(s.dislileButton, s.redButton)}>Удалить из избранного</button> : <button onClick={likeFunc} className={cn(s.likeButton, s.greenButton)}>Добавить в избранное</button>
                                    }
                                </div>}
                        </div>
                        <ProductInfoDescription price={price} title={title} description={description} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo