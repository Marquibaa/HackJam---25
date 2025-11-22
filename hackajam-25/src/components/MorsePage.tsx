import React, { useState, useRef } from "react";

const morseMap: { [key: string]: string } = {
    ".-": "A",
    "-...": "B",
    "-.-.": "C",
    "-..": "D",
    ".": "E",
    "..-.": "F",
    "--.": "G",
    "....": "H",
    "..": "I",
    ".---": "J",
    "-.-": "K",
    ".-..": "L",
    "--": "M",
    "-.": "N",
    "---": "O",
    ".--.": "P",
    "--.-": "Q",
    ".-.": "R",
    "...": "S",
    "-": "T",
    "..-": "U",
    "...-": "V",
    ".--": "W",
    "-..-": "X",
    "-.--": "Y",
    "--..": "Z",
};

export default function MorseFirstName() {
    const [currentMorse, setCurrentMorse] = useState("");
    const [firstName, setFirstName] = useState("");

    const pressTimer = useRef<number | null>(null);
    const isDash = useRef(false);
    const inactivityTimer = useRef<number | null>(null);

    // Auto-commit letter on inactivity
    const startInactivityTimer = () => {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);

        inactivityTimer.current = window.setTimeout(() => {
            if (currentMorse !== "") {
                const letter = morseMap[currentMorse] || "?";
                setFirstName((prev) => prev + letter);
                setCurrentMorse("");
            }
        }, 700);
    };

    const handleMouseDown = () => {
        isDash.current = false;

        pressTimer.current = window.setTimeout(() => {
            isDash.current = true;
            setCurrentMorse((prev) => prev + "-");
        }, 300);
    };

    const handleMouseUp = () => {
        if (pressTimer.current) clearTimeout(pressTimer.current);

        if (!isDash.current) {
            setCurrentMorse((prev) => prev + ".");
        }

        startInactivityTimer();
    };

    const resetAll = () => {
        setCurrentMorse("");
        setFirstName("");
    };

    return (
        <div className="">
            <h1 className="">Annoying Morse First Name Input</h1>

            <div className="">
                <div className="">
                    <strong>First Name:</strong> {firstName}
                </div>

                <div className="">
                    <strong>Current Morse:</strong> {currentMorse}
                </div>
            </div>

            <button
                className=""
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                Tap = Dot • Hold = Dash • Pause = Next Letter
            </button>

            <button className="" onClick={resetAll}>
                Reset
            </button>
        </div>
    );
}
