import React from 'react';

// Define the type for the component's props
interface AnnoyingPopupProps {
  onClose: () => void;
}

const AnnoyingPopup: React.FC<AnnoyingPopupProps> = ({ onClose }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h3>🛑 Attention! A new message has arrived!</h3>
        <p>This is a completely necessary pop-up that you must close to continue. Enjoy your stay!</p>
        {/* We make the button small and hard to click */}
        <button onClick={onClose} style={styles.closeButton}>
          Dismiss
        </button>
      </div>
    </div>
  );
};

// Basic CSS styles for the pop-up
const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed', // Stays in place when scrolling
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark semi-transparent background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Very high z-index to ensure it's on top of everything
  },
  popup: {
    backgroundColor: '#ffdddd', // Annoying color
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
    // Make the button slightly annoying (optional)
    fontSize: '10px',
  },
};

export default AnnoyingPopup;