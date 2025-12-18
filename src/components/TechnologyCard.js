import React from 'react';
import './TechnologyCard.css';

export default function TechnologyCard({ 
  id, 
  title, 
  description, 
  status, 
  notes, 
  onStatusChange, 
  onNotesChange 
}) {
  // ГАРАНТИРУЕМ, что notes — строка
  const noteValue = typeof notes === 'string' ? notes : '';

  const handleNoteChange = (e) => {
    onNotesChange(id, e.target.value);
  };

  const getStatusDisplay = () => {
    switch (status) {
      case 'completed': return { text: 'Завершено', icon: '✓' };
      case 'in-progress': return { text: 'В процессе', icon: '🔄' };
      case 'not-started': return { text: 'Не начато', icon: '⏳' };
      default: return { text: status, icon: '?' };
    }
  };

  const display = getStatusDisplay();

  return (
    <div 
      className={`technology-card status-${status}`}
      onClick={() => onStatusChange(id)}
    >
      <h3 className="tech-card__title">{title}</h3>
      <p className="tech-card__description">{description}</p>
      <span className="tech-card__status">
        {display.icon} {display.text}
      </span>

      {/* Заметки */}
      <div className="notes-section">
        <h4>Мои заметки:</h4>
        <textarea
          value={noteValue}             // ← безопасное значение
          onChange={handleNoteChange}
          placeholder="Записывайте сюда важные моменты..."
          rows="3"
          className="notes-textarea"
        />
        <div className="notes-hint">
          {noteValue.length > 0 ? `Заметка (${noteValue.length} символов)` : 'Добавьте заметку'}
        </div>
      </div>
    </div>
  );
}