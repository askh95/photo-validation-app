export const mockPhotos = [
	{
		id: 1,
		user_id: 1,
		file_path: "/photos/1.jpg",
		original_filename: "passport_photo.jpg",
		file_size: 1024,
		mime_type: "image/jpeg",
		width: 800,
		height: 600,
		uploaded_at: "2024-12-10T10:00:00Z",
	},
];

export const mockAnalysis = [
	{
		id: 1,
		photo_id: 1,
		face_detected: true,
		face_position_score: 0.95,
		lighting_score: 0.85,
		background_score: 0.9,
		sharpness_score: 0.88,
		overall_score: 0.89,
		created_at: "2024-12-10T10:01:00Z",
	},
];

export const mockValidationRules = [
	{
		id: 1,
		document_type: "passport",
		min_width: 600,
		min_height: 800,
		max_size_kb: 500,
		required_background_color: "#FFFFFF",
		min_face_size_percent: 70,
		created_at: "2024-12-01T00:00:00Z",
		updated_at: "2024-12-01T00:00:00Z",
	},
];
