// src/components/TechnologyCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './TechnologyCard.css';

export default function TechnologyCard({ 
  technology, 
  onStatusChange, 
  onNotesChange,
  onDelete // ✅
}) {
  const { id, title, description, status, notes, category } = technology;

  const handleStatusClick = () => {
    let newStatus = 'not-started';
    if (status === 'not-started') newStatus = 'in-progress';
    else if (status === 'in-progress') newStatus = 'completed';
    else if (status === 'completed') newStatus = 'not-started';

    onStatusChange(id, newStatus);
  };

  const handleNoteChange = (e) => {
    onNotesChange(id, e.target.value);
  };

  const handleDelete = () => {
    if (window.confirm(`Удалить технологию "${title}"?`)) {
      onDelete(id);
    }
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
    <div className={`technology-card status-${status}`}>
      <div className="card-header">
        <h3 className="tech-card__title">{title}</h3>
        <button className="delete-btn" onClick={handleDelete} aria-label="Удалить технологию">🗑</button>
      </div>

      <p className="tech-card__description">{description}</p>

      <div className="status-section" onClick={handleStatusClick} style={{ cursor: 'pointer' }}>
        <span className="tech-card__status">
          {display.icon} {display.text}
        </span>
      </div>

      {category && <div className="tech-category">{category}</div>}

      {/* Заметки */}
      <div className="notes-section">
        <h4>Мои заметки:</h4>
        <textarea
          value={noteValue}
          onChange={handleNoteChange}
          placeholder="Записывайте сюда важные моменты..."
          rows="2"
          className="notes-textarea"
        />
        <div className="notes-hint">
          {noteValue.length > 0 ? `Заметка (${noteValue.length} символов)` : 'Добавьте заметку'}
        </div>
      </div>

      <div className="card-actions">
        <Link to={`/technology/${id}`} className="btn-link">
          Подробнее →
        </Link>
      </div>
    </div>
  );
}