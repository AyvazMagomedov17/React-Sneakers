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
        <AnimatePresence>
            {isLoading && <motion.div exit={{ opacity: 0, position: 'relative', transitionDuration: '0.3s', bottom: -100 }}>
                <SCLoader>
                    <img src={loaderGif} alt="" />
                </SCLoader>
            </motion.div>}

        </AnimatePresence>

    )
}

export default Loader