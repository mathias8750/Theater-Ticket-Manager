import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from "./login/view/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}
