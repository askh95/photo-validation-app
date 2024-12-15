import React, { useState } from 'react';
import { Settings, Save } from 'lucide-react';

const ValidationRules = () => {
  const [rules, setRules] = useState({
    passport: {
      min_width: 600,
      min_height: 800,
      max_size_kb: 500,
      required_background_color: '#FFFFFF',
      min_face_size_percent: 70
    },
    visa: {
      min_width: 500,
      min_height: 700,
      max_size_kb: 400,
      required_background_color: '#FFFFFF',
      min_face_size_percent: 60
    }
  });

  const [selectedType, setSelectedType] = useState('passport');
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field, value) => {
    setRules(prev => ({
      ...prev,
      [selectedType]: {
        ...prev[selectedType],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Настройки правил валидации
        </h2>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Тип документа
        </label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2"
        >
          <option value="passport">Паспорт</option>
          <option value="visa">Виза</option>
        </select>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Минимальная ширина (px)
            </label>
            <input
              type="number"
              value={rules[selectedType].min_width}
              onChange={(e) => handleChange('min_width', parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Минимальная высота (px)
            </label>
            <input
              type="number"
              value={rules[selectedType].min_height}
              onChange={(e) => handleChange('min_height', parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Максимальный размер (КБ)
          </label>
          <input
            type="number"
            value={rules[selectedType].max_size_kb}
            onChange={(e) => handleChange('max_size_kb', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Цвет фона
          </label>
          <input
            type="color"
            value={rules[selectedType].required_background_color}
            onChange={(e) => handleChange('required_background_color', e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-md shadow-sm px-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Минимальный размер лица (%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={rules[selectedType].min_face_size_percent}
            onChange={(e) => handleChange('min_face_size_percent', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-sm text-gray-600">
            {rules[selectedType].min_face_size_percent}%
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Сохранение...' : 'Сохранить настройки'}
        </button>
      </div>
    </div>
  );
};

export default ValidationRules;