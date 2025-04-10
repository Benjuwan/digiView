import { FC, memo, useEffect, useState } from "react";
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
        setDigiNameValue('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [randNum]); // 依存配列 randNum：ランダム数値が変更する度に処理

    // console.log(isDigimonData);

    return (
        <>

            <div className="w-[clamp(10rem,100%,60rem)] m-auto px-[2.5em] text-sm leading-[2] p-0 lg:mb-[5em]">
                <SearchForm
                    isDigiNameValue={isDigiNameValue}
                    setDigiNameValue={setDigiNameValue}
                    setDigimonData={setDigimonData}
                    setDescriptions={setDescriptions}
                    setNextEvolutions={setNextEvolutions}
                    setPriorEvolutions={setPriorEvolutions}
                    setType={setType}
                />
                <div className="lg:flex lg:flex-wrap lg:flex-row lg:justify-between lg:gap-[4%]">
                    <div className="lg:w-[48%]">
                        {isDigimonData?.name &&
                            <h2 className="font-normal text-lg leading-[1.4] border-b border-dotted border-b-[#333] pb-[0.5em]"><span className="text-xs block">No.{isDigimonData?.id}：</span>今日のあなたは【{isDigimonData?.name}】</h2>
                        }
                        <img className="px-[5em]" src={isDigimonData?.images[0].href} alt={isDigimonData?.name} />
                        {isType.length > 0 &&
                            <p className="type">タイプ：
                                {isType.map((type, i) => (
                                    <span key={i}>{type}, </span>
                                ))}
                            </p>
                        }
                        {isDescriptions && <p className="bg-[#dadada] p-[0.5em] rounded">{isDescriptions}</p>}
                    </div>
                    <div className="lg:w-[48%]">
                        {nextEvolutions.length > 0 ?
                            <div className="flex flex-row flex-wrap gap-[2%] text-sm py-[2.5em] mb-[2.5em] border-b-[#333] border-b-[dotted] md:p-0">
                                <h3 className="w-full text-base mb-[0.5em]">あなたの将来性<span className="block text-sm leading-[1.2]">（※進化後）</span></h3>
                                <>
                                    {nextEvolutions.map((evolution, i) => (
                                        <div className="text-center mb-[2%] w-[49%] p-[1em] bg-[#dadada] rounded md:w-[32%]" key={i}>
                                            <p className="wrap-anywhere m-0 leading-[1.5]">{evolution.digimon}</p>
                                            <img className="rounded" src={evolution.image} alt={evolution.digimon} />
                                        </div>
                                    ))}
                                </>
                            </div> :
                            <div className="flex flex-row flex-wrap gap-[2%] text-sm">
                                <h3 className="w-full text-base mb-[0.5em]">将来性なし<span className="block text-sm leading-[1.2]">（※進化後のデータがありません）</span></h3>
                            </div>
                        }
                        {priorEvolutions.length > 0 ?
                            <div className="flex flex-row flex-wrap gap-[2%] text-sm">
                                <h3 className="w-full text-base mb-[0.5em]">あなたの経歴<span className="block text-sm leading-[1.2]">（※進化前）</span></h3>
                                <>
                                    {priorEvolutions.map((evolution, i) => (
                                        <div className="text-center mb-[2%] w-[49%] p-[1em] bg-[#dadada] rounded md:w-[32%]" key={i}>
                                            <p className="wrap-anywhere m-0 leading-[1.5]">{evolution.digimon}</p>
                                            <img className="rounded" src={evolution.image} alt={evolution.digimon} />
                                        </div>
                                    ))}
                                </>
                            </div> :
                            <div className="flex flex-row flex-wrap gap-[2%] text-sm">
                                <h3 className="w-full text-base mb-[0.5em]">経歴不明<span className="block text-sm leading-[1.2]">（※進化前のデータがありません）</span></h3>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
});