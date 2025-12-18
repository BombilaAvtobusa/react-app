import React from 'react';

export default function QuickActions({ onMarkAllCompleted, onResetAll, onRandomNext }) {
  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <button onClick={onMarkAllCompleted} style={{ margin: '0 8px' }}>✅ Все готово</button>
      <button onClick={onResetAll} style={{ margin: '0 8px' }}>🔄 Сбросить</button>
      <button onClick={onRandomNext} style={{ margin: '0 8px' }}>🎲 Случайно</button>
    </div>
  );
}