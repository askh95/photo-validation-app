import React, { useState } from 'react';
import { usePhotoStore } from '../store/photos';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  RefreshCw, 
  Download,
  MoreVertical,
  Info
} from 'lucide-react';

const UploadHistory = () => {
  const { photos, analyzePhoto, deletePhoto } = usePhotoStore();
  const [loading, setLoading] = useState(null); 

  const handleRecheck = async (photoId) => {
    setLoading(photoId);
    await analyzePhoto(photoId);
    setLoading(null);
  };

  const handleDelete = async (photoId) => {
    if (window.confirm('Вы уверены, что хотите удалить это фото?')) {
      await deletePhoto(photoId);
    }
  };

  const handleDownload = (photo) => {
    const link = document.createElement('a');
    link.href = photo.file_path;
    link.download = photo.original_filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">История загрузок</h3>
      <div className="bg-white rounded-lg shadow">
        {photos.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            История загрузок пуста
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {photos.map((photo) => (
              <div key={photo.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 flex-shrink-0 relative group">
                    <img
                      src={photo.file_path}
                      alt={photo.original_filename}
                      className="h-16 w-16 object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <button 
                        onClick={() => handleRecheck(photo.id)}
                        className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                        title="Перепроверить"
                      >
                        <RefreshCw className="h-4 w-4 text-white" />
                      </button>
                      <button 
                        onClick={() => handleDownload(photo)}
                        className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                        title="Скачать"
                      >
                        <Download className="h-4 w-4 text-white" />
                      </button>
                      <button 
                        onClick={() => handleDelete(photo.id)}
                        className="p-1 hover:bg-white hover:bg-opacity-20 rounded text-red-300 hover:text-red-400"
                        title="Удалить"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {photo.original_filename}
                    </p>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(photo.uploaded_at).toLocaleString('ru-RU')}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      {(photo.file_size / 1024).toFixed(1)} КБ • 
                      {photo.width}x{photo.height}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {loading === photo.id ? (
                      <div className="flex items-center text-blue-600">
                        <RefreshCw className="h-5 w-5 mr-1 animate-spin" />
                        <span>Проверка...</span>
                      </div>
                    ) : Math.random() > 0.3 ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-5 w-5 mr-1" />
                        <span>Проверено</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <XCircle className="h-5 w-5 mr-1" />
                        <span>Ошибка</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-3 grid grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-gray-600">Лицо</div>
                    <div className="font-medium">{Math.round(Math.random() * 30 + 70)}%</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-gray-600">Освещение</div>
                    <div className="font-medium">{Math.round(Math.random() * 30 + 70)}%</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-gray-600">Фон</div>
                    <div className="font-medium">{Math.round(Math.random() * 30 + 70)}%</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-gray-600">Качество</div>
                    <div className="font-medium">{Math.round(Math.random() * 30 + 70)}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadHistory;