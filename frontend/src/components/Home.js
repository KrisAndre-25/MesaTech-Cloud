import React from 'react';

function Home({ onLogin }) {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--bg)', position: 'relative', overflowX: 'hidden' }}>

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '28px 64px', position: 'relative', zIndex: 2 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, letterSpacing: '0.12em' }}>
          MESATECH_CLOUD<span style={{ color: 'var(--accent)' }}>.</span>
        </span>
        <button
          onClick={onLogin}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.04em', color: 'var(--text-dim)',
            background: 'transparent', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: 2,
          }}
        >
          INICIAR SESIÓN →
        </button>
      </div>

      {/* Glow orb */}
      <div
        style={{
          position: 'absolute', top: -180, left: '50%', transform: 'translateX(-50%)',
          width: 900, height: 700, background: 'var(--accent)', opacity: 0.28, filter: 'blur(160px)',
          borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
        }}
      />

      {/* Hero */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 30, padding: '100px 24px 90px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.16em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
          Autenticación corporativa · Microsoft Entra ID
        </span>
        <h1 style={{ fontSize: 'clamp(40px, 7vw, 84px)', lineHeight: 0.96, letterSpacing: '-0.03em', fontWeight: 700, maxWidth: 980 }}>
          Ninguna solicitud<br />se pierde <span style={{ color: 'var(--accent)' }}>jamás</span>.
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--text-dim)', maxWidth: 560 }}>
          MesaTech Cloud centraliza el soporte técnico de tu organización: clientes, operadores y administradores
          comparten un único registro de solicitudes, de principio a fin.
        </p>
        <button
          onClick={onLogin}
          style={{
            background: 'var(--accent)', color: 'var(--accent-ink)', border: 'none', borderRadius: 3,
            height: 54, padding: '0 28px', fontWeight: 700, fontSize: 15.5, boxShadow: 'var(--accent-glow)',
          }}
        >
          Iniciar sesión con Microsoft
        </button>
      </div>

      {/* Numbered features */}
      <div style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '40px 64px 0', maxWidth: 1240, margin: '0 auto' }}>
        {[
          ['01', 'Gestión centralizada', 'Crea, asigna y sigue cada solicitud desde un único registro, con historial completo por caso.'],
          ['02', 'Roles y permisos', 'Cliente, operador y administrador ven exactamente lo que su rol necesita — nada más.'],
          ['03', 'Trazabilidad completa', 'Cada solicitud sigue un flujo de estados claro, visible para todos los involucrados.'],
        ].map(([n, title, desc], i) => (
          <div
            key={n}
            style={{
              padding: i === 0 ? '40px 32px 40px 0' : i === 2 ? '40px 0 40px 32px' : '40px 32px',
              borderRight: i < 2 ? '1px solid var(--border-soft)' : 'none',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)' }}>{n}</span>
            <h3 style={{ fontSize: 19, fontWeight: 600 }}>{title}</h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--text-dim)', margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>

      {/* Status flow */}
      <div style={{
        position: 'relative', zIndex: 2, maxWidth: 1112, margin: '8px auto 0', borderTop: '1px solid var(--border-soft)',
        padding: '36px 24px 44px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', rowGap: 12,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--text-faint)', textTransform: 'uppercase', marginRight: 32 }}>
          Ciclo de vida
        </span>
        {['CREADA', 'ASIGNADA', 'EN_PROCESO', 'RESUELTA', 'CERRADA'].map((estado, i, arr) => (
          <React.Fragment key={estado}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: estado === 'EN_PROCESO' ? 'var(--accent)' : 'var(--text-faint)' }}>
              {estado}
            </span>
            {i < arr.length - 1 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--border)', margin: '0 14px' }}>→</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Footer */}
      <div style={{ position: 'relative', zIndex: 2, borderTop: '1px solid var(--border-soft)', padding: '24px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-faint)' }}>© MESATECH_CLOUD</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-faint)' }}>DSY1107 — DESARROLLO CLOUD NATIVE I</span>
      </div>
    </div>
  );
}

export default Home;
