import { FC, memo } from "react";
import { digimonData } from "../ts/digimon";
import { useFecthDigimon } from "../hooks/useFecthDigimon";

type DigimonViewBtnType = {
    setFirstRenderCheck: React.Dispatch<React.SetStateAction<boolean>>;
    setRandNum: React.Dispatch<React.SetStateAction<number>>;
}

export const DigimonViewBtn: FC<DigimonViewBtnType> = memo(({ setFirstRenderCheck, setRandNum }) => {
    const { FetchDigimonData } = useFecthDigimon();
    const digimonView: () => void = () => {
        const allDigimonNumbers: Promise<digimonData | undefined> = FetchDigimonData();
        // console.log(allDigimonNumbers);

        if (typeof allDigimonNumbers === 'undefined') {
            return;
        }

        /* Promise の中身（PromiseResult）を触る */
        allDigimonNumbers.then((data) => {
            if (typeof data === 'undefined') {
                return;
            }

            const randNum: number = Math.floor(Math.random() * data.pageable.totalElements);
            if (randNum === 0) setRandNum(1);
            else setRandNum(randNum);
            setFirstRenderCheck(false);
        });
    }

    return (
        <button type="button" className="cursor-pointer block w-[clamp(10rem,calc(100vw/2),20rem)] leading-[2.75rem] p-[1em] tracking-[0.25em] my-[2.5em] mx-auto rounded border border-transparent text-white bg-[#333] transition duration-[.25s] md:w-[clamp(320px,100%,480px)] md:p-0 disabled:cursor-default disabled:bg-[#dadada] disabled:text-[#333] not-disabled:hover:bg-white not-disabled:hover:border-[#333] not-disabled:hover:text-[#333]" onClick={digimonView}>あなたがナニモンかチェック</button>
    );
});