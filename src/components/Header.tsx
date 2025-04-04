import { FC, memo } from "react";

export const Header: FC = memo(() => {
    return (
        <header className="text-center">
            <a className="text-[12px] text-[#333]" href="https://digimon-api.com/" target="_blank">DAPI（Digimon API）を使っています</a>
        </header>
    );
});