import React, { useEffect } from 'react';

type Props = {
    value: string
    onChange: (v: string) => void
    onValidChange?: (v: boolean) => void
}

export default function EmailChecker({ value, onChange, onValidChange }: Props) {
    const lowerVal = value.toLowerCase();

    // --- VARIABLES ---
    const hasAt = lowerVal.includes('@');
    const hasDot = lowerVal.includes('.');
    const isYahoo = lowerVal.includes('yahoo');
    const isYahooDomainComplete = lowerVal.endsWith('@yahoo.com');

    // localPart is the part before the '@' (if present). Only used for the step checks
    const localPart = hasAt ? lowerVal.split('@')[0] : '';

    // Define the required pattern: 2 letters, then 2 digits, then 1 special character
    const RE_LETTERS = /^[a-z]{2}$/;
    const RE_NEXT_TWO_NUMS = /^[0-9]{2}$/;
    const RE_SPECIAL = /[^a-z0-9]/; // any non-alphanumeric char (after lowercasing letters a-z)

    // Deterministic final validation for parent: exactly 2 letters + 2 digits + 1 special char
    const LOCAL_PART_COMPLETE_RE = /^[a-z]{2}[0-9]{2}[^a-z0-9]$/;
    const isEmailComplete = isYahooDomainComplete && LOCAL_PART_COMPLETE_RE.test(localPart);

    // notify parent when completion state changes
    useEffect(() => {
        if (typeof onValidChange === 'function') {
            onValidChange(isEmailComplete);
        }
    }, [isEmailComplete, onValidChange]);

    // --- LOGIC HIERARCHY ---

    // 1. Domain Error (Red)
    // Shows if they typed an email format (@ and .) but it's NOT yahoo
    const showDomainError = hasAt && hasDot && !isYahoo;

    // When the user has completed the domain @yahoo.com we start showing progressive checks
    let stepMessage: { text: string; color: string } | null = null;
    if (isYahooDomainComplete) {
        const name = localPart; // part before @

        // If they typed more than the expected pattern ( > 5 ) it's an error
        if (name.length > 5) {
            stepMessage = { text: 'Local part is too long. Expected exactly: 2 letters, 2 numbers, 1 special character.', color: 'red' };
        } else {
            // Step 1: need 2 letters
            if (name.length < 2) {
                stepMessage = { text: 'Enter 2 letters (a-z) for the start of your email name.', color: 'red' };
            } else {
                // check first two chars are letters
                const firstTwo = name.slice(0, 2);
                if (!RE_LETTERS.test(firstTwo)) {
                    stepMessage = { text: 'The first two characters must be letters (a-z).', color: 'red' };
                } else {
                    // Step 2: after 2 letters need 2 numbers
                    if (name.length < 4) {
                        // If they've started the number part but included non-digits, show error
                        const nextPart = name.slice(2);
                        if (nextPart.length > 0 && !/^[0-9]*$/.test(nextPart)) {
                            stepMessage = { text: 'The next two characters must be numbers (0-9).', color: 'red' };
                        } else {
                            stepMessage = { text: 'Now enter 2 numbers after the letters.', color: 'red' };
                        }
                    } else {
                        // name length is 4 or more, check the two numbers
                        const twoNums = name.slice(2, 4);
                        if (!RE_NEXT_TWO_NUMS.test(twoNums)) {
                            stepMessage = { text: 'The third and fourth characters must be digits (0-9).', color: 'red' };
                        } else {
                            // Step 3: after letters+numbers need 1 special character
                            if (name.length < 5) {
                                stepMessage = { text: 'Now add one special character after the numbers (e.g. !, #, $, %).', color: 'red' };
                            } else {
                                // Exactly 5 characters: check that the last one is special
                                const lastChar = name.charAt(4);
                                if (!RE_SPECIAL.test(lastChar)) {
                                    stepMessage = { text: 'The last character must be a special character (not a letter or number).', color: 'red' };
                                } else {
                                    // Success
                                    stepMessage = { text: 'Good job :)', color: 'brown' };
                                }
                            }
                        }
                    }
                }
            }
        }
    }

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

            {/* PROGRESSIVE STEP MESSAGES (shown only when domain is complete) */}
            {isYahooDomainComplete && stepMessage && (
                <div style={{ color: stepMessage.color, fontWeight: 'bold', fontSize: '14px', marginTop: '4px' }}>
                    {stepMessage.text}
                </div>
            )}
        </div>
    )
}