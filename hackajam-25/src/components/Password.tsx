import React, { useState, useEffect, useRef } from "react";

interface PasswordProps {
    value: string;
    onChange: (v: string) => void;
    onValidChange?: (valid: boolean) => void;
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

export default function AnnoyingPassword({ value, onChange, onValidChange }: PasswordProps) {
    const [planeIndex, setPlaneIndex] = useState(0);
    const [lastHit, setLastHit] = useState<string | null>(null);
    const gameRef = useRef<HTMLDivElement | null>(null);

    // Focus the game area so it can receive key events
    useEffect(() => {
        if (gameRef.current) {
            gameRef.current.focus();
        }
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const key = e.key;

        // Move up
        if (key === "PageUp" || key === "ArrowUp") {
            e.preventDefault();
            setPlaneIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
        // Move down
        else if (key === "PageDown" || key === "ArrowDown") {
            e.preventDefault();
            setPlaneIndex((prev) =>
                prev < CHARACTERS.length - 1 ? prev + 1 : prev
            );
        }
        // Shoot (End key OR Right Arrow)
        else if (key === "End" || key === "ArrowRight") {
            e.preventDefault();
            const hitChar = CHARACTERS[planeIndex];
            const newPassword = value + hitChar;
            onChange(newPassword);
            setLastHit(hitChar);
        }
    };

    // Update validity (any non-empty password is considered valid)
    useEffect(() => {
        if (onValidChange) {
            onValidChange(value.length > 0);
        }
    }, [value, onValidChange]);

    return (
        <div className="password-container">
            <h3>Create Your Password (Shooting Game)</h3>
            <p className="instructions">
                Click inside the game area once, then use
                {" "}
                <strong>PgUp / PgDn</strong> or <strong>Arrow Up / Down</strong> to move
                the aircraft. Press <strong>End</strong> or <strong>Right Arrow</strong> to shoot.
            </p>

            <div
                ref={gameRef}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                className="game-layout"
                style={{
                    display: "flex",
                    gap: "1rem",
                    outline: "none",
                    border: "1px solid #ccc",
                    padding: "8px",
                    borderRadius: "4px",
                    maxWidth: "320px"
                }}
            >
                {/* Left column: aircraft */}
                <div className="left-column" style={{ flex: 1 }}>
                    {CHARACTERS.map((_, idx) => (
                        <div
                            key={idx}
                            style={{
                                height: "24px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            {idx === planeIndex ? "✈️" : ""}
                        </div>
                    ))}
                </div>

                {/* Right column: characters */}
                <div className="right-column" style={{ flex: 1 }}>
                    {CHARACTERS.map((ch, idx) => {
                        const isHitRecently = lastHit === ch && idx === planeIndex;
                        const isInPassword = value.includes(ch);
                        return (
                            <div
                                key={ch + idx}
                                style={{
                                    height: "24px",
                                    display: "flex",
                                    alignItems: "center",
                                    paddingLeft: "8px",
                                    fontWeight: isHitRecently ? "bold" : "normal",
                                    textDecoration: isInPassword ? "underline" : "none",
                                }}
                            >
                                {ch}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="current-password" style={{ marginTop: "1rem" }}>
                <strong>Current password:</strong> <code>{value || "(empty)"}</code>
            </div>

            {lastHit && (
                <div className="message" style={{ marginTop: "0.5rem" }}>
                    Last hit: <strong>{lastHit}</strong>
                </div>
            )}
        </div>
    );
}
