import { FC, memo, useMemo } from "react";

type propsStyle = {
    style: object;
}
/* propsStyle を継承（もどき）*/
type footerStyle = propsStyle & {
    'fontSize': '12px'
}

export const Footer: FC<footerStyle> = memo(({ style }) => {
    const currentYear: number = useMemo(() => new Date().getFullYear(), []);

    return (
        <footer style={style}>
            <p><small>&copy; {currentYear} Anata ha NANIMON ?</small></p>
        </footer>
    );
});