import type { ILoginResponse, IUserGoogleData } from "../interfaces";

export const authService = {
    getBackendTokens: async (userGoogleData: IUserGoogleData): Promise<ILoginResponse> => {
        const endpoint = '/api/auth/login';
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userGoogleData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error del servidor: ${response.status}`);
            }

            const tokens: ILoginResponse = await response.json();
            return tokens;

        } catch (error) {
            throw error;
        }
    }
};