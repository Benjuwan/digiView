import { FC, ChangeEvent, memo, useCallback } from "react";
import styled from "styled-components";
import { digimons, evolutions } from "../ts/digimon";
import { useFecthDigimon } from "../hooks/useFecthDigimon";
import { useSetDigimonItems } from "../hooks/useSetDigimonItems";

type SearchFormProps = {
    isDigiNameValue: string;
    setDigiNameValue: React.Dispatch<React.SetStateAction<string>>;
    setDigimonData: React.Dispatch<React.SetStateAction<digimons | undefined>>;
    setDescriptions: React.Dispatch<React.SetStateAction<string>>;
    setNextEvolutions: React.Dispatch<React.SetStateAction<evolutions[]>>;
    setPriorEvolutions: React.Dispatch<React.SetStateAction<evolutions[]>>;
    setType: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SearchForm: FC<SearchFormProps> = memo((props) => {
    const { isDigiNameValue, setDigiNameValue, setDigimonData, setDescriptions, setNextEvolutions, setPriorEvolutions, setType } = props;

    const { FetchDigimons_Name } = useFecthDigimon();
    const { SetDigimonItems } = useSetDigimonItems();

    /* 希望するデジモンを（英語名で）検索 */
    const setDigiName: (inputElm: HTMLInputElement) => void = (inputElm: HTMLInputElement) => {
        const inputElmValue: string = inputElm.value;
        setDigiNameValue((_prevDigiNameValue) => inputElmValue);
    }

    /* デジモン検索でのデータ取得及び反映 */
    const searchTargetDigimon: () => void = useCallback(() => {
        const fetchDigiData = FetchDigimons_Name(isDigiNameValue);
        SetDigimonItems(
            fetchDigiData,
            setDigimonData,
            setDescriptions,
            setNextEvolutions,
            setPriorEvolutions,
            setType
        );
        setDigiNameValue((_prevDigiNameValue) => '');
    }, [isDigiNameValue]);

    return (
        <DigiSearchForm onSubmit={(formElm: ChangeEvent<HTMLFormElement>) => {
            formElm.preventDefault();
            searchTargetDigimon();
        }}>
            <p>※なりたいデジモンがいる場合は【英語名】で入力してください</p>
            <div>
                <input type="text" value={isDigiNameValue} onInput={(inputElm: ChangeEvent<HTMLInputElement>) => setDigiName(inputElm.currentTarget)} />
                <button type="button" onClick={searchTargetDigimon}>になりたい</button>
            </div>
        </DigiSearchForm>
    );
});

const DigiSearchForm = styled.form`
font-size: 1.4rem;

@media screen and (min-width: 700px) {
    font-size: 14px;
}

& p {
    text-indent: -1em;
    padding-left: 1em;
    margin-bottom: .5em;
}

& div {
    display: flex;
    gap: 1%;

    & input[type="text"]{
        font-size: 1.6rem;
        width: clamp(16rem, 100%, 24rem);
        padding-left: .25em;
        line-height: 2;

        @media screen and (min-width: 700px) {
            font-size: 16px;
            width: clamp(160px, 100%, 320px);
            line-height: 44px;
            padding: 0;
        }
    }

    & button {
        cursor: pointer;
        appearance: none;
        background-color: #333;
        color: #fff;
        border: 1px solid transparent;
        border-radius: 4px;
        transition: all .25s;
        line-height: 2;
        padding: 1em 0;

        &:hover {
            background-color: #fff;
            color: #333;
            border-color: #333;
        }

        @media screen and (min-width: 700px) {
            line-height: 44px;
            padding: 0 .5em;
        }
    }
}
`;