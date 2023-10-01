import React from 'react';
import { styled } from 'styled-components';
import TomatoSVG from './styles/TomatoSVG';
import Timer from './components/Timer';

function App() {
    return (
        <Container>
            <Title>
                <TomatoSVG />
                <H1>pomodoro</H1>
            </Title>
            <Timer />
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const H1 = styled.h1`
    font-size: 3rem;
    color: white;
    padding-bottom: 10px;
`;

export default App;
