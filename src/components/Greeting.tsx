import { memo } from "react";

export const Greeting = memo(() => {
    return (
        <section className="w-[clamp(10rem,100%,30rem)] m-auto px-[2.5em] text-sm leading-[2] md:p-0">
            <h1>今日のあなたはナニモン？</h1>
            <p>デジモン好きなそこのあなた！ 今日のあなたはナニモンかチェックしてみよう！ 昨日がスカモンだったあなたも、今日がスカモンかもしれないあなたも、いつかはオメガモンにも、デュークモンにも、パイルドラモンにもなれる（はず）！</p>
            <figure className="text-center"><img className="w-fit m-auto" src="https://digimon-api.com/images/digimon/w/Sukamon.png" alt="スカモン" /></figure>
        </section>
    );
});