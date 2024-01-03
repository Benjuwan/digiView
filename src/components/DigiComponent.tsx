import { memo, useState } from "react";
import { Greeting } from "./Greeting";
import { DigimonViewBtn } from "./DigimonViewBtn";
import { Digimons } from "./Digimons";

export const DigiComponent = memo(() => {
    const [randNum, setRandNum] = useState<number>(1);
    const [firstRenderCheck, setFirstRenderCheck] = useState<boolean>(true);

    return (
        <>
            <DigimonViewBtn
                setFirstRenderCheck={setFirstRenderCheck}
                setRandNum={setRandNum}
            />
            {firstRenderCheck ?
                <Greeting /> :
                <Digimons randNum={randNum} />
            }
        </>
    );
});