// src/components/ProgressBar.js
import React from 'react';
import './ProgressBar.css';

export default function ProgressBar({ progress, label, color = '#4CAF50', animated = true, height = 20 }) {
  return (
    <div className="progress-bar-container">
      {label && <div className="progress-label">{label}</div>}
      <div 
        className="progress-bar-bg"
        style={{ height: `${height}px`, backgroundColor: '#e0e0e0', borderRadius: '10px', overflow: 'hidden' }}
      >
        <div 
          className={`progress-bar-fill ${animated ? 'animated' : ''}`}
          style={{ 
            width: `${progress}%`, 
            height: '100%', 
            backgroundColor: color,
            transition: 'width 0.4s ease'
          }}
        ></div>
      </div>
      <div className="progress-percent">{progress}%</div>
    </div>
  );
}