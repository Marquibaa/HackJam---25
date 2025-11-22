// password component: controlled input used inside the single LoginForm page

type Props = {
    value: string
    onChange: (v: string) => void
}

export default function Password({ value, onChange }: Props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontWeight: 600 }}>Password</label>
            <input type="password" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Enter password" />
        </div>
    )
}
