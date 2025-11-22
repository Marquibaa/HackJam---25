import { useEffect, useRef, useState } from 'react'

export default function Captcha() {
    const width = 320
    const height = 420
    const rows = 8
    const cols = 9
    const pegRadius = 4
    const startY = 20
    const bottomMargin = 60
    // bucket layout (left = Yes smaller, right = No larger)
    const bucketGap = width * 0.03
    // choose widths so they don't overlap but right remains larger
    const leftBucketWidth = width * 0.25
    const rightBucketWidth = width * 0.625
    const leftBucketX = bucketGap
    const rightBucketX = width - bucketGap - rightBucketWidth
    const bucketHeight = bottomMargin - 12
    const divideX = (leftBucketX + leftBucketWidth + rightBucketX) / 2
    const pegSpacingX = width / cols
    const rowGap = (height - bottomMargin - startY) / rows

    const [ballPos, setBallPos] = useState<{ x: number; y: number } | null>(null)
    const [animating, setAnimating] = useState(false)
    const [result, setResult] = useState<string | null>(null)
    const [verified, setVerified] = useState(false)
    const pathRef = useRef<Array<{ x: number; y: number }>>([])
    const startX = width / 2

    useEffect(() => {
        // initial ball resting position
        setBallPos({ x: startX, y: startY })
    }, [])

    function buildPath() {
        const path: Array<{ x: number; y: number }> = []
        let x = startX
        for (let r = 0; r < rows; r++) {
            const y = startY + (r + 0.5) * rowGap
            // choose left or right at each row
            // small bias toward the right (No) but not overwhelming
            const dir = Math.random() < 0.46 ? -1 : 1
            // horizontal shift magnitude: about half spacing plus small jitter
            const shift = (pegSpacingX / 2) * dir + (Math.random() - 0.5) * 6
            x = Math.max(12, Math.min(width - 12, x + shift))
            path.push({ x, y })
        }
        // final landing position somewhere in bottom area
        const finalY = height - 30
        // add a couple intermediate points toward bottom
        path.push({ x: x + (Math.random() - 0.5) * 10, y: height - bottomMargin / 2 })
        // small centered drift so final x is not strongly pushed right
        const drift = (Math.random() - 0.5) * 0.08 * width
        const finalX = Math.max(12, Math.min(width - 12, x + drift))
        path.push({ x: finalX, y: finalY })
        return path
    }

    useEffect(() => {
        if (!animating) return
        const path = pathRef.current
        if (!path || path.length === 0) return
        const totalDuration = 1400
        const start = performance.now()

        let raf = 0
        function step(now: number) {
            const t = Math.min(1, (now - start) / totalDuration)
            // map t to position along piecewise linear path
            const seg = t * (path.length - 1)
            const idx = Math.floor(seg)
            const frac = seg - idx
            const a = path[idx]
            const b = path[Math.min(path.length - 1, idx + 1)]
            const x = a.x + (b.x - a.x) * frac
            const y = a.y + (b.y - a.y) * frac
            setBallPos({ x, y })

            if (t < 1) {
                raf = requestAnimationFrame(step)
            } else {
                // finished
                setAnimating(false)
                // determine bucket using the actual bucket rectangles
                let res: string | null = null
                if (x >= leftBucketX && x <= leftBucketX + leftBucketWidth) res = 'Yes'
                else if (x >= rightBucketX && x <= rightBucketX + rightBucketWidth) res = 'No'
                else {
                    // fallback: choose nearest bucket center
                    const leftCenter = leftBucketX + leftBucketWidth / 2
                    const rightCenter = rightBucketX + rightBucketWidth / 2
                    res = Math.abs(x - leftCenter) < Math.abs(x - rightCenter) ? 'Yes' : 'No'
                }
                setResult(res)
                if (res === 'Yes') {
                    setVerified(true)
                }
            }
        }

        raf = requestAnimationFrame(step)
        return () => cancelAnimationFrame(raf)
    }, [animating])

    function releaseBall() {
        if (animating) return
        // ensure ball is at the top before starting
        setResult(null)
        setVerified(false)
        setBallPos({ x: startX, y: startY })
        const path = buildPath()
        // replace any previous path
        pathRef.current = path
        // ensure the effect sees the change: toggle animating in next frame
        setAnimating(false)
        requestAnimationFrame(() => setAnimating(true))
    }

    // Helper to immediately reset and start a new release (reliable, no timeouts)
    function tryAgain() {
        if (animating) return
        setResult(null)
        setVerified(false)
        setBallPos({ x: startX, y: startY })
        const path = buildPath()
        pathRef.current = path
        // ensure a fresh animating toggle so the useEffect picks up the new path
        setAnimating(false)
        requestAnimationFrame(() => setAnimating(true))
    }

    // Primary button behavior: acts as Release / Try again (if No) / Reset (if Yes)
    function primaryButtonAction() {
        if (animating) return
        if (result === 'No') {
            tryAgain()
            return
        }
        if (result === 'Yes') {
            // just reset so user can play again
            reset()
            return
        }
        // default: release
        releaseBall()
    }

    function reset() {
        setAnimating(false)
        setResult(null)
        setVerified(false)
        setBallPos({ x: startX, y: startY })
        // clear any planned path so a stale path cannot resume
        pathRef.current = []
    }

    // draw pegs grid
    const pegs: Array<{ x: number; y: number }> = []
    for (let r = 0; r < rows; r++) {
        const offset = (r % 2) * (pegSpacingX / 2)
        for (let c = 0; c < cols; c++) {
            const x = c * pegSpacingX + pegSpacingX / 2 + offset
            const y = startY + r * rowGap
            pegs.push({ x, y })
        }
    }

    return (
        <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 8, width: width }}>
            <h4 style={{ margin: '4px 0' }}>Are you human?</h4>

            {!verified ? (
                <>
                    <svg width={width} height={height} style={{ background: '#ffffffb3', borderRadius: 6 }}>
                        {/* pegs */}
                        {pegs.map((p, i) => (
                            <circle key={i} cx={p.x} cy={p.y} r={pegRadius} fill="#000000ff" />
                        ))}

                        {/* buckets (left = Yes smaller & neutral/uncolored) */}
                        <rect x={leftBucketX} y={height - bottomMargin + 6} width={leftBucketWidth} height={bucketHeight} fill="none" stroke="#94a3b8" />
                        <rect x={rightBucketX} y={height - bottomMargin + 6} width={rightBucketWidth} height={bucketHeight} fill="none" stroke="#94a3b8" />
                        <text x={leftBucketX + leftBucketWidth / 2} y={height - bottomMargin / 2 + 2} textAnchor="middle" fontSize={14} fill="#000000ff">Yes</text>
                        <text x={rightBucketX + rightBucketWidth / 2} y={height - bottomMargin / 2 + 2} textAnchor="middle" fontSize={14} fill="#000000ff">No</text>

                        {/* dividing line */}
                        <line x1={divideX} y1={height - bottomMargin} x2={divideX} y2={height} stroke="#000000ff" />

                        {/* ball */}
                        {ballPos && (
                            <circle cx={ballPos.x} cy={ballPos.y} r={10} fill="#f59e0b" stroke="#b45309" />
                        )}
                    </svg>

                    <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                        <button type="button" onClick={primaryButtonAction} disabled={animating} style={{ padding: '6px 10px' }}>
                            {animating ? 'Rolling...' : result === 'No' ? 'Try again' : result === 'Yes' ? 'Reset' : 'Release ball'}
                        </button>
                        <button type="button" onClick={reset} style={{ padding: '6px 10px' }}>
                            Reset
                        </button>
                        {animating && <span style={{ alignSelf: 'center' }}>Rolling...</span>}
                        {result && (
                            <span style={{ marginLeft: 'auto', fontWeight: 600, alignSelf: 'center' }}>
                                Result: {result}
                            </span>
                        )}
                    </div>
                </>
            ) : (
                <div style={{ padding: 24, textAlign: 'center' }}>
                    <h3 style={{ margin: 0, color: '#065f46' }}>You are human!</h3>
                </div>
            )}
        </div>
    )
}


