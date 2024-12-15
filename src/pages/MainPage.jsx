import React, { useState } from 'react';
import PhotoUpload from '../components/PhotoUpload';
import ValidationRules from '../components/ValidationRules';
import Statistics from '../components/Statistics';
import { useAuthStore } from '../store/auth';
import { ImagePlus, Settings, BarChart2, LogOut } from 'lucide-react';
import UploadHistory from '../components/UploadHistory';

const MainPage = () => {
  const { user, logout } = useAuthStore();
  const [currentTab, setCurrentTab] = useState('upload');

  const renderContent = () => {
    switch(currentTab) {
      case 'upload':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Загрузка фотографии</h2>
            <PhotoUpload />
            <UploadHistory /> 
          </div>
        );
      case 'rules':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Правила валидации</h2>
            <ValidationRules />
          </div>
        );
      case 'stats':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Статистика и отчёты</h2>
            <Statistics />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Система валидации фотографий</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{user?.email}</span>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="flex space-x-4">
            <button
              onClick={() => setCurrentTab('upload')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                currentTab === 'upload' 
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ImagePlus className="h-5 w-5" />
              Загрузка фото
            </button>
            <button
              onClick={() => setCurrentTab('rules')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                currentTab === 'rules' 
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings className="h-5 w-5" />
              Правила
            </button>
            <button
              onClick={() => setCurrentTab('stats')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                currentTab === 'stats' 
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart2 className="h-5 w-5" />
              Статистика
            </button>
          </nav>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MainPage;