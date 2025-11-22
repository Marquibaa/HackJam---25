import React, { useState, useEffect } from 'react';
// 1. IMPORT THE IMAGE: The path is relative from src/components/ to src/assets/
import annoyingImage from '../assets/imagepopup.jpg'; 

interface AnnoyingPopupProps {
  onClose: () => void;
}

const AnnoyingPopup: React.FC<AnnoyingPopupProps> = ({ onClose }) => {
  const [positionStyle, setPositionStyle] = useState({});

  // Function to calculate a random position
  const calculateRandomPosition = () => {
    // Generate random values for top and left percentages (5% to 85%)
    const randomTop = Math.floor(Math.random() * 80) + 5; 
    const randomLeft = Math.floor(Math.random() * 80) + 5; 

    return {
      top: `${randomTop}%`,
      left: `${randomLeft}%`,
      // Centers the element based on its own dimensions
      transform: 'translate(-50%, -50%)', 
    };
  };

  // Set the random position when the component mounts (when it appears)
  useEffect(() => {
    setPositionStyle(calculateRandomPosition());
  }, []); 

  // Merge the calculated random position with the fixed base styles
  const mergedPopupStyle = { ...styles.popup, ...positionStyle };
  
  return (
    <div style={styles.overlay}> 
      <div style={mergedPopupStyle}>
        
        {/* 2. USE THE IMAGE: Insert the img tag */}
        <img 
            src={annoyingImage} 
            alt="Critical Warning" 
            style={styles.popupImage} 
        />
        
        <h3>🛑 ATTENTION! This is a completely necessary pop-up that you must close to continue. Enjoy your stay!</h3>
        
        
        <button onClick={onClose} style={styles.closeButton}>
            I Understand (But I'm Still Annoyed)
        </button>
      </div>
    </div>
  );
};

// Basic CSS styles
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
    position: 'absolute', // Allows random top/left positioning
    backgroundColor: '#ffffffff', // Annoying light red color
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    maxWidth: '350px',
    width: '90%',
    border: '5px solid red',
    color: 'darkred',
  },
  popupImage: { // 3. STYLE THE IMAGE
    width: '300px', 
    height: 'auto', 
    margin: '0 auto 15px auto', 
    display: 'block', 
    // You can add annoying CSS here, like a flashing border
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