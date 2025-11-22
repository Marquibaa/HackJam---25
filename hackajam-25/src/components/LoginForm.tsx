import { useState } from 'react';
import Username from './Username'
import Password from './Password'
import Captcha from './captcha'
import RunawaySignInButton from './RunawaySingInButton'

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    const performSubmit = () => {
        if (!canSubmit()) return
        console.log('Submitted', { username, password })
        alert('Form submitted successfully!')
    }

    function canSubmit() {
        return username.trim() !== '' && password.trim() !== ''
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

                    <Password value={password} onChange={setPassword} />

                    <div>
                        <Captcha />
                    </div>

                    {/* Morse is handled inside Username */}

                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <RunawaySignInButton onSuccessfulClick={performSubmit} disabled={!canSubmit()} />
                        <button type="button" onClick={resetForm} style={{ padding: '8px 12px', borderRadius: 6 }}>
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function resetForm() {
    window.location.reload()
}
