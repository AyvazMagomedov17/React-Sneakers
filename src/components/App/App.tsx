import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../../pages/Main";
import Header from "../Header/Header";
import s from '../../styles/app.module.scss'

const App = () => {

    return (
        <BrowserRouter>
            <div>
                <Header />
                <div className={s.container} >


                    <Routes>
                        <Route path="/" element={<Main />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;
