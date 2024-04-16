import { RootState, useThree } from "@react-three/fiber";
import { getThreeValue, setThreeValue, subscribe } from "./Globals";
import { useEffect, useState } from "react";

export function useThreeGlobal(): { three: RootState | undefined; ThreeGlobal: typeof ThreeGlobal } {
    const [three, setThree] = useState<RootState>(getThreeValue());

    useEffect(() => {
        const threeValue = getThreeValue();
        setThree(threeValue);
        console.log(threeValue);
        const unsubscribe = subscribe(() => {
            const threeValue = getThreeValue();
            setThree(threeValue);
        });
        return unsubscribe;
    }, []);

    return { three: three, ThreeGlobal };
}

const ThreeGlobal: React.FC = () => {
    const three = useThree();
    useEffect(() => {
        setThreeValue(three);
        console.log(three);
    }, []);

    return null;
};
