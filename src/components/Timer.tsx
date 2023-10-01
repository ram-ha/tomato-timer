import { useRecoilState, useRecoilValue } from 'recoil';
import { goalsState, isStartState, roundsState, timeSelector, timerState } from '../atoms';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Timer = () => {
    const [time, setTime] = useRecoilState(timerState);
    const [isStart, setIsStart] = useRecoilState(isStartState);
    const [rounds, setRounds] = useRecoilState(roundsState);
    const [goals, setGoals] = useRecoilState(goalsState);
    const { minute, seconds } = useRecoilValue(timeSelector);

    const toggleStart = () => {
        setIsStart(!isStart);
    };
    const handleRoundEnd = () => {
        setRounds((prev) => prev + 1);
        setTime(1500);
        if (rounds > 4) {
            setRounds(0);
            setGoals((prev) => prev + 1);
        }
    };

    const timer = useRef(0);

    useEffect(() => {
        if (time > 0 && isStart) {
            timer.current = window.setInterval(() => {
                setTime((prev) => prev - 1);
            }, 1000);
        }
        if (time === 0) {
            clearInterval(timer.current);
            handleRoundEnd();
        }
        if (goals > 12) setGoals(0);
        return () => clearInterval(timer.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStart, time, goals]);

    return (
        <Container>
            <TimerWrap>
                <Card variants={card} initial="start" animate="end" transition={{ type: 'spring' }}>
                    {minute}
                </Card>
                <Colons>:</Colons>
                <Card variants={card} initial="start" animate="end" transition={{ type: 'spring' }}>
                    {seconds}
                </Card>
            </TimerWrap>
            <Button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleStart}>
                {isStart ? 'PAUSE' : 'PLAY'}
            </Button>
            <PointsWrap>
                <PointCard>
                    <Point>{rounds} / 4</Point>
                    <span>ROUND</span>
                </PointCard>
                <PointCard>
                    <Point>{goals} / 12</Point>
                    <span>GOAL</span>
                </PointCard>
            </PointsWrap>
        </Container>
    );
};

const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

// Timer
const card = {
    start: { scale: 0.8, opacity: 0.3 },
    end: { scale: 1.0, opacity: 1 },
};

const TimerWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 40px 0 20px;
`;

const Card = styled(motion.div)`
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: tomato;
    font-size: 90px;
    padding: 50px;
    border-radius: 50%;
    text-shadow: 1px 2px 1px rgba(0, 0, 0, 0.438);
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Colons = styled.div`
    font-size: 90px;
    color: whitesmoke;
`;

// button
const Button = styled(motion.div)`
    width: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: teal;
    border: 2px solid whitesmoke;
    border-radius: 20px;
    padding: 15px;
    font-size: 28px;
    cursor: pointer;
    margin: 10px 0 20px;
`;

// point
const PointsWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    color: rgba(214, 48, 49, 1);
    font-size: 30px;
`;

const PointCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Point = styled.div`
    color: whitesmoke;
    margin: 20px 0 10px;
`;

export default Timer;
