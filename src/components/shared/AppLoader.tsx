import { Spinner } from '@geist-ui/core';
import styled from 'styled-components';
import {FC} from "react";

interface AppLoaderProps {
    s?: boolean
}

const AppLoader: FC<AppLoaderProps> = ({s}) => <StyledArrLoader s={s} children={<Spinner />} />;

const StyledArrLoader = styled.div<{s: boolean | undefined}>`
    width: 100%;
    height: ${props => props.s ? '100%' : '100vh'};
    display: flex;
    align-items: center;
    justify-content: center;
`

export default AppLoader;
