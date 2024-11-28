import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/autenticacion/Login';
import Registro from './Components/autenticacion/Registro';
import ListaProyectos from './Components/proyecto/ListaProyectos';
import ListaTareas from './Components/tarea/ListaTareas';

function App() {
  return (
    <>
      <div className="background"></div>
      <div className='container'>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/proyectos" element={<ListaProyectos />} />
            <Route path="/proyectos/:id/tareas" element={<ListaTareas />} />
          </Routes>
        </Router>
      </div>

    </>
  );
}

export default App;
