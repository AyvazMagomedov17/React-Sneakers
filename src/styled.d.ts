

import 'styled-components';
import { ITheme } from './styledComponents/StyledGlobal';


declare module 'styled-components' {
    export interface DefaultTheme extends ITheme { }
}