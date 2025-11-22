import React, { useState, useRef } from "react";
import './morse.css'

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
    const timerRef = useRef<number | null>(null);
    const dashAdded = useRef(false);

    const handleMouseDown = () => {
        dashAdded.current = false;
        timerRef.current = window.setTimeout(() => {
            setCurrentMorse((prev) => prev + "-");
            dashAdded.current = true;
        }, 300); // Hold >300ms means dash
    };

    const handleMouseUp = () => {
        if (timerRef.current) clearTimeout(timerRef.current);

        // If no dash was added by long press, add a dot
        if (!dashAdded.current) {
            setCurrentMorse((prev) => prev + ".");
        }
    };

    const commitLetter = () => {
        const letter = morseMap[currentMorse] || "?"; // evil fallback
        setFirstName((prev) => prev + letter);
        setCurrentMorse(""); // reset buffer
    };

    const resetAll = () => {
        setCurrentMorse("");
        setFirstName("");
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <h1 className="text-xl font-bold">Enter Your First Name (Morse Only)</h1>

            <div className="text-center">
                <div>
                    <strong>First Name:</strong> {firstName}
                </div>
                <div>
                    <strong>Current Morse:</strong> {currentMorse}
                </div>
            </div>

            <button
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
                Tap = Dot • Hold = Dash
            </button>

            <button
                onClick={commitLetter}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
                Commit Letter
            </button>

            <button
                onClick={resetAll}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
                Reset
            </button>
        </div>
    );
}
