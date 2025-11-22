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
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontWeight: 600 }}>Username</label>
            <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Enter username" />
        </div>
    )
}
