import { RootState } from "@react-three/fiber";

let three: RootState | undefined;
let subscribers: { id: number; callback: (value: typeof three) => void }[] = [];
let subscriberId = 0;

export const getThreeValue = () => three;

export const setThreeValue = (newThree: typeof three) => {
    three = newThree;
    notifySubscribers();
};

export const subscribe = (callback: (value: typeof three) => void) => {
    const id = subscriberId++;
    subscribers.push({ id, callback });
    return () => {
        unsubscribe(id);
    };
};

export const unsubscribe = (id: number) => {
    subscribers = subscribers.filter((subscriber) => subscriber.id !== id);
};

const notifySubscribers = () => {
    subscribers.forEach((subscriber) => {
        subscriber.callback(three);
    });
};