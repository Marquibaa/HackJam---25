import { useEffect, useRef, useState } from 'react'

type Props = {
    value: string
    onChange: (v: string) => void
}

const morseMap: { [key: string]: string } = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
    '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
    '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
    '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
    '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
    '--..': 'Z'
}

export default function Username({ value, onChange }: Props) {
    const [currentMorse, setCurrentMorse] = useState('')
    const [name, setName] = useState(value || '')

    const pressTimer = useRef<number | null>(null)
    const isDash = useRef(false)
    const inactivityTimer = useRef<number | null>(null)

    useEffect(() => {
        setName(value || '')
    }, [value])

    const restartInactivityTimer = (morseToWatch: string) => {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current)

        inactivityTimer.current = window.setTimeout(() => {
            if (morseToWatch !== '') {
                const letter = morseMap[morseToWatch] || '?'
                setName(prev => {
                    const next = prev + letter
                    if (next.length >= 5) onChange(next)
                    return next
                })
                setCurrentMorse('')
            }
        }, 700)
    }

    const addSymbol = (symbol: '.' | '-') => {
        setCurrentMorse(prev => {
            const updated = prev + symbol
            restartInactivityTimer(updated)
            return updated
        })
    }

    const handleDown = (e?: React.MouseEvent | React.TouchEvent) => {
        e?.preventDefault()
        isDash.current = false
        if (pressTimer.current) clearTimeout(pressTimer.current)

        pressTimer.current = window.setTimeout(() => {
            isDash.current = true
            addSymbol('-')
        }, 300)
    }

    const handleUp = (e?: React.MouseEvent | React.TouchEvent) => {
        e?.preventDefault()
        if (pressTimer.current) clearTimeout(pressTimer.current)
        if (!isDash.current) addSymbol('.')
    }

    const handleReset = () => {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
        if (pressTimer.current) clearTimeout(pressTimer.current)
        setCurrentMorse('')
        setName('')
        onChange('')
    }

    useEffect(() => {
        return () => {
            if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
            if (pressTimer.current) clearTimeout(pressTimer.current)
        }
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontWeight: 600 }}>
                Username (enter in Morse)
                <a href="/morse.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', marginLeft: 4 }}>
                    Morse Table
                </a>
            </label>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ flex: 1, padding: 8, border: '1px solid #d1d5db', borderRadius: 6, minHeight: 20 }}>
                    {name}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <button
                        type="button"
                        onMouseDown={handleDown}
                        onMouseUp={handleUp}
                        onTouchStart={handleDown}
                        onTouchEnd={handleUp}
                        onClick={(e) => e.preventDefault()}
                        style={{ padding: '8px 12px', borderRadius: 6 }}
                    >
                        Morse
                    </button>
                </div>
            </div>

            <div style={{ fontSize: 12, color: '#6b7280' }}>Current Morse: {currentMorse}</div>

            {name.length > 0 && name.length < 5 && (
                <div style={{ textAlign: 'center', color: 'red', fontWeight: 600, marginTop: 4 }}>
                    Minimum of 5 characters
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
                <button
                    type="button"
                    onClick={handleReset}
                    style={{ padding: '6px 8px', borderRadius: 6 }}
                >
                    Clear
                </button>
            </div>
        </div>
    )


}
