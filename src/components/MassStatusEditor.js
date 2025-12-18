// src/components/MassStatusEditor.js
import React, { useState } from 'react';
import './MassStatusEditor.css';

export default function MassStatusEditor({ technologies, onUpdateStatus }) {
  const [selectedTechIds, setSelectedTechIds] = useState([]);
  const [newStatus, setNewStatus] = useState('not-started');

  const handleSelectAll = () => {
    if (selectedTechIds.length === technologies.length) {
      setSelectedTechIds([]);
    } else {
      setSelectedTechIds(technologies.map(t => t.id));
    }
  };

  const handleApply = () => {
    if (selectedTechIds.length === 0) return;

    selectedTechIds.forEach(id => {
      onUpdateStatus(id, newStatus);
    });

    setSelectedTechIds([]); // Сбросить выделение
    alert(`Обновлено ${selectedTechIds.length} технологий`);
  };

  return (
    <div className="mass-status-editor">
      <h3>Массовое редактирование</h3>
      <div className="mass-edit-controls">
        <div className="select-all">
          <label>
            <input
              type="checkbox"
              checked={selectedTechIds.length === technologies.length && technologies.length > 0}
              onChange={handleSelectAll}
              aria-label="Выделить все технологии"
            />
            Выделить все ({technologies.length})
          </label>
        </div>

        <div className="status-selector">
          <label htmlFor="mass-status-select">Установить статус:</label>
          <select
            id="mass-status-select"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="not-started">Не начато</option>
            <option value="in-progress">В процессе</option>
            <option value="completed">Завершено</option>
          </select>
        </div>

        <button
          onClick={handleApply}
          disabled={selectedTechIds.length === 0}
          className="apply-btn"
        >
          Применить к выделенным ({selectedTechIds.length})
        </button>
      </div>

      <div className="selected-tech-list">
        {selectedTechIds.length > 0 && (
          <p>
            Выбрано: {selectedTechIds.map(id => {
              const tech = technologies.find(t => t.id === id);
              return tech ? tech.title : '';
            }).join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}