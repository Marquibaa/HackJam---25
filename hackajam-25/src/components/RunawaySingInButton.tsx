import { useState, useEffect, useRef } from "react";

interface RunawaySignInButtonProps {
    onSuccessfulClick: () => void;
    disabled?: boolean; // new prop
}

export default function RunawaySignInButton({ onSuccessfulClick, disabled = false }: RunawaySignInButtonProps) {
    const initialPos = useRef({ top: 0, left: 0 });
    const [pos, setPos] = useState({ top: 0, left: 0 });
    const [active, setActive] = useState(true);
    const btnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setActive(false);
            setPos(initialPos.current); // restore position
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    // Move the button away from the cursor. Accepts an optional event but doesn't require it.
    function runAway(e?: any) {
        // Only run away while in the "active" fun period and when not disabled
        if (!active || disabled) return;

        // If we have the button element and a mouse event, try to move away from cursor
        if (e && btnRef.current) {
            const rect = btnRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (cx - e.clientX) || (Math.random() - 0.5) * 100;
            const dy = (cy - e.clientY) || (Math.random() - 0.5) * 100;

            // Normalize and scale to move a good distance away
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const scale = 120 / dist; // desired move distance

            setPos({
                left: (Math.random() - 0.5) * 200 + dx * scale,
                top: (Math.random() - 0.5) * 120 + dy * scale,
            });
            return;
        }

        // Fallback random movement
        setPos({
            top: (Math.random() - 0.5) * 150,
            left: (Math.random() - 0.5) * 250,
        });
    }

    return (
        <button
            ref={btnRef}
            type="button"
            onMouseEnter={runAway}
            onMouseMove={runAway}
            onClick={() => {
                if (!active && !disabled && onSuccessfulClick) {
                    onSuccessfulClick();
                }
            }}
            style={{
                position: "relative",
                transform: `translate(${pos.left}px, ${pos.top}px)`,
                transition: "transform 0.12s ease-out",
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
