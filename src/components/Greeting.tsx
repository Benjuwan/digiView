import { memo } from "react";
import styled from "styled-components";

export const Greeting = memo(() => {
    return (
        <GreetingElm>
            <h1>今日のあなたはナニモン？</h1>
            <p>デジモン好きなそこのあなた！ 今日のあなたはナニモンかチェックしてみよう！ 昨日がスカモンだったあなたも、今日がスカモンかもしれないあなたも、いつかはオメガモンにも、デュークモンにも、パイルドラモンにもなれる（はず）！</p>
            <p><img src="https://digimon-api.com/images/digimon/w/Sukamon.png" alt="スカモン" /></p>
        </GreetingElm>
    );
});

const GreetingElm = styled.section`
width: clamp(16rem, 100%, 48rem);
margin: auto;
padding: 0 2.5em;
font-size: 1.4rem;

& p {
    line-height: 2;
}

@media screen and (min-width: 700px) {
    width: clamp(160px, 100%, 480px);
    padding: 0;
    font-size: 14px;
}
`;