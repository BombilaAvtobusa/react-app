import React from 'react';
import './ProgressHeader.css';

export default function ProgressHeader({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-header">
      <h2>Ваш прогресс</h2>
      <p>Готово: <strong>{completed}</strong> из <strong>{total}</strong></p>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      
      <p className="progress-percent">{percent}%</p>
    </div>
  );
}