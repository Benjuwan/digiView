import { FC, memo } from "react";
import styled from "styled-components";
import { digimonData } from "../ts/digimon";
import { useFecthDigimon } from "../hooks/useFecthDigimon";

type DigimonViewBtnType = {
    setFirstRenderCheck: React.Dispatch<React.SetStateAction<boolean>>;
    setRandNum: React.Dispatch<React.SetStateAction<number>>;
}

export const DigimonViewBtn: FC<DigimonViewBtnType> = memo(({ setFirstRenderCheck, setRandNum }) => {
    const { FetchDigimonData } = useFecthDigimon();
    const digimonView: () => void = () => {
        const allDigimonNumbers: Promise<digimonData> = FetchDigimonData();
        // console.log(allDigimonNumbers);

        /* Promise の中身（PromiseResult）を触る */
        allDigimonNumbers.then((data) => {
            const randNum: number = Math.floor(Math.random() * data.pageable.totalElements);
            if (randNum === 0) setRandNum((_prevRandNum) => 1);
            else setRandNum((_prevRandNum) => randNum);
            setFirstRenderCheck(false);
        });
    }

    return (
        <DigimonViewBtnElm type="button" onClick={digimonView}>あなたがナニモンかチェック</DigimonViewBtnElm>
    );
});

const DigimonViewBtnElm = styled.button`
cursor: pointer;
display: block;
width: clamp(16rem, calc(100vw/2), 32rem);
line-height: 4.4rem;
letter-spacing: 0.25em;
margin: 1em auto 5em;
appearance: none;
border-radius: 4px;
border: 1px solid transparent;
color: #fff;
background-color: #333;
transition: all .25s;

@media screen and (min-width: 700px) {
    width: clamp(320px, 100%, 480px);
    line-height: 44px;
}

&[disabled]{
    cursor: default;
    color: #333;
    background-color: #dadada;
}

&:not([disabled]):hover{
    background-color: #fff;
    border-color: #333;
    color: #333;
}
`;