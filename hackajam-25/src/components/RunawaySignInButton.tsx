import { useState, useEffect } from "react";

// This component is specifically styled as the Sign In button
export default function RunawaySignInButton({ onSuccessfulClick }) {
    const [pos, setPos] = useState({ top: 0, left: 0 }); // Start relative to parent
    const [active, setActive] = useState(true);

    useEffect(() => {
        // Stop the runaway effect after 10 seconds (10000ms)
        const timer = setTimeout(() => {
            setActive(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    function runAway() {
        if (!active) return;

        // The button moves within a boundary (e.g., 200px offset from center)
        // We use Math.random() - 0.5 to allow negative and positive movement
        setPos({
            top: (Math.random() - 0.5) * 150, // Move max 75px up/down from center
            left: (Math.random() - 0.5) * 250, // Move max 125px left/right from center
        });
    }

    return (
        <button
            type="button" // Use type="button" to prevent default form submission on click
            onMouseEnter={runAway}
            onClick={onSuccessfulClick}
            style={{
                position: "relative", // Changed from "absolute" for better inline flow
                // Use transform to apply position changes relative to the starting point
                transform: `translate(${pos.left}px, ${pos.top}px)`,
                transition: "transform 0.2s ease-out",
                marginLeft: 8, // Added margin for spacing consistency
                padding: "8px 16px",
                cursor: active ? "not-allowed" : "pointer",
                // A little extra visual annoyance
                boxShadow: active ? "0 0 5px red" : "none",
                fontWeight: "bold",
            }}
        >
            {active ? "Sign In: GET ME!" : "Sign In"}
        </button>
    );
}