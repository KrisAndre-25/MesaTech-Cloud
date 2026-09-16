import React, { useEffect, useState } from 'react';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
import { loginRequest } from './authConfig';
import { obtenerAccessToken, crearClienteApi } from './api';
import { obtenerRolesDeToken } from './roles';
import Home from './components/Home';
import Navbar from './components/Navbar';
import MisSolicitudes from './components/MisSolicitudes';
import TodasSolicitudes from './components/TodasSolicitudes';
import Catalogo from './components/Catalogo';

function AppAutenticada({ instance, cuenta }) {
  const [api, setApi] = useState(null);
  const [roles, setRoles] = useState([]);
  const [vista, setVista] = useState('mis');

  useEffect(() => {
    obtenerAccessToken(instance, cuenta).then((token) => {
      // setApi(cliente) se confundiria con la forma funcional de setState,
      // ya que una instancia de axios es invocable (es una funcion con
      // metodos adjuntos) - se envuelve para que React la guarde tal cual.
      setApi(() => crearClienteApi(token));
      setRoles(obtenerRolesDeToken(token));
    });
  }, [instance, cuenta]);

  if (!api) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-faint)' }}>Cargando sesión...</span>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar
        nombre={cuenta.name}
        roles={roles}
        vista={vista}
        onCambiarVista={setVista}
        onLogout={() => instance.logoutRedirect()}
      />
      {vista === 'mis' && <MisSolicitudes api={api} usuarioId={cuenta.localAccountId} />}
      {vista === 'todas' && <TodasSolicitudes api={api} />}
      {vista === 'catalogo' && <Catalogo api={api} />}
    </div>
  );
}

function App() {
  const { instance, accounts } = useMsal();

  const iniciarSesion = () => {
    instance.loginRedirect(loginRequest).catch((err) => console.error(err));
  };

  return (
    <>
      <UnauthenticatedTemplate>
        <Home onLogin={iniciarSesion} />
      </UnauthenticatedTemplate>

      <AuthenticatedTemplate>
        {accounts.length > 0 && <AppAutenticada instance={instance} cuenta={accounts[0]} />}
      </AuthenticatedTemplate>
    </>
  );
}

export default App;
