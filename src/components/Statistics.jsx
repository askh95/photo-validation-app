import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader } from 'lucide-react';

const Statistics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockStats = {
        daily: [
          { date: '2024-12-05', uploads: 45, successRate: 85 },
          { date: '2024-12-06', uploads: 52, successRate: 88 },
          { date: '2024-12-07', uploads: 38, successRate: 92 },
          { date: '2024-12-08', uploads: 65, successRate: 87 },
          { date: '2024-12-09', uploads: 48, successRate: 90 },
          { date: '2024-12-10', uploads: 55, successRate: 89 },
        ],
        averageScores: {
          facePosition: 85,
          lighting: 82,
          background: 90,
          sharpness: 88,
          overall: 86
        },
        totalStats: {
          totalUploads: 303,
          successfulChecks: 267,
          failedChecks: 36
        }
      };
      
      setStats(mockStats);
      setIsLoading(false);
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Всего загрузок</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalStats.totalUploads}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Успешные проверки</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalStats.successfulChecks}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Неудачные проверки</h3>
          <p className="text-3xl font-bold text-red-600">{stats.totalStats.failedChecks}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Статистика по дням</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.daily}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('ru-RU')}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString('ru-RU')}
              />
              <Legend />
              <Bar name="Количество загрузок" dataKey="uploads" fill="#3B82F6" />
              <Bar name="Успешность (%)" dataKey="successRate" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Средние оценки</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(stats.averageScores).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-sm text-gray-600 mb-1">
                {key === 'facePosition' ? 'Позиция лица' :
                 key === 'lighting' ? 'Освещение' :
                 key === 'background' ? 'Фон' :
                 key === 'sharpness' ? 'Четкость' :
                 'Общая оценка'}
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {value}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;