import { digimonData, digimons } from "../ts/digimon";

export const useFecthDigimon = () => {
    const FetchDigimonData: () => Promise<digimonData> = async () => {
        const response: Response = await fetch('https://digi-api.com/api/v1/digimon');
        const digimonData: digimonData = await response.json();
        // console.log(digimonData);
        return digimonData;
    }

    const FetchDigimons_Number: (randNum: number) => Promise<digimons> = async (randNum: number) => {
        const singleDigimonData: Response = await fetch(`https://digi-api.com/api/v1/digimon/${randNum}`);
        const singleDigimon: digimons = await singleDigimonData.json();
        // console.log(singleDigimon);
        return singleDigimon;
    }

    const FetchDigimons_Name: (digiName: string) => Promise<digimons | undefined> = async (digiName: string) => {
        const singleDigimonData: Response = await fetch(`https://digi-api.com/api/v1/digimon/${digiName}`);
        if (singleDigimonData.status !== 200) {
            alert('ごめんなさい。\n入力したデジモンは存在しません。\nサイトを再読み込みします。');
            setTimeout(() => location.reload());
        } else {
            const singleDigimon: digimons = await singleDigimonData.json();
            // console.log(singleDigimon);
            return singleDigimon;
        }
    }

    return { FetchDigimonData, FetchDigimons_Number, FetchDigimons_Name }
}