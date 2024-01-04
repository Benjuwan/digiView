import { memo, useMemo } from "react";

export const Footer = memo(() => {
    const currentYear: number = useMemo(() => new Date().getFullYear(), []);

    return (
        <footer style={{ 'fontSize': '12px', 'textAlign': 'center' }}>
            <p><small>&copy; {currentYear} Anata ha NANIMON ?</small></p>
        </footer>
    );
});