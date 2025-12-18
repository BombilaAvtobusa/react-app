// src/components/RoadmapImporter.js
import React, { useState } from 'react';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import './RoadmapImporter.css';

export default function RoadmapImporter() {
  const { addTechnology } = useTechnologiesApi();
  const [importing, setImporting] = useState(false);

  const handleExampleImport = async () => {
    setImporting(true);
    try {
      // Пример данных для импорта
      const exampleTechs = [
        { title: 'Next.js', description: 'Фреймворк для React', category: 'frontend', difficulty: 'intermediate' },
        { title: 'GraphQL', description: 'Язык запросов', category: 'api', difficulty: 'advanced' },
        { title: 'Docker', description: 'Контейнеризация', category: 'devops', difficulty: 'intermediate' }
      ];

      for (const tech of exampleTechs) {
        await addTechnology(tech);
      }

      alert(`Успешно импортировано ${exampleTechs.length} технологий`);
    } catch (err) {
      alert(`Ошибка импорта: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="roadmap-importer">
      <h3>Импорт дорожной карты</h3>
      <div className="import-actions">
        <button
          onClick={handleExampleImport}
          disabled={importing}
          className="import-button"
        >
          {importing ? 'Импорт...' : 'Импорт пример дорожной карты'}
        </button>
      </div>
    </div>
  );
}