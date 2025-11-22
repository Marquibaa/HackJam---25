import React, { useState, useEffect, useRef } from 'react';
import annoyingImage from '../assets/imagepopup.jpg'; 

interface AnnoyingPopupProps {
  onClose: () => void;
}

const AnnoyingPopup: React.FC<AnnoyingPopupProps> = ({ onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [positionStyle, setPositionStyle] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!popupRef.current) return;

    const popupWidth = popupRef.current.offsetWidth;
    const popupHeight = popupRef.current.offsetHeight;

    // Prevent going out of screen
    const maxLeft = window.innerWidth - popupWidth;
    const maxTop = window.innerHeight - popupHeight;

    const randomLeft = Math.random() * maxLeft;
    const randomTop = Math.random() * maxTop;

    setPositionStyle({
      top: randomTop,
      left: randomLeft
    });
  }, []);

  return (
    <div style={styles.overlay}> 
      <div ref={popupRef} style={{ ...styles.popup, ...positionStyle }}>
        
        <img 
            src={annoyingImage} 
            alt="Critical Warning" 
            style={styles.popupImage} 
        />
        
        {/* YOUR SAME TEXT — UNCHANGED */}
        <h3>🛑 ATTENTION! This is a completely necessary pop-up that you must close to continue. Enjoy your stay!</h3>
        
        <button onClick={onClose} style={styles.closeButton}>
            I Understand (But I'm Still Annoyed)
        </button>
      </div>
    </div>
  );
};

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    zIndex: 1000, 
  },
  popup: {
    position: 'absolute',
    backgroundColor: '#ffffffff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    maxWidth: '350px',
    width: '90%',
    border: '5px solid red',
    color: 'darkred',

    // 🚨 IMPORTANT CHANGE: removed translate(-50%, -50%)
  },
  popupImage: { 
    width: '300px', 
    height: 'auto', 
    margin: '0 auto 15px auto', 
    display: 'block',
    border: '3px solid yellow', 
  },
  closeButton: {
    marginTop: '20px',
    padding: '5px 10px',
    backgroundColor: '#ff0000',
    color: 'white',
    border: '1px solid #aa0000',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '10px',
  },
};

export default AnnoyingPopup;
