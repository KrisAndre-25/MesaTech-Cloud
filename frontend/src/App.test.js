import { render, screen } from '@testing-library/react';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import App from './App';
import { msalConfig } from './authConfig';

test('muestra el boton de inicio de sesion cuando no hay usuario autenticado', async () => {
  const msalInstance = new PublicClientApplication(msalConfig);
  render(
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  );
  expect(await screen.findByText(/iniciar sesión/i)).toBeInTheDocument();
});
