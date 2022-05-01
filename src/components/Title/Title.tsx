
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { LOAD_DATA } from '../../redux/reducers'



type StyledTextType = {
    color?: string,
    fz: string,
}
const StyledText = styled.p<StyledTextType> `
    color: ${({ color, theme }) => color || theme.colors.secondary};
    font-size: ${({ fz }) => fz}px;
`
const StyledButton = styled.button<StyledTextType>`
    background-color: ${({ color }) => color};
    width: ${({ fz }) => fz}px;
    height: ${({ fz }) => fz}px;
`
const Title = () => {
    const dispatch = useDispatch()

    return (
        <>
            <StyledText fz='15'>Привет</StyledText>
            <StyledText color='yellow' fz='15'>Привет</StyledText>
            <StyledButton onClick={() => {
                dispatch({ type: LOAD_DATA })
            }} fz='70' >Click</StyledButton>
        </>
    )
}

export default Title