import '../../App.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../../service/autenticacionAPI';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await iniciarSesion(email, password);
      localStorage.setItem('token', data.token);  // Guarda el token en localStorage
      navigate('/proyectos');  // Redirige a la página de proyectos después de iniciar sesión
    } catch (error) {
      setError(error.message);
    }
  };
  const handleRegisterRedirect = () => {
    navigate('/registro');
  };
  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
        <p>¿No tienes una cuenta? <a onClick={handleRegisterRedirect}>Regístrate</a></p>
      </form>
    </div>
  );
};

export default Login;
