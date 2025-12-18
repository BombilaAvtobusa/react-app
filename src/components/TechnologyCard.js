import React from 'react';
import './TechnologyCard.css';

export default function TechnologyCard({ 
  technology, 
  onStatusChange, 
  onNotesChange 
}) {
  const { id, title, description, status, notes, category } = technology;

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
  const noteValue = notes || '';

  return (
    <div 
      className={`technology-card status-${status}`}
      onClick={() => onStatusChange(id, status === 'not-started' ? 'in-progress' : status === 'in-progress' ? 'completed' : 'not-started')}
    >
      <h3 className="tech-card__title">{title}</h3>
      <p className="tech-card__description">{description}</p>
      <span className="tech-card__status">
        {display.icon} {display.text}
      </span>
      {category && <div className="tech-category">{category}</div>}

      {/* Заметки */}
      <div className="notes-section">
        <h4>Мои заметки:</h4>
        <textarea
          value={noteValue}
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