import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Inicio from './components/Inicio/Inicio';
import Simulados from './components/Simulados/Simulados.jsx';
import Obra from './components/Obra/AObra.jsx';
import Curiosidades from './components/Curiosidades/Curiosidades.jsx';
import Sobre from './components/Sobre/Sobre.jsx';
import Vestibular from './components/Vestibular/Vestibular.jsx';

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
