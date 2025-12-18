// src/hooks/useTechnologiesApi.js
import { useState, useEffect, useCallback } from 'react';
import useLocalStorage from 'use-local-storage';

function useTechnologiesApi() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Используем localStorage как "базу данных"
  const [technologies, setTechnologies] = useLocalStorage('technologies', []);

  // Функция загрузки технологий (имитация API)
  const fetchTechnologies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Имитация API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock данные (только если в localStorage пусто)
      if (technologies.length === 0) {
        const mockTechnologies = [
          {
            id: 1,
            title: 'React',
            description: 'Библиотека для создания пользовательских интерфейсов',
            category: 'frontend',
            difficulty: 'beginner',
            resources: ['https://react.dev'],
            status: 'not-started',
            notes: ''
          },
          {
            id: 2,
            title: 'Node.js',
            description: 'Среда выполнения JavaScript на сервере',
            category: 'backend',
            difficulty: 'intermediate',
            resources: ['https://nodejs.org'],
            status: 'not-started',
            notes: ''
          }
        ];
        setTechnologies(mockTechnologies);
      }
    } catch (err) {
      setError('Не удалось загрузить технологии');
      console.error('Ошибка загрузки:', err);
    } finally {
      setLoading(false);
    }
  }, [technologies, setTechnologies]);

  // === НОВОЕ: функции обновления ===
  const updateStatus = (techId, newStatus) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  const addTechnology = async (techData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Имитация API
      const newTech = {
        id: Date.now(),
        ...techData,
        status: 'not-started',
        notes: '',
        createdAt: new Date().toISOString()
      };
      setTechnologies(prev => [...prev, newTech]);
      return newTech;
    } catch (err) {
      throw new Error('Не удалось добавить технологию');
    }
  };

  // Загрузка при монтировании
  useEffect(() => {
    fetchTechnologies();
  }, [fetchTechnologies]);

  // === НОВОЕ: функция для получения прогресса ===
  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  return {
    technologies,
    loading,
    error,
    refetch: fetchTechnologies,
    addTechnology,
    updateStatus,    // ✅
    updateNotes,     // ✅
    progress: calculateProgress() // ✅
  };
}

export default useTechnologiesApi;