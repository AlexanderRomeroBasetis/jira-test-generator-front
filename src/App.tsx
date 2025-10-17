import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import type { CredentialResponse } from '@react-oauth/google';
import Login from "./pages/Login";
import Main from "./pages/Main";
import './styles/main.css';
import './styles/reset.css';

type User = {
  credential: string;
  profile: any;
} | null;

function App() {
  const [user, setUser] = useState<User>(null);

  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    const credential = credentialResponse.credential;

    if (!credential) {
      console.log('No credential returned');
    } else {
      const payload = JSON.parse(atob(credential.split('.')[1]));

      setUser({
        credential: credential,
        profile: payload
      });
      navigate("/");
    };
  };

  // const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
  //   if (credentialResponse.credential) {
  //     try {
  //       const googleUserData = jwtDecode<{
  //         email: string;
  //         name: string;
  //         sub: string; // Este es el Google ID
  //         picture: string;
  //       }>(credentialResponse.credential);

  //       console.log('Datos de Google recibidos:', googleUserData);

  //       const { accessToken, refreshToken } = await getBackendTokens(googleUserData);

  //       console.log('Tokens del backend recibidos:', { accessToken, refreshToken });

  //       localStorage.setItem('accessToken', accessToken);
  //       localStorage.setItem('refreshToken', refreshToken);

  //       // window.location.href = '/dashboard';

  //     } catch (error) {
  //       console.error('Fallo el proceso de login:', error);
  //       // Aquí podrías mostrar un mensaje de error al usuario
  //     }
  //   }
  // };


  const handleLoginError = () => {
    console.log('Login Failed');
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Login
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        }
      />
      <Route
        path="/"
        element={
          <Main
            user={user}
          />
        }
      />
    </Routes>
  )
}

export default App