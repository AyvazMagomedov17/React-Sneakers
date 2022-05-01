import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { StyledGlobal, theme } from './styledComponents/StyledGlobal';
import { ThemeProvider } from 'styled-components';




const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <StyledGlobal></StyledGlobal>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);


