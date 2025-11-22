import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import annoyingImage from '../assets/imagepopup.jpg'

interface AnnoyingPopupProps {
  onClose: () => void
}

const MARGIN = 8 // keep popup at least this many px away from viewport edges

const AnnoyingPopup: React.FC<AnnoyingPopupProps> = ({ onClose }) => {
  const popupRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [positionStyle, setPositionStyle] = useState<{ top: number; left: number }>({ top: 0, left: 0 })

  // Compute and set a random, clamped position for the popup so it never goes off-screen.
  const positionPopup = () => {
    const el = popupRef.current
    if (!el) return

    // Use getBoundingClientRect to get the actual rendered size (after fonts/images)
    const rect = el.getBoundingClientRect()
    const popupWidth = rect.width
    const popupHeight = rect.height

    const viewportW = window.innerWidth
    const viewportH = window.innerHeight

    // If popup is wider/taller than the viewport (or nearly so), clamp to margin so it remains fully visible.
    // Otherwise pick a random position within [MARGIN, max].
    const maxLeft = viewportW - popupWidth - MARGIN
    const maxTop = viewportH - popupHeight - MARGIN

    const left = maxLeft <= MARGIN ? MARGIN : Math.floor(Math.random() * (maxLeft - MARGIN + 1)) + MARGIN
    const top = maxTop <= MARGIN ? MARGIN : Math.floor(Math.random() * (maxTop - MARGIN + 1)) + MARGIN

    setPositionStyle({ top, left })
  }

  // Run once after first paint/layout. Also reposition when popup size changes or viewport resizes.
  useLayoutEffect(() => {
    positionPopup()

    // Use ResizeObserver to detect when popup content (image, fonts) changes size
    let ro: ResizeObserver | undefined
    try {
      if (popupRef.current && typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(() => {
          // reposition after layout change
          positionPopup()
        })
        ro.observe(popupRef.current)
      }
    } catch {
      // ResizeObserver not available or failed — ignore gracefully
    }

    const onResize = () => positionPopup()
    window.addEventListener('resize', onResize)
    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Reposition after the image has fully loaded (image size may change popup size)
  useEffect(() => {
    const img = imgRef.current
    if (!img) return
    const handleLoad = () => positionPopup()
    if (img.complete) {
      // image already loaded
      positionPopup()
    } else {
      img.addEventListener('load', handleLoad)
      return () => img.removeEventListener('load', handleLoad)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgRef.current])

  return (
    <div style={styles.overlay} role="dialog" aria-modal="true" aria-label="Annoying popup overlay">
      <div
        ref={popupRef}
        style={{
          ...styles.popup,
          top: positionStyle.top,
          left: positionStyle.left
        }}
      >
        <img
          ref={imgRef}
          src={annoyingImage}
          alt="Critical Warning"
          style={styles.popupImage}
          // onLoad handler is a fallback if ResizeObserver isn't supported
          onLoad={() => positionPopup()}
        />

        <h3 style={{ margin: '8px 0' }}>
          🛑 ATTENTION! This is a completely necessary pop-up that you must close to continue. Enjoy your
          stay!
        </h3>

        <button onClick={onClose} style={styles.closeButton} aria-label="Close annoying popup">
          I Understand (But I'm Still Annoyed)
        </button>
      </div>
    </div>
  )
}

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 10000,
    pointerEvents: 'auto'
  },
  popup: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    maxWidth: 350,
    width: '90%',
    border: '5px solid red',
    color: 'darkred',
    // No translate - we're setting absolute top/left directly
    // ensure the popup can wrap content and have its actual size measured
    boxSizing: 'border-box',
    touchAction: 'manipulation'
  },
  popupImage: {
    maxWidth: '100%',
    height: 'auto',
    margin: '0 auto 12px auto',
    display: 'block',
    border: '3px solid yellow'
  },
  closeButton: {
    marginTop: 12,
    padding: '8px 12px',
    backgroundColor: '#ff0000',
    color: 'white',
    border: '1px solid #aa0000',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14
  }
}

export default AnnoyingPopup