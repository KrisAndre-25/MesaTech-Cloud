import React from 'react';

const COLOR_POR_ESTADO = {
  CREADA: 'var(--status-creada)',
  ASIGNADA: 'var(--status-asignada)',
  EN_PROCESO: 'var(--status-en-proceso)',
  RESUELTA: 'var(--status-resuelta)',
  CERRADA: 'var(--status-cerrada)',
  CANCELADA: 'var(--status-cancelada)',
};

function StatusTag({ estado }) {
  const color = COLOR_POR_ESTADO[estado] || 'var(--text-faint)';
  const tachado = estado === 'CANCELADA';

  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.05em',
        color,
        textDecoration: tachado ? 'line-through' : 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {estado.replace('_', ' ')}
    </span>
  );
}

export default StatusTag;
