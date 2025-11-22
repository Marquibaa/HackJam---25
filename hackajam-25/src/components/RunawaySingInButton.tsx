import { useState, useEffect, useRef } from "react";

interface RunawaySignInButtonProps {
    onSuccessfulClick: () => void;
    disabled?: boolean; // new prop
}

export default function RunawaySignInButton({ onSuccessfulClick, disabled = false }: RunawaySignInButtonProps) {
    const initialPos = useRef({ top: 0, left: 0 });
    const [pos, setPos] = useState({ top: 0, left: 0 });
    const [active, setActive] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setActive(false);
            setPos(initialPos.current); // restore position
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    function runAway() {
        if (!active || disabled) return; // Stop running away if disabled
        setPos({
            top: (Math.random() - 0.5) * 150,
            left: (Math.random() - 0.5) * 250,
        });
    }

    return (
        <button
            type="button"
            onMouseEnter={runAway}
            onClick={() => {
                if (!active && !disabled && onSuccessfulClick) {
                    onSuccessfulClick();
                }
            }}
            style={{
                position: "relative",
                transform: `translate(${pos.left}px, ${pos.top}px)`,
                transition: "transform 0.2s ease-out",
                marginLeft: 8,
                padding: "8px 16px",
                cursor: active || disabled ? "not-allowed" : "pointer",
                boxShadow: active || disabled ? "0 0 5px red" : "none",
                fontWeight: "bold",
                opacity: disabled ? 0.6 : 1, // visually indicate disabled
            }}
        >
            {active ? "Sign In: GET ME!" : "Sign In"}
        </button>
    );
}
