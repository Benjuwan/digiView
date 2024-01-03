import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { digimons, evolutions } from "../ts/digimon";
import { useFecthDigimon } from "../hooks/useFecthDigimon";
import { useSetDigimonItems } from "../hooks/useSetDigimonItems";

type DigimonsType = {
    randNum: number;
}

export const Digimons: FC<DigimonsType> = memo(({ randNum }) => {
    const { FetchDigimons_Number, FetchDigimons_Name } = useFecthDigimon();
    const { SetDigimonItems } = useSetDigimonItems();

    const [isDigimonData, setDigimonData] = useState<digimons>(); // デジモンの総合データ
    const [isDescriptions, setDescriptions] = useState<string>(''); // デジモンの紹介文
    const [nextEvolutions, setNextEvolutions] = useState<evolutions[]>([]); // 進化後のデジモンデータ
    const [priorEvolutions, setPriorEvolutions] = useState<evolutions[]>([]); // 進化前のデジモンデータ
    const [isType, setType] = useState<string[]>([]); // デジモンのタイプ

    /* 希望するデジモンを（英語名で）検索 */
    const [isDigiNameValue, setDigiNameValue] = useState<string>('');
    const setDigiName = (inputElm: HTMLInputElement) => {
        const inputElmValue: string = inputElm.value;
        setDigiNameValue((_prevDigiNameValue) => inputElmValue);

        /* 入力値が 0 の場合は初期化 */
        if (inputElmValue.length <= 0) {
            setDigimonData(undefined);
            setDescriptions('');
            setNextEvolutions([]);
            setPriorEvolutions([]);
            setType([]);
        }
    }

    /* ランダム数値でのデータ取得及び反映 */
    useEffect(() => {
        const fetchDigiData = FetchDigimons_Number(randNum);
        SetDigimonItems(
            fetchDigiData,
            setDigimonData,
            setDescriptions,
            setNextEvolutions,
            setPriorEvolutions,
            setType
        );
        setDigiNameValue((_prevDigiNameValue) => '');
    }, [randNum]);

    /* デジモン検索でのデータ取得及び反映 */
    const searchTargetDigimon = useCallback(() => {
        const fetchDigiData = FetchDigimons_Name(isDigiNameValue);
        SetDigimonItems(
            fetchDigiData,
            setDigimonData,
            setDescriptions,
            setNextEvolutions,
            setPriorEvolutions,
            setType
        );
    }, [isDigiNameValue]);

    // console.log(isDigimonData);

    return (
        <>

            <DigimonContent>
                <form onSubmit={(formElm: ChangeEvent<HTMLFormElement>) => {
                    formElm.preventDefault();
                    searchTargetDigimon();
                }}>
                    <p>※希望するデジモンがいる場合は【英語名】で入力してください</p>
                    <input type="text" value={isDigiNameValue} onInput={(inputElm: ChangeEvent<HTMLInputElement>) => setDigiName(inputElm.currentTarget)} />
                </form>
                <div className="digimonContent">
                    <div className="digimonContentChildren">
                        {isDigimonData?.name &&
                            <h2><span>{isDigimonData?.id}：</span>{isDigimonData?.name}</h2>
                        }
                        <img className="thumbnail" src={isDigimonData?.images[0].href} alt={isDigimonData?.name} />
                        {isType.length > 0 &&
                            <>
                                {isType.map((type, i) => (
                                    <p key={i} className="type"><span>タイプ：</span>{type}</p>
                                ))}
                            </>
                        }
                        {isDescriptions && <p className="description">{isDescriptions}</p>}
                    </div>
                    <div className="digimonContentChildren">
                        {nextEvolutions.length > 0 ?
                            <div className="evolutions">
                                <h3>あなたの将来性<span>（※進化後）</span></h3>
                                <>
                                    {nextEvolutions.map((evolution, i) => (
                                        <div className="evolutionChildren" key={i}>
                                            <p>{evolution.digimon}</p>
                                            <img src={evolution.image} alt={evolution.digimon} />
                                        </div>
                                    ))}
                                </>
                            </div> :
                            <div className="evolutions">
                                <h3>将来性なし<span>（※進化後のデータがありません）</span></h3>
                            </div>
                        }
                        {priorEvolutions.length > 0 ?
                            <div className="evolutions">
                                <h3>あなたの軌跡<span>（※進化前）</span></h3>
                                <>
                                    {priorEvolutions.map((evolution, i) => (
                                        <div className="evolutionChildren" key={i}>
                                            <p>{evolution.digimon}</p>
                                            <img src={evolution.image} alt={evolution.digimon} />
                                        </div>
                                    ))}
                                </>
                            </div> :
                            <div className="evolutions">
                                <h3>経歴不明<span>（※進化前のデータがありません）</span></h3>
                            </div>
                        }
                    </div>
                </div>
            </DigimonContent>
        </>
    );
})

const DigimonContent = styled.div`
width: clamp(16rem, 100%, 48rem);
margin: auto;
font-size: 1.4rem;
line-height: 2;

@media screen and (min-width: 700px) {
    width: clamp(160px, 100%, 480px);
    font-size: 14px;
}

@media screen and (min-width: 1025px) {
    width: clamp(160px, 100%, 960px);
    margin-bottom: 5em;

    & .digimonContent {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        gap: 4%;

        & .digimonContentChildren {
            width: 48%;

        & .evolutions {
            &:first-of-type {
                    padding-top: 0;
                }
            }
        }
    }
}

& form {
    & input[type="text"]{
        font-size: 1.6rem;
        width: clamp(16rem, 100%, 24rem);
        padding-left: .25em;
        
        @media screen and (min-width: 700px) {
            font-size: 16px;
            width: clamp(160px, 100%, 320px);
        }
    }
}

& .thumbnail {
    padding: 0 5em;
}

& h2 {
    font-weight: normal;
    font-size: 2.4rem;
    line-height: 1.4;
    border-bottom: 1px dotted #333;
    padding-bottom: .5em;

    & span {
        font-size: 1.2rem;
        display: block;
    }

    @media screen and (min-width: 700px) {
        font-size: 24px;

        & span {
            font-size: 12px;
        }
    }
}

& .description {
    background-color: #dadada;
    padding: .5em;
    border-radius: 4px;
}

& .evolutions {
    display: flex;
    flex-flow: row wrap;
    gap: 2%;
    font-size: 1.4rem;

    &:first-of-type {
        padding: 2.5em 0;
        margin-bottom: 2.5em;
        border-bottom: 1px dotted #333;
    }
    
    & h3 {
        width: 100%;
        font-size: 1.6rem;
        margin: 0;
        
        & span {
            display: block;
            font-weight: normal;
            font-size: 1.4rem;
            line-height: 1.2;
        }
    }

    & .evolutionChildren {
        text-align: center;
        margin-bottom: 2%;
        width: 49%;
        padding: 1em;
        background-color: #eaeaea;
        border-radius: 4px;
        
        & p {
            margin: 0;
            line-height: 2;
        }
        
        & img {
            border-radius: 4px;
        }
    }

    @media screen and (min-width: 700px) {
        font-size: 14px;

        & h3 {
            font-size: 16px;

            & span {
                font-size: 14px;
            }
        }

        & .evolutionChildren {
            width: 32%;
        }
    }
}
`;