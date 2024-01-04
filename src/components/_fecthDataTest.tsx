import { useEffect, useState } from "react";

type pokeType = {
    name: string;
    url: string
}

export const FDT = () => {
    const [isPoke, setPoke] = useState<pokeType[]>([]);
    useEffect(() => {
        const fetchPokeData = async () => {
            /* データを「複数」取得していると配列形式に変換できる */
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
            const resObj = await response.json();
            const pokemons: pokeType[] = resObj.results;
            const newAry: pokeType[] = pokemons.map(poke => {
                // console.log(poke);
                const newAry = {
                    name: poke.name,
                    url: poke.url
                }
                return newAry;
            });
            setPoke((_prevPoke) => newAry);
        }
        fetchPokeData();
    }, []);

    // console.log(isPoke);

    return (
        <>
            {
                isPoke.map((poke, i) => (
                    <div key={i}>
                        <p>{poke.name}, {poke.url}</p>
                    </div>
                ))
            }
        </>
    );
}