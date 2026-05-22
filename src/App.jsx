import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Inicio from './pages/Inicio/Inicio';
import Simulados from './pages/Simulados/Simulados.jsx';
import Obra from './pages/Obra/AObra.jsx';
import Curiosidades from './pages/Curiosidades/Curiosidades.jsx';
import Sobre from './pages/Sobre/Sobre.jsx';
import Vestibular from './pages/Vestibular/Vestibular.jsx';
import VidaDaAutora from './pages/Vida-da-autora/VidaDaAutora.jsx';
import Contexto from './pages/Contexto-Historico/Contexto.jsx'
import Personagens from './pages/personagens/Personagens.jsx'

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
                    <Route path="/curiosidades/VidaDaAutora" element={<VidaDaAutora />} />
                    <Route path="/curiosidades/Contexto-Historico" element={< Contexto/>} />
                    <Route path="/personagens" element={< Personagens/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
