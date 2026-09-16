import React from 'react';

function rolPrincipal(roles) {
  if (roles.includes('ROLE_ADMINISTRADOR')) return 'ADMINISTRADOR';
  if (roles.includes('ROLE_OPERADOR')) return 'OPERADOR';
  return 'CLIENTE';
}

function NavTab({ label, active, onClick }) {
  return (
    <span
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-mono)', fontSize: 12.5, letterSpacing: '0.05em', padding: '7px 2px', cursor: 'pointer',
        borderBottom: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
        color: active ? 'var(--accent)' : 'var(--text-faint)',
      }}
    >
      {label}
    </span>
  );
}

function Navbar({ nombre, roles, vista, onCambiarVista, onLogout }) {
  const esOperador = roles.includes('ROLE_OPERADOR') || roles.includes('ROLE_ADMINISTRADOR');
  const esAdmin = roles.includes('ROLE_ADMINISTRADOR');

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 60,
      background: 'var(--surface)', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', rowGap: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap', rowGap: 8 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, fontWeight: 500, letterSpacing: '0.1em' }}>
          MESATECH_CLOUD<span style={{ color: 'var(--accent)' }}>.</span>
        </span>
        <div style={{ display: 'flex', gap: 26 }}>
          <NavTab label="MIS_SOLICITUDES" active={vista === 'mis'} onClick={() => onCambiarVista('mis')} />
          {esOperador && (
            <NavTab label="TODAS_LAS_SOLICITUDES" active={vista === 'todas'} onClick={() => onCambiarVista('todas')} />
          )}
          {esAdmin && (
            <NavTab label="CATÁLOGO" active={vista === 'catalogo'} onClick={() => onCambiarVista('catalogo')} />
          )}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)' }}>
          {nombre} <span style={{ color: 'var(--accent)' }}>[{rolPrincipal(roles)}]</span>
        </span>
        <svg
          onClick={onLogout}
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" strokeWidth="1.8"
          style={{ cursor: 'pointer' }}
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="M16 17l5-5-5-5" />
          <path d="M21 12H9" />
        </svg>
      </div>
    </div>
  );
}

export default Navbar;
