import React, { useState } from 'react';
import { Upload, X, Loader } from 'lucide-react';
import { usePhotoStore } from '../store/photos';

const PhotoUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const { uploadPhoto, analyzePhoto, isUploading, isAnalyzing, currentAnalysis } = usePhotoStore();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = async (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    const photo = await uploadPhoto(file);
    await analyzePhoto(photo.id);
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  const removePreview = () => {
    setPreview(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      <div 
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="space-y-6">
            <div className="relative">
              <img 
                src={preview} 
                alt="Предпросмотр" 
                className="max-h-64 mx-auto rounded-lg shadow-md" 
              />
              {!isAnalyzing && !isUploading && (
                <button 
                  onClick={removePreview}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {(isUploading || isAnalyzing) && (
              <div className="flex items-center justify-center space-x-3 text-blue-600">
                <Loader className="animate-spin h-6 w-6" />
                <span className="text-lg font-medium">
                  {isUploading ? 'Загрузка фото...' : 'Анализ изображения...'}
                </span>
              </div>
            )}

            {currentAnalysis && !isAnalyzing && !isUploading && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Результаты анализа</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-gray-600">Обнаружение лица</div>
                    <div className={`text-lg font-semibold ${
                      currentAnalysis.face_detected ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {currentAnalysis.face_detected ? 'Обнаружено ✓' : 'Не обнаружено ✗'}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-gray-600">Положение лица</div>
                    <div className="text-lg font-semibold">
                      {Math.round(currentAnalysis.face_position_score * 100)}%
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-gray-600">Освещение</div>
                    <div className="text-lg font-semibold">
                      {Math.round(currentAnalysis.lighting_score * 100)}%
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-gray-600">Фон</div>
                    <div className="text-lg font-semibold">
                      {Math.round(currentAnalysis.background_score * 100)}%
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-600">Общий балл</div>
                  <div className={`text-2xl font-bold ${
                    currentAnalysis.overall_score >= 0.8 ? 'text-green-600' : 
                    currentAnalysis.overall_score >= 0.6 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {Math.round(currentAnalysis.overall_score * 100)}%
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-8">
            <Upload className="mx-auto h-16 w-16 text-gray-400" />
            <div className="mt-6">
              <label 
                htmlFor="file-upload" 
                className="px-4 py-2 text-lg bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
              >
                Выбрать фото
              </label>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleChange}
                accept="image/*"
              />
              <p className="mt-3 text-gray-500">или перетащите файл сюда</p>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Поддерживаемые форматы: JPEG, PNG до 5МБ
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;