import { digimons, evolutions } from "../ts/digimon";

export const useSetDigimonItems = () => {
    const SetDigimonItems: (
        fetchDigiData: Promise<digimons | undefined>,
        setDigimonData: React.Dispatch<React.SetStateAction<digimons | undefined>>,
        setDescriptions: React.Dispatch<React.SetStateAction<string>>,
        setNextEvolutions: React.Dispatch<React.SetStateAction<evolutions[]>>,
        setPriorEvolutions: React.Dispatch<React.SetStateAction<evolutions[]>>,
        setType: React.Dispatch<React.SetStateAction<string[]>>
    ) => void = (
        fetchDigiData: Promise<digimons | undefined>,
        setDigimonData: React.Dispatch<React.SetStateAction<digimons | undefined>>,
        setDescriptions: React.Dispatch<React.SetStateAction<string>>,
        setNextEvolutions: React.Dispatch<React.SetStateAction<evolutions[]>>,
        setPriorEvolutions: React.Dispatch<React.SetStateAction<evolutions[]>>,
        setType: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
            fetchDigiData.then((data) => {
                setDigimonData(data);

                /* デジモンの紹介文（日本語）*/
                data?.descriptions.forEach(digiDescriptionData => {
                    if (digiDescriptionData.language === 'jap') {
                        setDescriptions(digiDescriptionData.description)
                    }
                });

                /**
                 * 進化後・進化前のデータ
                 *（map 処理でデータを return する方法では型注釈エラーが出たので止む無く push 処理で対応）
                */
                // 進化後
                const nextEvolutionAry: evolutions[] = [];
                data?.nextEvolutions.map(nextEvolution => {
                    if (nextEvolution) {
                        const nextEvolutionData = {
                            digimon: nextEvolution.digimon,
                            image: nextEvolution.image
                        }
                        nextEvolutionAry.push(nextEvolutionData);
                    }
                });
                setNextEvolutions(nextEvolutionAry);

                // 進化前
                const priorEvolutionAry: evolutions[] = [];
                data?.priorEvolutions.map(priorEvolution => {
                    if (priorEvolution) {
                        const priorEvolutionData = {
                            digimon: priorEvolution.digimon,
                            image: priorEvolution.image
                        }
                        priorEvolutionAry.push(priorEvolutionData);
                    }
                });
                setPriorEvolutions(priorEvolutionAry);

                /* タイプ */
                const typeBox: string[] = [];
                data?.types.forEach(type => {
                    typeBox.push(type.type);
                });
                setType(typeBox);
            });
        }

    return { SetDigimonItems }
}