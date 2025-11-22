import { useState } from 'react';
import Username from './Username';
import Password from './Password';
import Captcha from './captcha';
import RunawaySignInButton from './RunawaySingInButton';
import MorseInput from './morse';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);
    const [morseValid, setMorseValid] = useState(false);

    const performSubmit = () => {
        console.log('Submitted', { username, password });
        alert('Form submitted successfully!');
    };

    // Check if all requirements are met
    const canSubmit = username.trim() !== '' && password.trim() !== '' && captchaValid && morseValid;

    return (
        <div style={{ padding: 20 }}>
            <h1>Login</h1>
            <form style={{ display: 'grid', gap: 12, maxWidth: 700 }}>
                {/* Username */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }}>
                    <Username value={username} onChange={setUsername} />
                    <div style={{ fontSize: 12, color: '#666' }}>Enter your username</div>
                </div>

                {/* Password */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }}>
                    <Password value={password} onChange={setPassword} />
                    <div style={{ fontSize: 12, color: '#666' }}>Enter your password</div>
                </div>

                <hr />

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
    );
}
