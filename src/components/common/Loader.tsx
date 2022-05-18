import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import loaderGif from '../../assets/img/Loader/loader.gif'

type PropsType = {
    isLoading?: boolean
}

const SCLoader = styled.div`
    width: 100%;
    height:  100vh;
    display: flex ;
    justify-content: center ;
    align-items: center ;
`
const Loader = ({ isLoading }: PropsType) => {
    return (

        <SCLoader>
            <img src={loaderGif} alt="" />
        </SCLoader>
    )
}

export default Loader