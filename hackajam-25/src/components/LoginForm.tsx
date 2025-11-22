import { useState } from 'react'
import Username from './Username'
import Password from './Password'
import Captcha from './captcha'
import RunawaySignInButton from './RunawaySingInButton'
import MorseInput from './morse'

export default function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = (e: any) => {
        e.preventDefault()
        performSubmit()
    }

    // Separate action for programmatic triggers (buttons calling submit without an event)
    const performSubmit = () => {
        console.log('submit', { username, password })
        alert('Submitted (demo)')
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>Login</h1>
            <form onSubmit={submit} style={{ display: 'grid', gap: 12, maxWidth: 700 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }}>
                    <div>
                        <Username value={username} onChange={setUsername} />
                    </div>
                    <div style={{ alignSelf: 'start' }}>
                        <div style={{ fontSize: 12, color: '#666' }}>Username component (worked separately)</div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }}>
                    <div>
                        <Password value={password} onChange={setPassword} />
                    </div>
                    <div style={{ alignSelf: 'start' }}>
                        <div style={{ fontSize: 12, color: '#666' }}>Password component (worked separately)</div>
                    </div>
                </div>

                <hr />

                <div>
                    <h3>Component previews</h3>
                    <div style={{ display: 'grid', gap: 12 }}>
                        <div>
                            <strong>Captcha</strong>
                            <Captcha />
                        </div>

                        <div>
                            <strong>Morse Input</strong>
                            <MorseInput />
                        </div>

                        <div style={{ marginTop: 12 }}>
                            <RunawaySignInButton 
                            onSuccessfulClick={performSubmit} 
                            disabled={!canSubmit()}
/>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
