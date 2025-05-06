import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tareas from './pages/Tareas';
import Login from "./pages/Login";
import NuevaTarea from './components/NuevaTareaModal';
import Navbar from "./components/Navbar";



function App() {
    return (
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/tareas" element={<Tareas />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

