import { BaseTheme, Itheme } from './styles/GlobalStyle';


import 'styled-components';


declare module 'styled-components' {
    export interface DefaultTheme extends Itheme { }
}