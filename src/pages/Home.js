// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import RoadmapImporter from '../components/RoadmapImporter';
import './Page.css';

export default function Home() {
  const { technologies, loading, error, refetch, progress } = useTechnologiesApi();

  if (loading) {
    return (
      <div className="page loading">
        <div className="spinner"></div>
        <p>Загрузка технологий...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page error">
        <h2>Ошибка при загрузке технологий</h2>
        <p>{error}</p>
        <button onClick={refetch} className="btn btn-primary">Попробовать снова</button>
      </div>
    );
  }

  const completed = technologies.filter(t => t.status === 'completed').length;

  return (
    <div className="page">
      <div className="page-header">
        <h1>🚀 Трекер изучения технологий</h1>
      </div>

      <RoadmapImporter />

      <div className="dashboard">
        <div className="stat-card">
          <h3>Общий прогресс</h3>
          <p>{progress}% завершено</p>
        </div>

        <div className="stat-card">
          <h3>Всего технологий</h3>
          <p>{technologies.length}</p>
        </div>

        <div className="stat-card">
          <h3>Завершено</h3>
          <p>{completed}</p>
        </div>
      </div>

      <div className="home-actions">
        <Link to="/technologies" className="btn btn-primary">
          Смотреть технологии
        </Link>
        <Link to="/add-technology" className="btn btn-secondary">
          Добавить технологию
        </Link>
      </div>
    </div>
  );
}