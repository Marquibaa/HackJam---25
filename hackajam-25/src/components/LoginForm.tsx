import { useState, useEffect } from 'react'; // <-- ADDED useEffect
import Username from './Username'
import Password from './Password'
import Captcha from './captcha'
import MorseInput from './MorseInput'; // Assuming this is your Morse component
import RunawaySignInButton from './RunawaySingInButton'
import AnnoyingPopup from './AnnoyingPopup'; // <-- IMPORT the Pop-up Component

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);
    const [morseValid, setMorseValid] = useState(false);
    
    // <-- NEW: State to control the annoying pop-up visibility
    const [isPopupVisible, setIsPopupVisible] = useState(false); 

    // Logic to show the pop-up every 10 seconds
    useEffect(() => {
        const showPopup = () => {
            setIsPopupVisible(true);
        };

        // Set the interval to show the pop-up every 10 seconds (10000ms)
        const intervalId = setInterval(showPopup, 10000);

        // Cleanup function: essential to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Runs only once on mount

    // Handler to hide the pop-up when the user closes it
    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    const performSubmit = () => {
        if (!canSubmit) return
        console.log('Submitted', { username, password })
        alert('Form submitted successfully!')
    }

    // Check if all requirements are met
    const canSubmit = username.trim() !== '' && password.trim() !== '' && captchaValid && morseValid;

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

                    <Password value={password} onChange={setPassword} />

                    {/* Captcha */}
                    <div>
                        <h3>Captcha</h3>
                        <Captcha onValidChange={setCaptchaValid} />
                    </div>

                    {/* Morse Input */}
                    <div>
                        <h3>Morse Input</h3>
                        <MorseInput onValidChange={setMorseValid} />
                    </div>

                    {/* Sign In Button */}
                    <div style={{ marginTop: 12 }}>
                        <RunawaySignInButton
                            onSuccessfulClick={performSubmit}
                            disabled={!canSubmit} // disabled until all requirements are met
                        />
                    </div>
                </form>
            </div>
            
            {/* 💥 THE ANNOYING POP-UP 💥 */}
            {/* Renders when isPopupVisible is true, and passes the close handler */}
            {isPopupVisible && <AnnoyingPopup onClose={handleClosePopup} />}
            
        </div>
    );
}

function resetForm() {
    window.location.reload()
}