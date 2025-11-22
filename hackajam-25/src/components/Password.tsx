import { useState, useEffect } from "react";

interface PasswordProps {
    value: string;
    onChange: (v: string) => void;
    onValidChange?: (valid: boolean) => void;
}

export default function AnnoyingPassword({ value, onChange, onValidChange }: PasswordProps) {
    const [confirm, setConfirm] = useState("");
    const [message, setMessage] = useState("");
    const [isValid, setIsValid] = useState(false);

    const checkPasswords = (pw: string, cf: string) => {
        if (pw === "" || cf === "") {
            setMessage("");
            setIsValid(false);
            return;
        }

        const reversed = pw.split("").reverse().join("");

        if (cf === pw) {
            // They typed the same forward (wrong)
            setMessage("Second password should be typed backwards.");
            setIsValid(false);
        } else if (cf !== reversed) {
            // Still wrong, but not matching pw → mismatch
            setMessage("Passwords do not INVERSELY match.");
            setIsValid(false);
        } else {
            // They typed the reversed password correctly
            setMessage("Correct! (finally)");
            setIsValid(true);
        }
    };

    useEffect(() => {
        checkPasswords(value, confirm);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, confirm]);

    useEffect(() => {
        if (onValidChange) onValidChange(isValid);
    }, [isValid, onValidChange]);

    return (
        <div className="password-container">
            <div className="field-group">
                <label>Password:</label>
                <input
                    type="password"
                    className="password-input"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>

            <div className="field-group">
                <label>Confirm Password:</label>
                <input
                    type="password"
                    className="password-input"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                />
            </div>

            {message && <div className="message">{message}</div>}
        </div>
    );
}
