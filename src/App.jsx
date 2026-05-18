import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Inicio from './pages/Inicio/Inicio';
import Simulados from './pages/Simulados/Simulados.jsx';
import Obra from './pages/Obra/AObra.jsx';
import Curiosidades from './pages/Curiosidades/Curiosidades.jsx';
import Sobre from './pages/Sobre/Sobre.jsx';
import Vestibular from './pages/Vestibular/Vestibular.jsx';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/simulados" element={<Simulados />} />
                    <Route path="/obra" element={<Obra />} />
                    <Route path="/curiosidades" element={<Curiosidades />} />
                    <Route path="/sobre" element={<Sobre />} />
                    <Route path="/vestibular" element={<Vestibular />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
