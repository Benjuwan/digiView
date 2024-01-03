import { FC, memo } from "react";

type headerType = {
    style: object;
}

export const Header: FC<headerType> = memo(({ style }) => {
    const ankerStyle: object = {
        'fontSize': '12px',
        'color': '#333'
    }

    return (
        <header style={style}>
            <a style={ankerStyle} href="https://digimon-api.com/" target="_blank">DAPI（Digimon API）を使っています</a>
        </header>
    );
});