import React, { useEffect, useMemo, useState } from 'react';
import StatusTag from './StatusTag';
import { TRANSICIONES_VALIDAS } from '../roles';

function TodasSolicitudes({ api }) {
  const [solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('TODOS');

  const cargar = () => {
    api
      .get('/v1/solicitudes')
      .then((respuesta) => setSolicitudes(respuesta.data))
      .catch((err) => setError(err.message));
  };

  useEffect(cargar, [api]);

  const cambiarEstado = async (id, nuevoEstado) => {
    if (!nuevoEstado) return;
    try {
      await api.put(`/v1/solicitudes/${id}/estado`, null, { params: { nuevoEstado } });
      cargar();
    } catch (err) {
      setError(err.message);
    }
  };

  const visibles = useMemo(() => {
    return solicitudes.filter((s) => {
      const coincideTexto = s.titulo?.toLowerCase().includes(busqueda.toLowerCase());
      const coincideEstado = filtroEstado === 'TODOS' || s.estado === filtroEstado;
      return coincideTexto && coincideEstado;
    });
  }, [solicitudes, busqueda, filtroEstado]);

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '44px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 26, flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ fontSize: 24, fontWeight: 600 }}>Todas las solicitudes</h1>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)' }}>// vista global</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="text"
            placeholder="Buscar título..."
            style={{ width: 200 }}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
            <option value="TODOS">TODOS_LOS_ESTADOS</option>
            {Object.keys(TRANSICIONES_VALIDAS).map((estado) => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <p style={{ color: 'var(--status-cancelada)', fontSize: 13.5, marginBottom: 16 }}>Error: {error}</p>}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['ID', 'TÍTULO', 'SOLICITANTE', 'CATEGORÍA', 'PRIORIDAD', 'ESTADO', 'ACCIÓN'].map((col) => (
                <th
                  key={col}
                  style={{
                    textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 500,
                    letterSpacing: '0.08em', color: 'var(--text-faint)', padding: '0 14px 10px',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibles.map((s) => {
              const opciones = TRANSICIONES_VALIDAS[s.estado] || [];
              const esTerminal = opciones.length === 0;
              return (
                <tr key={s.id} style={{ opacity: esTerminal ? 0.55 : 1 }}>
                  <td style={celda('var(--font-mono)', 'var(--text-faint)')}>#{String(s.id).padStart(4, '0')}</td>
                  <td style={{ ...celda(), fontWeight: 500, textDecoration: s.estado === 'CANCELADA' ? 'line-through' : 'none' }}>
                    {s.titulo}
                  </td>
                  <td style={{ ...celda(), color: 'var(--text-dim)' }}>{s.usuarioId?.slice(0, 8) || '—'}</td>
                  <td style={celda('var(--font-mono)', 'var(--text-dim)', 12.5)}>{s.categoriaId ? `#${s.categoriaId}` : '—'}</td>
                  <td style={celda('var(--font-mono)', 'var(--text-dim)', 12.5)}>{s.prioridad || '—'}</td>
                  <td style={celda()}><StatusTag estado={s.estado} /></td>
                  <td style={celda()}>
                    {esTerminal ? (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)' }}>—</span>
                    ) : (
                      <select
                        key={s.estado}
                        defaultValue=""
                        style={{ fontSize: 12, padding: '5px 9px' }}
                        onChange={(e) => cambiarEstado(s.id, e.target.value)}
                      >
                        <option value="" disabled>Cambiar a...</option>
                        {opciones.map((op) => (
                          <option key={op} value={op}>{op}</option>
                        ))}
                      </select>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {visibles.length === 0 && !error && (
          <p style={{ color: 'var(--text-faint)', fontSize: 13.5, marginTop: 18 }}>Sin resultados para este filtro.</p>
        )}
      </div>
    </div>
  );
}

function celda(fontFamily = 'var(--font-body)', color = 'var(--text)', fontSize = 14) {
  return {
    padding: '15px 14px', fontSize, borderBottom: '1px solid var(--border-soft)', verticalAlign: 'middle',
    fontFamily, color,
  };
}

export default TodasSolicitudes;
