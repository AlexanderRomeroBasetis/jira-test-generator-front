import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import './styles/main.css';
import './styles/reset.css';

function App() {

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Login/>
        }
      />
      <Route
        path="/"
        element={
          <Main/>
        }
      />
    </Routes>
  )
}

export default App