import React from 'react';

// Sin esto, cualquier excepcion no controlada durante el render (ej. un campo
// inesperado en la respuesta del BFF) desmonta todo el arbol de React y deja
// la pantalla en blanco sin ninguna pista de que paso.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('MesaTech: error no controlado en la interfaz', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24,
            fontFamily: 'var(--font-mono)', textAlign: 'center',
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 600 }}>Algo salió mal.</span>
          <span style={{ fontSize: 13, color: 'var(--text-faint)', maxWidth: 480 }}>
            {this.state.error.message || 'Ocurrió un error inesperado en la interfaz.'}
          </span>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'var(--accent)', color: 'var(--accent-ink)', border: 'none', borderRadius: 2,
              height: 38, padding: '0 18px', fontWeight: 700, fontSize: 12.5, fontFamily: 'var(--font-mono)',
              letterSpacing: '0.03em', cursor: 'pointer',
            }}
          >
            Recargar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
