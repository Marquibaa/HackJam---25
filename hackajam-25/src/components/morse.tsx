import React, { useState, useRef } from "react";

const morseMap: { [key: string]: string } = {
    ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E",
    "..-.": "F", "--.": "G", "....": "H", "..": "I", ".---": "J",
    "-.-": "K", ".-..": "L", "--": "M", "-.": "N", "---": "O",
    ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T",
    "..-": "U", "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y",
    "--..": "Z",
};

export default function MorseFirstName() {
    const [currentMorse, setCurrentMorse] = useState("");
    const [firstName, setFirstName] = useState("");

    const pressTimer = useRef<number | null>(null);
    const isDash = useRef(false);
    const inactivityTimer = useRef<number | null>(null);

    const restartInactivityTimer = () => {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);

        inactivityTimer.current = window.setTimeout(() => {
            if (currentMorse !== "") {
                const letter = morseMap[currentMorse] || "?";
                setFirstName((prev) => prev + letter);
                setCurrentMorse("");
            }
        }, 700);
    };

    const addSymbol = (symbol: "." | "-") => {
        setCurrentMorse(prev => {
            const updated = prev + symbol;
            restartInactivityTimer();
            return updated;
        });
    };

    const handleMouseDown = () => {
        isDash.current = false;

        pressTimer.current = window.setTimeout(() => {
            isDash.current = true;
            addSymbol("-");
        }, 300);
    };

    const handleMouseUp = () => {
        if (pressTimer.current) clearTimeout(pressTimer.current);

        if (!isDash.current) {
            addSymbol(".");
        }
    };

    const resetAll = () => {
        setCurrentMorse("");
        setFirstName("");
    };

    return (
        <div className="">
            <div className="">
                <strong>First Name:</strong> {firstName}
            </div>

            <div className="">
                <strong>Current Morse:</strong> {currentMorse}
            </div>

            <button
                type="button"
                className=""
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onClick={(e) => e.preventDefault()}   // ← prevents form submit ALWAYS
            >
                Morse Button
            </button>

            <button type="button" className="" onClick={resetAll}>
                Reset
            </button>
        </div>
    );
}
