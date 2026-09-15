import React, { useEffect, useState } from 'react';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
import { loginRequest } from './authConfig';
import { obtenerAccessToken, crearClienteApi } from './api';
import './App.css';

function App() {
  const { instance, accounts } = useMsal();
  const [solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [nueva, setNueva] = useState({ titulo: '', descripcion: '', prioridad: 'MEDIA', categoriaId: '' });

  const iniciarSesion = () => {
    instance.loginRedirect(loginRequest).catch((err) => console.error(err));
  };

  const cerrarSesion = () => {
    instance.logoutRedirect();
  };

  useEffect(() => {
    if (accounts.length === 0) return;

    obtenerAccessToken(instance, accounts[0])
      .then((accessToken) => {
        setToken(accessToken);
        const api = crearClienteApi(accessToken);
        return api.get('/v1/solicitudes/mias');
      })
      .then((respuesta) => setSolicitudes(respuesta.data))
      .catch((err) => setError(err.message));
  }, [instance, accounts]);

  const crearSolicitud = async (e) => {
    e.preventDefault();
    if (!token) return;
    try {
      const api = crearClienteApi(token);
      await api.post('/v1/solicitudes', {
        ...nueva,
        categoriaId: nueva.categoriaId ? Number(nueva.categoriaId) : null,
        usuarioId: accounts[0]?.localAccountId,
      });
      const respuesta = await api.get('/v1/solicitudes/mias');
      setSolicitudes(respuesta.data);
      setNueva({ titulo: '', descripcion: '', prioridad: 'MEDIA', categoriaId: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <h1>MesaTech Cloud</h1>

      <UnauthenticatedTemplate>
        <p>El usuario no está autenticado.</p>
        <button onClick={iniciarSesion}>Iniciar sesión</button>
      </UnauthenticatedTemplate>

      <AuthenticatedTemplate>
        <h2>Usuario autenticado</h2>
        {accounts.length > 0 && (
          <>
            <p>Nombre: {accounts[0].name}</p>
            <p>Usuario: {accounts[0].username}</p>
            <p>oid (claim): {accounts[0].idTokenClaims?.oid}</p>
          </>
        )}
        <button onClick={cerrarSesion}>Cerrar sesión</button>

        <hr />

        <h3>Crear solicitud</h3>
        <form onSubmit={crearSolicitud}>
          <input
            placeholder="Título"
            value={nueva.titulo}
            onChange={(e) => setNueva({ ...nueva, titulo: e.target.value })}
            required
          />
          <input
            placeholder="Descripción"
            value={nueva.descripcion}
            onChange={(e) => setNueva({ ...nueva, descripcion: e.target.value })}
          />
          <input
            placeholder="Categoría ID"
            value={nueva.categoriaId}
            onChange={(e) => setNueva({ ...nueva, categoriaId: e.target.value })}
          />
          <select
            value={nueva.prioridad}
            onChange={(e) => setNueva({ ...nueva, prioridad: e.target.value })}
          >
            <option value="BAJA">BAJA</option>
            <option value="MEDIA">MEDIA</option>
            <option value="ALTA">ALTA</option>
          </select>
          <button type="submit">Crear</button>
        </form>

        <h3>Mis solicitudes</h3>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <ul>
          {solicitudes.map((s) => (
            <li key={s.id}>
              #{s.id} - {s.titulo} - {s.estado} - {s.prioridad}
            </li>
          ))}
        </ul>
      </AuthenticatedTemplate>
    </div>
  );
}

export default App;
