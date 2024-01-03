import { useEffect, useState } from "react";

type pokeType = {
    id: number;
    name: string;
    height: number;
}

export const FDT = () => {
    const [isPoke, setPoke] = useState<pokeType[]>([]);
    useEffect(() => {
        const pokeData = async () => {
            /* データを「複数」取得していると配列形式に変換できる */
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
            const resObj = await response.json();
            const pokemons: pokeType[] = resObj.results;
            const hoge: pokeType[] = pokemons.map(poke => {
                const newAry = {
                    name: poke.name,
                    id: poke.id,
                    height: poke.height
                }
                return newAry;
            });
            setPoke((_prevPoke) => hoge);
        }
        pokeData();
    }, []);
    // console.log(isPoke);

    return (
        <>
            {
                isPoke.map((poke, i) => (
                    <div key={i}>
                        {poke.name}
                    </div>
                ))
            }
        </>
    );
}