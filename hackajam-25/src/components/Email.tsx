import React from 'react';



type Props = {

    value: string

    onChange: (v: string) => void

}



export default function EmailChecker({ value, onChange }: Props) {

    const lowerVal = value.toLowerCase();

    

    // --- VARIABLES ---

    const hasAt = lowerVal.includes('@');

    const hasDot = lowerVal.includes('.'); 

    const isYahoo = lowerVal.includes('yahoo');

    const isYahooDomainComplete = lowerVal.endsWith('@yahoo.com');

    

    // Calculate length of the name (part before @)

    const localPart = hasAt ? lowerVal.split('@')[0] : '';

    const isTooLong = localPart.length > 2;



    // --- LOGIC HIERARCHY ---



    // 1. Domain Error (Red)

    // Shows if they typed an email format (@ and .) but it's NOT yahoo

    const showDomainError = hasAt && hasDot && !isYahoo;



    // 2. Length Error (Red)

    // Only shows if they finished the yahoo part (@yahoo.com) BUT name is too long

    const showLengthError = isYahooDomainComplete && isTooLong;



    // 3. Cooking/Success (Brown)

    // Only shows if they finished the yahoo part (@yahoo.com) AND the name is short enough

    const showCooking = isYahooDomainComplete && !isTooLong;



    return (

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>

            <label style={{ fontWeight: 600 }}>Email</label>

            

            <input 

                type="text" 

                value={value} 

                onChange={(e) => onChange(e.target.value)} 

                placeholder="Enter email"

                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 

            />



            {/* MESSAGE 1: DOMAIN ERROR */}

            {showDomainError && (

                <div style={{ color: 'red', fontWeight: 'bold', fontSize: '14px', marginTop: '4px' }}>

                    <div>We only accept yahoo emails.</div>

                </div>

            )}



            {/* MESSAGE 2: LENGTH ERROR */}

            {showLengthError && (

                <div style={{ color: 'red', fontWeight: 'bold', fontSize: '14px', marginTop: '4px' }}>

                    Maximum email length is 2 letters.

                </div>

            )}



            {/* MESSAGE 3: SUCCESS */}

            {showCooking && (

                <div style={{ color: 'brown', fontWeight: 'bold', fontSize: '14px', marginTop: '4px' }}>

                    Good job :)

                </div>

            )}

        </div>

    )

}