import s from '../../styles/Header/burgerButton.module.scss'
type Props = {
    setBurgerMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const BurgerButton = ({ setBurgerMenuIsOpen }: Props) => {
    const toggleBasketMenuIsOpen = () => {
        setBurgerMenuIsOpen(prev => !prev)
    }
    return (
        <div onClick={toggleBasketMenuIsOpen} className={s.burger}>
            <span></span>
        </div>
    )
}

export default BurgerButton