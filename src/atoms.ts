import { atom, selector } from 'recoil';

export const timerState = atom<number>({
    key: 'timerState',
    default: 1500,
})
export const roundsState = atom({
    key: 'roundsState',
    default: 0,
});
export const goalsState = atom({
    key: 'goalsState',
    default: 0,
});
export const isStartState = atom({
    key: "isStartState",
    default: false,
})

export const timeSelector = selector({
    key: "timeSelector",
    get: ({ get }) => {
        const time = get(timerState);
        const minute = String(Math.floor(time / 60)).padStart(2, "0");
        const seconds = String(time % 60).padStart(2, "0");
        return {
            minute,
            seconds,
        };
    }
})
