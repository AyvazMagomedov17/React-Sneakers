import styled, { css } from 'styled-components'
import s from '../../styles/Basket/basketButton.module.scss'
type Props = {}

interface IbasketButton {
    width: number
    paddingLeft?: number
    paddingRight?: number
}
const BasketButton = styled.button<IbasketButton>`
    width: ${({ width }) => width}px ;
    height: 55px ;
    border-radius: 18px;
    background: #9DD558;
    color: #FFFF;
    font-size: 16px;
    padding-left: ${props => props.paddingLeft}px ;
    padding-right:${props => props.paddingRight}px ;
    transition: all 0.3s ;
    @media (max-width:367px){
        margin-left: -10px ;
    }
    @media(max-width: 347px){
        width:310px ;
    }
    @media(max-width: 330px){
        max-width:290px ;
    }
    &:hover{
        background-color: #28a30ad5;
        transition: all 0.3s ;
    }
`


export default BasketButton