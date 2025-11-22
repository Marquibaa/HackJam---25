import { useState, useEffect } from 'react'; // <-- ADDED useEffect
import Username from './Username'
import Password from './Password'
import Captcha from './captcha'
import RunawaySignInButton from './RunawaySingInButton'
import AnnoyingPopup from './AnnoyingPopup'; // <-- IMPORT the Pop-up Component

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false)
    
    // 1. POP-UP STATE: State to control the annoying pop-up visibility
    const [isPopupVisible, setIsPopupVisible] = useState(false); 

    // 2. POP-UP TIMER LOGIC: Effect to handle the 10-second interval
    useEffect(() => {
        const showPopup = () => {
            setIsPopupVisible(true);
        };

        // Set the interval to show the pop-up every 10 seconds (10000ms)
        const intervalId = setInterval(showPopup, 10000);

        // Cleanup function: essential to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Runs only once on mount

    // 3. POP-UP CLOSE HANDLER
    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    const performSubmit = () => {
        if (!canSubmit()) return
        console.log('Submitted', { username, password })
        alert('Form submitted successfully!')
    }

    function canSubmit() {
        // require username, non-empty password, captcha, and inverse-match validity
        return username.trim() !== '' && password.trim() !== '' && captchaVerified && passwordValid
    }

    return (
        <div style={{ padding: 20, display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 520, border: '1px solid #e5e7eb', borderRadius: 8, padding: 20 }}>
                <h2 style={{ margin: '0 0 12px 0' }}>Sign in</h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        performSubmit()
                    }}
                    style={{ display: 'grid', gap: 16 }}
                >
                    <Username value={username} onChange={setUsername} />

                    <Password value={password} onChange={setPassword} onValidChange={setPasswordValid} />

                    <div>
                        <Captcha onValidChange={setCaptchaVerified} />
                    </div>

                    {/* Morse is handled inside Username */}

                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        {canSubmit() ? (
                            <RunawaySignInButton onSuccessfulClick={performSubmit} disabled={false} />
                        ) : (
                            <button type="button" disabled style={{ padding: '8px 14px', borderRadius: 6, opacity: 0.6 }}>
                                Sign in (locked)
                            </button>
                        )}
                        <button type="button" onClick={resetForm} style={{ padding: '8px 12px', borderRadius: 6 }}>
                            Reset
                        </button>
                    </div>
                </form>
            </div>
            
            {/* 4. RENDER POP-UP: Renders when isPopupVisible is true */}
            {isPopupVisible && <AnnoyingPopup onClose={handleClosePopup} />}
            
        </div>
    );
}

function resetForm() {
    window.location.reload()
}