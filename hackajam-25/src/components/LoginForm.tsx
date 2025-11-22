import { useState, useEffect } from 'react'; // ADDED useEffect
import Username from './Username'
import Password from './Password'
import Captcha from './captcha'
import RunawaySignInButton from './RunawaySingInButton'
import AnnoyingPopup from './AnnoyingPopup'; // ADDED AnnoyingPopup
import EmailChecker from './Email'


//
export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [email, setEmail] = useState('')
    const [captchaVerified, setCaptchaVerified] = useState(false)
    
    // ADDED: State for pop-up visibility
    const [isPopupVisible, setIsPopupVisible] = useState(false); 

    // ADDED: Timer logic to show pop-up every 10 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsPopupVisible(true);
        }, 10000); 
        return () => clearInterval(intervalId);
    }, []); 

    // ADDED: Handler to hide the pop-up
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

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }}>

			         <div>

			            <EmailChecker value={email} onChange={setEmail} />

			         </div>

			            <div style={{ alignSelf: 'start' }}>

			                 <div style={{ fontSize: 12, color: '#666' }}>Put ur email here buddy boy</div>

			            </div>

			     </div>

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
            
            {/* ADDED: Conditionally render the pop-up */}
            {isPopupVisible && <AnnoyingPopup onClose={handleClosePopup} />}
            
        </div>
    );
}

function resetForm() {
    window.location.reload()
}