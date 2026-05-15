import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Inicio from './components/Inicio/Inicio';
import Simulados from './components/Simulados/Simulados.jsx';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/simulados" element={<Simulados />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
