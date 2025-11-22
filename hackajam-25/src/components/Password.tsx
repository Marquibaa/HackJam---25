import React, { useState, useEffect, useRef } from "react";

interface PasswordProps {
    value: string;
    onChange: (v: string) => void;
    onValidChange?: (valid: boolean) => void;
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

// Helper: count letters and digits in the password
function countLettersAndDigits(pw: string) {
    let letters = 0;
    let digits = 0;

    for (const ch of pw) {
        if (ch >= "A" && ch <= "Z") {
            letters++;
        } else if (ch >= "0" && ch <= "9") {
            digits++;
        }
    }
    return { letters, digits };
}

export default function AnnoyingPassword({ value, onChange, onValidChange }: PasswordProps) {
    const [planeIndex, setPlaneIndex] = useState(0);
    const [lastHit, setLastHit] = useState<string | null>(null);
    const gameRef = useRef<HTMLDivElement | null>(null);

    // Compute counts and requirement status
    const { letters, digits } = countLettersAndDigits(value);
    const meetsRequirement = letters >= 8 && digits >= 5;

    // Focus so keyboard works
    useEffect(() => {
        gameRef.current?.focus();
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const key = e.key;

        if (key === "PageUp" || key === "ArrowUp") {
            e.preventDefault();
            setPlaneIndex((prev) => Math.max(prev - 1, 0));
        } else if (key === "PageDown" || key === "ArrowDown") {
            e.preventDefault();
            setPlaneIndex((prev) =>
                Math.min(prev + 1, CHARACTERS.length - 1)
            );
        } else if (key === "End" || key === "ArrowRight") {
            e.preventDefault();
            const char = CHARACTERS[planeIndex];
            onChange(value + char);
            setLastHit(char);
        }
    };

    // Update validity based on 8 letters + 5 numbers rule
    useEffect(() => {
        onValidChange?.(meetsRequirement);
    }, [meetsRequirement, onValidChange]);

    // Clear button handler
    const clearPassword = () => {
        onChange("");
        setPlaneIndex(0);
        setLastHit(null);
        gameRef.current?.focus();
    };

    return (
        <div className="password-container">
            <h3>Create Your Password (Shooting Game)</h3>

            <p className="instructions">
                Click inside the box.
                Move with <strong>PgUp/PgDn</strong> or <strong>Arrow Up/Down</strong>.
                Shoot with <strong>End</strong> or <strong>Right Arrow</strong>.
                <br />
                <strong>Goal:</strong> At least <strong>8 letters</strong> and <strong>5 numbers</strong>.
            </p>

            {/* GAME AREA */}
            <div
                ref={gameRef}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                style={{
                    display: "flex",
                    gap: "1rem",
                    outline: "none",
                    border: "1px solid #ccc",
                    padding: "8px",
                    borderRadius: "6px",
                    maxWidth: "320px",
                    margin: "0 auto",     // ← centers the game box
                    marginBottom: "12px"
                }}
            >
                {/* PLANE COLUMN */}
                <div style={{ flex: 1 }}>
                    {CHARACTERS.map((_, i) => (
                        <div
                            key={i}
                            style={{
                                height: "24px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            {i === planeIndex ? "✈️" : ""}
                        </div>
                    ))}
                </div>

                {/* CHAR COLUMN */}
                <div style={{ flex: 1 }}>
                    {CHARACTERS.map((ch, i) => {
                        const hit = lastHit === ch && i === planeIndex;
                        const used = value.includes(ch);

                        return (
                            <div
                                key={ch}
                                style={{
                                    height: "24px",
                                    display: "flex",
                                    alignItems: "center",
                                    paddingLeft: "8px",
                                    fontWeight: hit ? "bold" : "normal",
                                    textDecoration: used ? "underline" : "none",
                                }}
                            >
                                {ch}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* CURRENT PASSWORD + REQUIREMENT STATUS */}
            <div style={{ marginBottom: "8px" }}>
                <strong>Password:</strong> <code>{value || "(empty)"}</code>
            </div>

            <div
                style={{
                    marginBottom: "12px",
                    fontSize: "0.9rem",
                    color: meetsRequirement ? "green" : "red",
                }}
            >
                Letters: {letters}/8, Numbers: {digits}/5{" "}
                {meetsRequirement ? "(✅ strong enough)" : "(❌ keep shooting...)"}
            </div>

            {/* CLEAR BUTTON */}
            <button
                onClick={clearPassword}
                style={{
                    padding: "6px 12px",
                    backgroundColor: "#d9534f",
                    border: "none",
                    borderRadius: "4px",
                    color: "white",
                    cursor: "pointer"
                }}
            >
                Clear Password
            </button>
        </div>
    );
}
