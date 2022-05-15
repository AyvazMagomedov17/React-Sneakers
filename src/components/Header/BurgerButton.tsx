import s from '../../styles/Header/burgerButton.module.scss'
type Props = {
    setBasketMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const BurgerButton = ({ setBasketMenuIsOpen }: Props) => {
    const toggleBasketMenuIsOpen = () => {
        setBasketMenuIsOpen(prev => !prev)
    }
    return (
        <div onClick={toggleBasketMenuIsOpen} className={s.burger}>
            <span></span>
        </div>
    )
}

export default BurgerButton