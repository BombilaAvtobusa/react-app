// src/pages/TechnologyList.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import TechnologyCard from '../components/TechnologyCard';
import DataExporter from '../components/DataExporter';
import DataImporter from '../components/DataImporter';
import MassStatusEditor from '../components/MassStatusEditor';
import useTechnologies from '../hooks/useTechnologies';
import './Page.css';

export default function TechnologyList() {
  const { 
    technologies, 
    deleteTechnology, 
    updateStatus, 
    updateNotes, 
    progress, 
    addTechnology 
  } = useTechnologies();

  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState(technologies);

  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      const term = searchTerm.toLowerCase();
      if (term === '') {
        setFiltered(technologies);
      } else {
        setFiltered(
          technologies.filter(tech =>
            tech.title.toLowerCase().includes(term) ||
            tech.description.toLowerCase().includes(term)
          )
        );
      }
    }, 500);

    return () => {
      clearTimeout(searchTimeoutRef.current);
    };
  }, [searchTerm, technologies]);

  const handleImport = (importedTechnologies) => {
    importedTechnologies.forEach(tech => {
      // Проверяем, нет ли уже такой технологии (по ID или названию)
      const exists = technologies.some(t => t.id === tech.id || t.title === tech.title);
      if (!exists) {
        addTechnology(tech);
      }
    });
    alert(`Импортировано ${importedTechnologies.length} технологий`);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Все технологии</h1>
        <Link to="/add-technology" className="btn btn-primary">
          + Добавить технологию
        </Link>
      </div>

      {/* ✅ Новые компоненты */}
      <DataExporter technologies={technologies} />
      <DataImporter onImport={handleImport} />
      <MassStatusEditor technologies={technologies} onUpdateStatus={updateStatus} />

      <div className="progress-summary">
        <p>Прогресс: {progress}%</p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск технологий..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span>Найдено: {filtered.length}</span>
      </div>

      <div className="technologies-grid">
        {filtered.map(tech => (
          <TechnologyCard
            key={tech.id}
            technology={tech}
            onStatusChange={updateStatus}
            onNotesChange={updateNotes}
            onDelete={deleteTechnology}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <p>Нет технологий по запросу "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}