import { useState, useEffect, useRef } from "react";

export default function RunawaySignInButton({ onSuccessfulClick }) {
    const initialPos = useRef({ top: 0, left: 0 }); // Save starting point
    const [pos, setPos] = useState({ top: 0, left: 0 });
    const [active, setActive] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setActive(false);

            // ⬅️ When runaway mode ends, restore ORIGINAL position
            setPos(initialPos.current);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    function runAway() {
        if (!active) return;

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
                if (!active && onSuccessfulClick) {
                    onSuccessfulClick();
                }
            }}
            style={{
                position: "relative",
                transform: `translate(${pos.left}px, ${pos.top}px)`,
                transition: "transform 0.2s ease-out",
                marginLeft: 8,
                padding: "8px 16px",
                cursor: active ? "not-allowed" : "pointer",
                boxShadow: active ? "0 0 5px red" : "none",
                fontWeight: "bold",
            }}
        >
            {active ? "Sign In: GET ME!" : "Sign In"}
        </button>
    );
}
