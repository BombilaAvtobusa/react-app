// src/hooks/useTechnologies.js
import { useState } from 'react';
import useLocalStorage from 'use-local-storage';

const initialTechnologies = [
  { 
    id: 1, 
    title: 'React Components', 
    description: 'Изучение базовых компонентов', 
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  { 
    id: 2, 
    title: 'Node.js Basics', 
    description: 'Основы серверного JavaScript', 
    status: 'not-started',
    notes: '',
    category: 'backend'
  },
  { 
    id: 3, 
    title: 'CSS Flexbox', 
    description: 'Изучение гибких сеток', 
    status: 'not-started',
    notes: '',
    category: 'frontend'
  }
];

export default function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

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

  const deleteTechnology = (techId) => {
    setTechnologies(prev => prev.filter(tech => tech.id !== techId));
  };

  // ✅ НОВОЕ: функция добавления
  const addTechnology = async (techData) => {
    const newTech = {
      id: Date.now(),
      ...techData,
      status: 'not-started',
      notes: '',
      createdAt: new Date().toISOString()
    };
    setTechnologies(prev => [...prev, newTech]);
    return newTech;
  };

  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  return {
    technologies,
    updateStatus,
    updateNotes,
    deleteTechnology,
    addTechnology, // ✅
    progress: calculateProgress()
  };
}