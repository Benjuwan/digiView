import { FC, ChangeEvent, memo, useCallback, SyntheticEvent } from "react";
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
        setDigiNameValue(inputElmValue);
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
        setDigiNameValue('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDigiNameValue]);

    const handleFormSubmitAction: (e: SyntheticEvent<HTMLFormElement>) => void = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        searchTargetDigimon();
    }

    return (
        <form className="text-sm" onSubmit={handleFormSubmitAction}>
            <p className="indent-[-1em] pl-[1em] mb-[0.5em]">※なりたいデジモンがいる場合は【英語名】で入力してください</p>
            <div className="flex gap-[1%] mb-[1em]">
                <input type="text" className="text-[1rem] w-[clamp(10rem,100%,15rem)] border border-[#dadada] rounded pl-[0.25em] leading-[2.75rem] md:w-[clamp(160px,100%,320px)] md:p-0" value={isDigiNameValue} onInput={(inputElm: ChangeEvent<HTMLInputElement>) => setDigiName(inputElm.currentTarget)} />
                <button className="appearance-none cursor-pointer text-[#fff] bg-[#333] border border-transparent rounded duration-[.25s] leading-[2.75rem] p-[0.5em] disabled:cursor-default disabled:text-[#333] disabled:bg-[#dadada] not-disabled:hover:bg-white not-disabled:hover:border-[#333] not-disabled:hover:text-[#333] py-0" disabled={isDigiNameValue.length <= 0} type="button" onClick={searchTargetDigimon}>になりたい</button>
            </div>
        </form>
    );
});