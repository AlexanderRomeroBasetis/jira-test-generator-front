import type { IUser, IUserUpdateRequest } from "../interfaces";

export const userService = {
    getUser: async (): Promise<IUser> => {
        const endpoint = '/api/user/me';
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            throw new Error('No access token available');
        }

        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error del servidor: ${response.status}`);
            }

            const user: IUser = await response.json();
            return user;

        } catch (error) {
            console.error('Error al obtener los tokens del backend:', error);
            throw error;
        }
    },

    updateUser: async (userData: IUserUpdateRequest): Promise<IUser> => {
        const endpoint = '/api/user';
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            throw new Error('No access token available');
        }

        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error del servidor: ${response.status}`);
            }

            const user: IUser = await response.json();
            console.log('User fetched:', user);
            return user;

        } catch (error) {
            console.error('Error al obtener los tokens del backend:', error);
            throw error;
        }
    }
};