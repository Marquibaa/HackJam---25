import { useState, useRef } from 'react'

const morseMap: { [key: string]: string } = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
    '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
    '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
    '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
    '-.--': 'Y', '--..': 'Z',
}

export default function MorseInput() {
    const [currentMorse, setCurrentMorse] = useState('')
    const [firstName, setFirstName] = useState('')
    const pressTimer = useRef<number | null>(null)
    const isDash = useRef(false)
    const inactivityTimer = useRef<number | null>(null)

    // Auto-commit letter after inactivity
    const startInactivityTimer = () => {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
        inactivityTimer.current = window.setTimeout(() => {
            if (currentMorse !== '') {
                const letter = morseMap[currentMorse] || '?'
                setFirstName((p) => p + letter)
                setCurrentMorse('')
            }
        }, 700)
    }

    const handleMouseDown = () => {
        isDash.current = false
        pressTimer.current = window.setTimeout(() => {
            isDash.current = true
            setCurrentMorse((p) => p + '-')
        }, 300)
    }

    const handleMouseUp = () => {
        if (pressTimer.current) clearTimeout(pressTimer.current)
        if (!isDash.current) setCurrentMorse((p) => p + '.')
        startInactivityTimer()
    }

    const resetAll = () => {
        setCurrentMorse('')
        setFirstName('')
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div>
                <strong>First Name:</strong> {firstName}
            </div>
            <div>
                <strong>Current Morse:</strong> {currentMorse}
            </div>
            <div>
                <button onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>Morse Button</button>
                <button onClick={resetAll} style={{ marginLeft: 8 }}>Reset</button>
            </div>
        </div>
    )
}
