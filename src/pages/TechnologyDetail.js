// src/pages/TechnologyDetail.js
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies'; // ✅
import './Page.css';

export default function TechnologyDetail() {
  const { techId } = useParams();
  const navigate = useNavigate();
  const { technologies, updateStatus, updateNotes, deleteTechnology } = useTechnologies(); // ✅

  const technology = technologies.find(t => t.id === parseInt(techId));

  if (!technology) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <p>Технология с ID {techId} не существует.</p>
        <Link to="/technologies" className="btn">
          ← Назад к списку
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Удалить технологию "${technology.title}"?`)) {
      deleteTechnology(parseInt(techId)); // ✅
      navigate('/technologies');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">
          ← Назад к списку
        </Link>
        <h1>{technology.title}</h1>
      </div>

      <div className="technology-detail">
        <div className="detail-section">
          <h3>Описание</h3>
          <p>{technology.description}</p>
        </div>

        <div className="detail-section">
          <h3>Статус изучения</h3>
          <div className="status-buttons">
            <button
              onClick={() => updateStatus(parseInt(techId), 'not-started')}
              className={technology.status === 'not-started' ? 'active' : ''}
            >
              Не начато
            </button>
            <button
              onClick={() => updateStatus(parseInt(techId), 'in-progress')}
              className={technology.status === 'in-progress' ? 'active' : ''}
            >
              В процессе
            </button>
            <button
              onClick={() => updateStatus(parseInt(techId), 'completed')}
              className={technology.status === 'completed' ? 'active' : ''}
            >
              Завершено
            </button>
          </div>
        </div>

        <div className="detail-section">
          <h3>Мои заметки</h3>
          <textarea
            value={technology.notes}
            onChange={(e) => updateNotes(parseInt(techId), e.target.value)}
            placeholder="Записывайте сюда важные моменты..."
            rows="4"
          />
        </div>

        <div className="detail-section">
          <h3>Действия</h3>
          <button onClick={handleDelete} className="btn btn-danger">🗑 Удалить технологию</button>
        </div>
      </div>
    </div>
  );
}