import React, { useState, useEffect } from 'react';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import './App.css';
import useLocalStorage from 'use-local-storage';

function App() {
  const initialTechnologies = [
    { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started' },
    { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'not-started' },
    { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started' }
  ];

  const [technologies, setTechnologies] = useLocalStorage('techTrackerData', initialTechnologies);
  const [filter, setFilter] = useState('all');

  // Загрузка из localStorage
  useEffect(() => {
    const saved = window.localStorage.getItem('techTrackerData');
    if (saved) {
      try {
        let parsed = JSON.parse(saved);

        // // Гарантируем, что у всех есть поле notes
        // parsed = parsed.map(tech => ({
        //   ...tech,
        //   notes: tech.notes !== undefined ? tech.notes : ''
        // }));

        setTechnologies(parsed);
        console.log('Загружено из localStorage:', parsed);
      } catch (e) {
        console.error('Ошибка при загрузке:', e);
        setTechnologies(initialTechnologies.map(t => ({ ...t, notes: '' })));
      }
    } else {
      console.log('Нет данных в localStorage');
      // Добавляем notes к начальным
      setTechnologies(initialTechnologies.map(t => ({ ...t, notes: '' })));
    }
  }, []);

  // Сохранение в localStorage
  useEffect(() => {
    try {
      setTechnologies('techTrackerData', JSON.stringify(technologies));
      console.log('Сохранено в localStorage:', technologies);
    } catch (e) {
      console.error('Ошибка при сохранении:', e);
    }
  }, [technologies]);

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

  // === Фильтрация с защитой ===
  const filtered = technologies.map(tech => ({
    ...tech,
    notes: tech.notes !== undefined ? tech.notes : ''
  })).filter(tech => {
    if (filter === 'all') return true;
    return tech.status === filter;
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

      <div className="filters">
        {['all', 'not-started', 'in-progress', 'completed'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={filter === f ? 'active' : ''}>
            {f === 'all' ? 'Все' : f === 'not-started' ? 'Не начато' : f === 'in-progress' ? 'В процессе' : 'Выполнено'}
          </button>
        ))}
      </div>

      <main className="tech-list">
        {filtered.length === 0 ? (
          <p>Нет технологий с выбранным статусом</p>
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