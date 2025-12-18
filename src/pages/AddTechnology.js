// src/pages/AddTechnology.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TechnologyForm from '../components/TechnologyForm';
import useTechnologies from '../hooks/useTechnologies';
import './Page.css';

export default function AddTechnology() {
  const navigate = useNavigate();
  const { addTechnology } = useTechnologies();

  const handleSubmit = async (formData) => {
    try {
      await addTechnology({
        ...formData,
        status: 'not-started',
        notes: '',
        createdAt: new Date().toISOString()
      });
      navigate('/technologies');
    } catch (err) {
      alert(`Ошибка: ${err.message}`);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Добавить технологию</h1>
      </div>

      <TechnologyForm
        onSave={handleSubmit}
        onCancel={() => navigate('/technologies')}
      />
    </div>
  );
}