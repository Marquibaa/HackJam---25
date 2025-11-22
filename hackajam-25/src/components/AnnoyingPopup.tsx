import React, { useState, useEffect } from 'react';
import annoyingImage from '../assets/imagepopup.jpg'; 

interface AnnoyingPopupProps {
  onClose: () => void;
}

const AnnoyingPopup: React.FC<AnnoyingPopupProps> = ({ onClose }) => {
  const [positionStyle, setPositionStyle] = useState({});

  const calculateRandomPosition = () => {
    const randomTop = Math.floor(Math.random() * 80) + 5; 
    const randomLeft = Math.floor(Math.random() * 80) + 5; 

    return {
      top: `${randomTop}%`,
      left: `${randomLeft}%`,
      transform: 'translate(-50%, -50%)', 
    };
  };

  useEffect(() => {
    setPositionStyle(calculateRandomPosition());
  }, []); 

  const mergedPopupStyle = { ...styles.popup, ...positionStyle };
  
  return (
    <div style={styles.overlay}> 
      <div style={mergedPopupStyle}>
        
        <img 
            src={annoyingImage} 
            alt="Critical Warning" 
            style={styles.popupImage} // Style applied here
        />
        
        {/* Original text content, kept the same */}
        <h3>🛑 Attention! A new message has arrived!</h3>
        <p>This is a completely necessary pop-up that you must close to continue. Enjoy your stay!</p>
        
        <button onClick={onClose} style={styles.closeButton}>
            Dismiss
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    zIndex: 1000,