import React, { useState, useEffect } from 'react';

interface AnnoyingPopupProps {
  onClose: () => void;
}

const AnnoyingPopup: React.FC<AnnoyingPopupProps> = ({ onClose }) => {
  // State to hold the random position (e.g., {top: '10%', left: '50%'})
  const [positionStyle, setPositionStyle] = useState({});

  // Function to calculate a random position
  const calculateRandomPosition = () => {
    // Generate random values for top and left percentages
    // We use a range (e.g., 5% to 85%) to ensure the pop-up stays visible on the screen.
    const randomTop = Math.floor(Math.random() * 80) + 5; // 5% to 85%
    const randomLeft = Math.floor(Math.random() * 80) + 5; // 5% to 85%

    return {
      top: `${randomTop}%`,
      left: `${randomLeft}%`,
      // Add a transform to center the element based on its dimensions, 
      // ensuring the pop-up is fully visible at the random coordinate.
      transform: 'translate(-50%, -50%)', 
    };
  };

  // Set the random position when the component mounts (when it appears)
  useEffect(() => {
    setPositionStyle(calculateRandomPosition());
  }, []); 

  // Merge the calculated random position with the fixed base styles
  const mergedPopupStyle = { ...styles.popup, ...positionStyle };
  
  // NOTE: We keep the overlay fixed, but the actual popup div moves
  return (
    <div style={styles.overlay}> 
      <div style={mergedPopupStyle}>
        <h3>🛑 Attention! A new message has arrived! This is a completely necessary pop-up that you must close to continue. Enjoy your stay!</h3>
        <button onClick={onClose} style={styles.closeButton}>
          Dismiss and Find Me Again Later
        </button>
      </div>
    </div>
  );
};

// Basic CSS styles for the pop-up and its overlay
const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    zIndex: 1000, 
    // The overlay covers the whole screen, but we don't center the content here,
    // as the inner 'popup' element handles its own positioning.
  },
  popup: {
    position: 'absolute', // Crucial: Allows us to set top/left properties
    backgroundColor: '#ffdddd', 
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '90%',
    border: '5px solid red',
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