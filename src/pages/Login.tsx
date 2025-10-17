import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import '../styles/login-page.css';

interface LoginProps {
    onSuccess: (credentialResponse: any) => void;
    onError: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess, onError }) => {
  return (
    <div className="login-page">
        <div className="login-container">
            <div className="login-header">
                <h1>Login</h1>
                <p>Sign in with your Google account</p>            
            </div>
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
            />
        </div>
    </div>
  );
};

export default Login;