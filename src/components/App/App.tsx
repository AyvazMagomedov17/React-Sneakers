
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { StyledAppWrapper } from '../../styledComponents/App/StyledAppWrapper';
import Title from '../Title/Title';



const App = () => {
    return (
        <Provider store={store}>
            <StyledAppWrapper>
                <Title />
            </StyledAppWrapper >
        </Provider>
    )
}

export default App;
