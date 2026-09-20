import React, { useEffect, useState } from 'react';

const VACIA = { nombre: '', descripcion: '', prioridad: 'MEDIA' };

// El BFF responde 409 con {"error": "..."} cuando la categoria esta en uso;
// para el resto de errores no hay cuerpo propio, se usa el mensaje de axios.
function mensajeError(err) {
  return err.response?.data?.error || err.message;
}

function Catalogo({ api }) {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);
  const [nueva, setNueva] = useState(VACIA);
  const [editandoId, setEditandoId] = useState(null);
  const [borrador, setBorrador] = useState(VACIA);

  const cargar = () => {
    api
      .get('/v1/catalogo/categorias')
      .then((respuesta) => setCategorias(respuesta.data))
      .catch((err) => setError(mensajeError(err)));
  };

  useEffect(cargar, [api]);

  const crear = async (e) => {
    e.preventDefault();
    try {
      await api.post('/v1/catalogo/categorias', nueva);
      setNueva(VACIA);
      setError(null);
      cargar();
    } catch (err) {
      setError(mensajeError(err));
    }
  };

  const iniciarEdicion = (categoria) => {
    setEditandoId(categoria.id);
    setBorrador({ nombre: categoria.nombre, descripcion: categoria.descripcion, prioridad: categoria.prioridad });
  };

  const guardarEdicion = async (id) => {
    try {
      await api.put(`/v1/catalogo/categorias/${id}`, borrador);
      setEditandoId(null);
      setError(null);
      cargar();
    } catch (err) {
      setError(mensajeError(err));
    }
  };

  const eliminar = async (id, nombre) => {
    if (!window.confirm(`¿Eliminar la categoría "${nombre}"? Esta acción no se puede deshacer.`)) {
      return;
    }
    try {
      await api.delete(`/v1/catalogo/categorias/${id}`);
      setError(null);
      cargar();
    } catch (err) {
      setError(mensajeError(err));
    }
  };

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '44px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 26, flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ fontSize: 24, fontWeight: 600 }}>Catálogo</h1>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)' }}>
            // categorías y prioridad por defecto
          </span>
        </div>
      </div>

      {error && <p style={{ color: 'var(--status-cancelada)', fontSize: 13.5, marginBottom: 16 }}>Error: {error}</p>}

      <form
        onSubmit={crear}
        style={{
          display: 'flex', gap: 10, marginBottom: 24, padding: 16, border: '1px solid var(--border)',
          borderRadius: 3, background: 'var(--surface-2)', flexWrap: 'wrap', alignItems: 'flex-end',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, flex: '1 1 160px' }}>
          <label>Nombre</label>
          <input value={nueva.nombre} onChange={(e) => setNueva({ ...nueva, nombre: e.target.value })} required />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, flex: '2 1 240px' }}>
          <label>Descripción</label>
          <input value={nueva.descripcion} onChange={(e) => setNueva({ ...nueva, descripcion: e.target.value })} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, flex: '0 0 140px' }}>
          <label>Prioridad</label>
          <select value={nueva.prioridad} onChange={(e) => setNueva({ ...nueva, prioridad: e.target.value })}>
            <option value="BAJA">Baja</option>
            <option value="MEDIA">Media</option>
            <option value="ALTA">Alta</option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            background: 'var(--accent)', color: 'var(--accent-ink)', border: 'none', borderRadius: 2, height: 38,
            padding: '0 16px', fontWeight: 700, fontSize: 12.5, fontFamily: 'var(--font-mono)', letterSpacing: '0.03em',
            boxShadow: 'var(--accent-glow)',
          }}
        >
          + NUEVA_CATEGORÍA
        </button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['NOMBRE', 'DESCRIPCIÓN', 'PRIORIDAD', 'ACCIONES'].map((col, i) => (
              <th
                key={col}
                style={{
                  textAlign: i === 3 ? 'right' : 'left', fontFamily: 'var(--font-mono)', fontSize: 10.5,
                  fontWeight: 500, letterSpacing: '0.08em', color: 'var(--text-faint)', padding: '0 14px 10px',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categorias.map((c) => {
            const editando = editandoId === c.id;
            return (
              <tr key={c.id}>
                <td style={celda()}>
                  {editando ? (
                    <input value={borrador.nombre} onChange={(e) => setBorrador({ ...borrador, nombre: e.target.value })} />
                  ) : (
                    <span style={{ fontWeight: 600 }}>{c.nombre}</span>
                  )}
                </td>
                <td style={celda('var(--text-dim)', 13.5)}>
                  {editando ? (
                    <input
                      style={{ width: '100%' }}
                      value={borrador.descripcion}
                      onChange={(e) => setBorrador({ ...borrador, descripcion: e.target.value })}
                    />
                  ) : (
                    c.descripcion
                  )}
                </td>
                <td style={{ ...celda(), fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.05em' }}>
                  {editando ? (
                    <select value={borrador.prioridad} onChange={(e) => setBorrador({ ...borrador, prioridad: e.target.value })}>
                      <option value="BAJA">BAJA</option>
                      <option value="MEDIA">MEDIA</option>
                      <option value="ALTA">ALTA</option>
                    </select>
                  ) : (
                    c.prioridad
                  )}
                </td>
                <td style={{ ...celda(), textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: 8 }}>
                    {editando ? (
                      <button onClick={() => guardarEdicion(c.id)} style={botonIcono()}>OK</button>
                    ) : (
                      <button onClick={() => iniciarEdicion(c)} style={botonIcono()}>Editar</button>
                    )}
                    <button onClick={() => eliminar(c.id, c.nombre)} style={{ ...botonIcono(), color: 'var(--status-cancelada)' }}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {categorias.length === 0 && !error && (
        <p style={{ color: 'var(--text-faint)', fontSize: 13.5, marginTop: 18 }}>Aún no hay categorías registradas.</p>
      )}
    </div>
  );
}

function celda(color = 'var(--text)', fontSize = 14) {
  return { padding: '16px 14px', fontSize, borderBottom: '1px solid var(--border-soft)', verticalAlign: 'middle', color };
}

function botonIcono() {
  return {
    fontSize: 11.5, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', padding: '5px 9px', borderRadius: 2,
    border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-dim)',
  };
}

export default Catalogo;
