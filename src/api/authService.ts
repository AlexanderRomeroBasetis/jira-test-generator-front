// interface GoogleUserData {
//     email: string;
//     name: string;
//     sub: string;
//     picture: string;
// }

// interface LoginResponse {
//     accessToken: string;
//     refreshToken: string;
// }

// /**
//  * Intercambia los datos de usuario de Google por los tokens de acceso del backend.
//  * @param userData - Los datos del perfil del usuario obtenidos de Google.
//  * @returns Una promesa que se resuelve con los tokens de acceso y refresco.
//  * @throws Si la petición a la API falla.
//  */
// export async function getBackendTokens(userData: GoogleUserData): Promise<LoginResponse> {
//     // Asegúrate de que la URL base de tu API esté configurada correctamente.
//     // Puede estar en un archivo .env
//     const endpoint = '/api/auth/login';

//     try {
//         const response = await fetch(endpoint, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(userData),
//         });

//         if (!response.ok) {
//             // Si el backend devuelve un error (ej: email no permitido), lo capturamos aquí.
//             const errorData = await response.json();
//             throw new Error(errorData.message || `Error del servidor: ${response.status}`);
//         }

//         const tokens: LoginResponse = await response.json();
//         return tokens;

//     } catch (error) {
//         console.error('Error al obtener los tokens del backend:', error);
//         // Re-lanzamos el error para que el componente que llama a la función pueda manejarlo.
//         throw error;
//     }
// }
