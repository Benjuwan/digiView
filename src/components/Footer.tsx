import { memo } from "react";

export const Footer = memo(() => {
    const currentYear: number = new Date().getFullYear();

    return (
        <footer className="text-[12px] text-center">
            <p><small>&copy; {currentYear} Anata ha NANIMON ?</small></p>
        </footer>
    );
});