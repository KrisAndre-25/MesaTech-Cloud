import React, { useEffect, useState } from 'react';
import StatusTag from './StatusTag';

function MisSolicitudes({ api, usuarioId }) {
  const [solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState(null);
  const [nueva, setNueva] = useState({ titulo: '', descripcion: '', prioridad: 'MEDIA', categoriaId: '' });

  const cargar = () => {
    api
      .get('/v1/solicitudes/mias')
      .then((respuesta) => setSolicitudes(respuesta.data))
      .catch((err) => setError(err.message));
  };

  useEffect(cargar, [api]);

  const crearSolicitud = async (e) => {
    e.preventDefault();
    try {
      await api.post('/v1/solicitudes', {
        ...nueva,
        categoriaId: nueva.categoriaId ? Number(nueva.categoriaId) : null,
        usuarioId,
      });
      setNueva({ titulo: '', descripcion: '', prioridad: 'MEDIA', categoriaId: '' });
      cargar();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 1160, margin: '0 auto', padding: '44px 40px' }}>
      <div style={{ marginBottom: 30, display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
        <h1 style={{ fontSize: 24, fontWeight: 600 }}>Mis solicitudes</h1>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)' }}>
          // {solicitudes.length} registrada{solicitudes.length === 1 ? '' : 's'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 40, alignItems: 'start' }}>
        {/* Formulario */}
        <form
          onSubmit={crearSolicitud}
          style={{
            border: '1px solid var(--border)', borderRadius: 3, padding: 22, display: 'flex',
            flexDirection: 'column', gap: 16, background: 'var(--surface-2)',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--accent)' }}>
            + NUEVA_SOLICITUD
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <label>Título</label>
            <input
              type="text"
              placeholder="No enciende el monitor"
              value={nueva.titulo}
              onChange={(e) => setNueva({ ...nueva, titulo: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <label>Descripción</label>
            <textarea
              rows={3}
              placeholder="Detalla el problema..."
              style={{ resize: 'none' }}
              value={nueva.descripcion}
              onChange={(e) => setNueva({ ...nueva, descripcion: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
              <label>Categoría ID</label>
              <input
                type="number"
                placeholder="1"
                value={nueva.categoriaId}
                onChange={(e) => setNueva({ ...nueva, categoriaId: e.target.value })}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
              <label>Prioridad</label>
              <select value={nueva.prioridad} onChange={(e) => setNueva({ ...nueva, prioridad: e.target.value })}>
                <option value="BAJA">Baja</option>
                <option value="MEDIA">Media</option>
                <option value="ALTA">Alta</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            style={{
              marginTop: 4, background: 'var(--accent)', color: 'var(--accent-ink)', border: 'none', borderRadius: 2,
              height: 42, fontWeight: 700, fontSize: 13.5, fontFamily: 'var(--font-mono)', letterSpacing: '0.03em',
              boxShadow: 'var(--accent-glow)',
            }}
          >
            CREAR →
          </button>
        </form>

        {/* Manifest list */}
        <div>
          <div style={{
            display: 'grid', gridTemplateColumns: '70px 1fr 140px 130px', padding: '0 4px 10px',
            borderBottom: '1px solid var(--border)',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.08em', color: 'var(--text-faint)' }}>ID</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.08em', color: 'var(--text-faint)' }}>TÍTULO</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.08em', color: 'var(--text-faint)' }}>CATEGORÍA</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.08em', color: 'var(--text-faint)', textAlign: 'right' }}>ESTADO</span>
          </div>

          {error && <p style={{ color: 'var(--status-cancelada)', fontSize: 13.5, marginTop: 14 }}>Error: {error}</p>}

          {solicitudes.length === 0 && !error && (
            <p style={{ color: 'var(--text-faint)', fontSize: 13.5, marginTop: 18 }}>Aún no tienes solicitudes registradas.</p>
          )}

          {solicitudes.map((s) => (
            <div
              key={s.id}
              style={{
                display: 'grid', gridTemplateColumns: '70px 1fr 140px 130px', alignItems: 'center', padding: '16px 4px',
                borderBottom: '1px solid var(--border-soft)',
                opacity: s.estado === 'CERRADA' || s.estado === 'CANCELADA' ? 0.5 : 1,
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-faint)' }}>
                #{String(s.id).padStart(4, '0')}
              </span>
              <span style={{ fontSize: 14.5, fontWeight: 500 }}>{s.titulo}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)' }}>
                {(s.categoriaId ? `#${s.categoriaId}` : 'SIN CATEGORÍA')} / {s.prioridad || '—'}
              </span>
              <div style={{ textAlign: 'right' }}>
                <StatusTag estado={s.estado} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MisSolicitudes;
