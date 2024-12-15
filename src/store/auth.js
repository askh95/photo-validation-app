import { create } from "zustand";

const mockUsers = [
	{
		id: 1,
		email: "test@test.com",
		password: "test123",
		name: "Тестовый Пользователь",
	},
];

export const useAuthStore = create((set) => ({
	user: null,
	isLoading: false,
	error: null,

	login: async (email, password) => {
		set({ isLoading: true, error: null });

		await new Promise((resolve) => setTimeout(resolve, 1000));

		const user = mockUsers.find(
			(u) => u.email === email && u.password === password
		);

		if (user) {
			set({ user, isLoading: false });
			return true;
		} else {
			set({ error: "Неверный email или пароль", isLoading: false });
			return false;
		}
	},

	register: async (email, password, name) => {
		set({ isLoading: true, error: null });

		await new Promise((resolve) => setTimeout(resolve, 1000));

		if (mockUsers.some((u) => u.email === email)) {
			set({
				error: "Пользователь с таким email уже существует",
				isLoading: false,
			});
			return false;
		}

		const newUser = { id: mockUsers.length + 1, email, password, name };
		mockUsers.push(newUser);
		set({ user: newUser, isLoading: false });
		return true;
	},

	logout: () => {
		set({ user: null });
	},
}));
