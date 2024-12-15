// src/store/photos.js
import { create } from "zustand";

const initialPhotos = [];

export const usePhotoStore = create((set, get) => ({
	photos: initialPhotos,
	currentAnalysis: null,
	isUploading: false,
	isAnalyzing: false,

	uploadPhoto: async (file) => {
		set({ isUploading: true });

		// Имитация загрузки
		await new Promise((resolve) => setTimeout(resolve, 2000));

		const newPhoto = {
			id: Date.now(),
			file_path: URL.createObjectURL(file),
			original_filename: file.name,
			file_size: file.size,
			mime_type: file.type,
			width: 800, // Здесь можно получать реальные размеры
			height: 600,
			uploaded_at: new Date().toISOString(),
		};

		set((state) => ({
			photos: [newPhoto, ...state.photos],
			isUploading: false,
		}));

		return newPhoto;
	},

	analyzePhoto: async (photoId) => {
		set({ isAnalyzing: true });

		// Имитация процесса анализа
		await new Promise((resolve) => setTimeout(resolve, 5000));

		const analysis = {
			id: Date.now(),
			photo_id: photoId,
			face_detected: Math.random() > 0.1,
			face_position_score: Math.random() * 0.3 + 0.7,
			lighting_score: Math.random() * 0.3 + 0.7,
			background_score: Math.random() * 0.3 + 0.7,
			sharpness_score: Math.random() * 0.3 + 0.7,
			overall_score: Math.random() * 0.3 + 0.7,
			created_at: new Date().toISOString(),
		};

		set({ currentAnalysis: analysis, isAnalyzing: false });
		return analysis;
	},

	deletePhoto: async (photoId) => {
		// Имитация удаления
		await new Promise((resolve) => setTimeout(resolve, 1000));

		set((state) => ({
			photos: state.photos.filter((photo) => photo.id !== photoId),
		}));
	},
}));
