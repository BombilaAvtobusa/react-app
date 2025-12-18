import React, { useState } from 'react';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import './App.css';
import useLocalStorage from 'use-local-storage';

function App() {
  const initialTechnologies = [
    { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started', notes: '' },
    { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'not-started', notes: '' },
    { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started', notes: '' }
  ];

  const [technologies, setTechnologies] = useLocalStorage('techTrackerData', initialTechnologies);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState(''); // 🔥 Новое состояние для поиска

  // === Функции ===
  const updateTechnologyStatus = (id) => {
    setTechnologies(prev =>
      prev.map(tech => {
        if (tech.id !== id) return tech;
        if (tech.status === 'not-started') return { ...tech, status: 'in-progress' };
        if (tech.status === 'in-progress') return { ...tech, status: 'completed' };
        if (tech.status === 'completed') return { ...tech, status: 'not-started' };
        return tech;
      })
    );
  };

  const updateTechnologyNotes = (techId, newNotes) => {
    setTechnologies(prevTech => 
      prevTech.map(tech => 
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  const markAllCompleted = () => setTechnologies(prev => prev.map(t => ({ ...t, status: 'completed' })));
  const resetAll = () => setTechnologies(prev => prev.map(t => ({ ...t, status: 'not-started' })));
  const randomNext = () => {
    const notStarted = technologies.filter(t => t.status === 'not-started');
    if (notStarted.length > 0) {
      const random = notStarted[Math.floor(Math.random() * notStarted.length)];
      updateTechnologyStatus(random.id);
    }
  };

  // === Фильтрация с поиском ===
  const filtered = technologies
    .filter(tech => {
      if (filter !== 'all' && tech.status !== filter) return false;
      return true;
    })
    .filter(tech => {
      // Поиск по названию и описанию
      const query = searchQuery.toLowerCase();
      return (
        tech.title.toLowerCase().includes(query) ||
        tech.description.toLowerCase().includes(query)
      );
    });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Трекер изучения технологий</h1>
      </header>

      <ProgressHeader technologies={technologies} />

      <QuickActions
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAll}
        onRandomNext={randomNext}
      />

      {/* 🔥 Поле поиска */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск технологий..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span>Найдено: {filtered.length}</span>
      </div>

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
              id={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              notes={tech.notes}
              onStatusChange={updateTechnologyStatus}
              onNotesChange={updateTechnologyNotes}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default App;