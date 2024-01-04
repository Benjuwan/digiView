import { FC, memo, useEffect, useState } from "react";
import styled from "styled-components";
import { digimons, evolutions } from "../ts/digimon";
import { SearchForm } from "./SearchForm";
import { useFecthDigimon } from "../hooks/useFecthDigimon";
import { useSetDigimonItems } from "../hooks/useSetDigimonItems";

type DigimonsType = {
    randNum: number;
}

export const Digimons: FC<DigimonsType> = memo(({ randNum }) => {
    const { FetchDigimons_Number } = useFecthDigimon();
    const { SetDigimonItems } = useSetDigimonItems();

    const [isDigiNameValue, setDigiNameValue] = useState<string>(''); // デジモンの検索用（input text の）State
    const [isDigimonData, setDigimonData] = useState<digimons>(); // デジモンの総合データ
    const [isDescriptions, setDescriptions] = useState<string>(''); // デジモンの紹介文
    const [nextEvolutions, setNextEvolutions] = useState<evolutions[]>([]); // 進化後のデジモンデータ
    const [priorEvolutions, setPriorEvolutions] = useState<evolutions[]>([]); // 進化前のデジモンデータ
    const [isType, setType] = useState<string[]>([]); // デジモンのタイプ

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
    }, [randNum]); // 依存配列 randNum：ランダム数値が変更する度に処理

    // console.log(isDigimonData);

    return (
        <>

            <DigimonContent>
                <SearchForm
                    isDigiNameValue={isDigiNameValue}
                    setDigiNameValue={setDigiNameValue}
                    setDigimonData={setDigimonData}
                    setDescriptions={setDescriptions}
                    setNextEvolutions={setNextEvolutions}
                    setPriorEvolutions={setPriorEvolutions}
                    setType={setType}
                />
                <div className="digimonContent">
                    <div className="digimonContentChildren">
                        {isDigimonData?.name &&
                            <h2><span>No.{isDigimonData?.id}：</span>今日のあなたは【{isDigimonData?.name}】</h2>
                        }
                        <img className="thumbnail" src={isDigimonData?.images[0].href} alt={isDigimonData?.name} />
                        {isType.length > 0 &&
                            <p className="type">タイプ：
                                {isType.map((type, i) => (
                                    <span key={i}>{type}, </span>
                                ))}
                            </p>
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
padding: 0 2.5em;

@media screen and (min-width: 700px) {
    width: clamp(160px, 100%, 480px);
    font-size: 14px;
    padding: 0;
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
        margin: 0 0 .5em 0;
        
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
            overflow-wrap: anywhere;
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