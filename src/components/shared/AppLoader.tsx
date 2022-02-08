import { Spinner } from '@geist-ui/core';
import styled from 'styled-components';

const AppLoader = () => <StyledArrLoader children={<Spinner />} />;

const StyledArrLoader = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default AppLoader;
