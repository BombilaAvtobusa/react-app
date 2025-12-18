// src/App.js
import React, { useState } from 'react';
import useTechnologies from './hooks/useTechnologies';
import ProgressBar from './components/ProgressBar';
import TechnologyCard from './components/TechnologyCard';
import QuickActions from './components/QuickActions';
import './App.css';

function App() {
  const { technologies, updateStatus, updateNotes, progress } = useTechnologies();

  // Фильтры и поиск
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Фильтрация с поиском
  const filtered = technologies
    .filter(tech => {
      if (filter !== 'all' && tech.status !== filter) return false;
      return true;
    })
    .filter(tech => {
      const query = searchQuery.toLowerCase();
      return (
        tech.title.toLowerCase().includes(query) ||
        tech.description.toLowerCase().includes(query)
      );
    });

  // === Quick Actions ===
  const markAllCompleted = () => {
    technologies.forEach(tech => updateStatus(tech.id, 'completed'));
  };

  const resetAll = () => {
    technologies.forEach(tech => updateStatus(tech.id, 'not-started'));
  };

  const randomNext = () => {
    const notStarted = technologies.filter(t => t.status === 'not-started');
    if (notStarted.length > 0) {
      const random = notStarted[Math.floor(Math.random() * notStarted.length)];
      updateStatus(random.id, 'in-progress');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Трекер изучения технологий</h1>
        <ProgressBar 
          progress={progress}
          label="Общий прогресс"
          color="#4CAF50"
          animated={true}
          height={20}
        />
      </header>

      <QuickActions
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAll}
        technologies={technologies} // ← передаём технологии для экспорта
      />

      {/* 🔥 Поиск */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск технологий..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span>Найдено: {filtered.length}</span>
      </div>

      {/* Фильтры */}
      <div className="filters">
        {['all', 'not-started', 'in-progress', 'completed'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={filter === f ? 'active' : ''}>
            {f === 'all' ? 'Все' : f === 'not-started' ? 'Не начато' : f === 'in-progress' ? 'В процессе' : 'Выполнено'}
          </button>
        ))}
      </div>

      <main className="tech-list">
        {filtered.length === 0 ? (
          <p>Нет технологий по запросу "{searchQuery}"</p>
        ) : (
          filtered.map(tech => (
            <TechnologyCard
              key={tech.id}
              technology={tech}
              onStatusChange={updateStatus}
              onNotesChange={updateNotes}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default App;