import { useState } from "react";

export default function AnnoyingPassword() {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [message, setMessage] = useState("");

    const checkPasswords = (pw: string, cf: string) => {
        if (pw === "" || cf === "") {
            setMessage("");
            return;
        }

        const reversed = pw.split("").reverse().join("");

        if (cf === pw) {
            // They typed the same forward (wrong)
            setMessage("Second password should be typed backwards.");
        } else if (cf !== reversed) {
            // Still wrong, but not matching pw → mismatch
            setMessage("Passwords do not match.");
        } else {
            // They typed the reversed password correctly
            setMessage("Correct! (finally)");
        }
    };

    return (
        <div className="password-container">
            <div className="field-group">
                <label>Password:</label>
                <input
                    type="password"
                    className="password-input"
                    value={password}
                    onChange={(e) => {
                        const pw = e.target.value;
                        setPassword(pw);
                        checkPasswords(pw, confirm);
                    }}
                />
            </div>

            <div className="field-group">
                <label>Confirm Password:</label>
                <input
                    type="password"
                    className="password-input"
                    value={confirm}
                    onChange={(e) => {
                        const cf = e.target.value;
                        setConfirm(cf);
                        checkPasswords(password, cf);
                    }}
                />
            </div>

            {message && <div className="message">{message}</div>}
        </div>
    );
}
