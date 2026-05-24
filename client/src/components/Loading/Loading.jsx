import './Loading.css';
import { useEffect, useState } from 'react';

export default function Loading({
  message, showServerMessage = true, 
  size = '100px', color = '#0364ff', 
  verticalOffset = '0px'
}) {
  const serverMessage = 'Servers are waking up — this can take up to a minute. Thank you for your patience!';
  const [loadTime, setLoadTime] = useState(0);

  // ----- EFFECTS ------
  // Increment loadTime every second
  useEffect(() => {
  // Skip if not showing server message
  if (!showServerMessage) return;
  
  const interval = setInterval(() => {
    setLoadTime((prev) => prev + 1);
  }, 1000);

  return () => clearInterval(interval);
}, [showServerMessage]);

  // ----- RENDER -----
  return (
    // Main loading container
    <div className={`loading-container`} style={{marginTop: verticalOffset}}>

      {/* Loading spinner with custom styles */}
      <div
        className="loading-spinner"
        style={{
          width: size,
          height: size,
          borderTopColor: color,
        }}
      />

      {/* Messages */}
      {message && (<p className="loading-message">{message}</p>)}

      {/* Show the server message if load time exceeds 5 seconds */}
      {showServerMessage && loadTime > 5 && (<p className="loading-message">{serverMessage}</p>)}
    </div>
  );
}