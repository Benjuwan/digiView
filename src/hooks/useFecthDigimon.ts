import { digimonData, digimons } from "../ts/digimon";

export const useFecthDigimon = () => {
    const FetchDigimonData: () => Promise<digimonData | undefined> = async () => {
        try {
            const response: Response = await fetch('https://digi-api.com/api/v1/digimon');

            if (!response.ok) {
                throw new Error(`FetchDigimonData - fetch failed. status:${response.status}`);
            }

            const digimonData: digimonData = await response.json();
            // console.log(digimonData);

            return digimonData;
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(e.message);
            }
        }
    }

    const FetchDigimons_Number: (randNum: number) => Promise<digimons | undefined> = async (randNum: number) => {
        try {
            const singleDigimonData: Response = await fetch(`https://digi-api.com/api/v1/digimon/${randNum}`);

            if (!singleDigimonData.ok) {
                throw new Error(`FetchDigimons_Number - fetch failed. status:${singleDigimonData.status}`);
            }

            const singleDigimon: digimons = await singleDigimonData.json();
            // console.log(singleDigimon);

            return singleDigimon;
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(e.message);
            }
        }
    }

    const FetchDigimons_Name: (digiName: string) => Promise<digimons | undefined> = async (digiName: string) => {
        try {
            const singleDigimonData: Response = await fetch(`https://digi-api.com/api/v1/digimon/${digiName}`);

            if (!singleDigimonData.ok) {
                throw new Error(`FetchDigimons_Name - fetch failed. status:${singleDigimonData.status}`);
            }

            if (singleDigimonData.status !== 200) {
                alert('ごめんなさい。\n入力したデジモンは存在しません。\nサイトを再読み込みします。');
                location.reload();
            } else {
                const singleDigimon: digimons = await singleDigimonData.json();
                // console.log(singleDigimon);

                return singleDigimon;
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(e.message);
            }
        }
    }

    return { FetchDigimonData, FetchDigimons_Number, FetchDigimons_Name }
}