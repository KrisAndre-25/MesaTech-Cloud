import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const SECCIONES = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'producto', label: 'Producto' },
  { id: 'nosotros', label: 'Sobre nosotros' },
  { id: 'equipo', label: 'Equipo' },
];

function HomeNavbar({ onLogin }) {
  const [activo, setActivo] = useState('inicio');

  useEffect(() => {
    let frame = null;

    const actualizar = () => {
      const mitad = window.innerHeight / 2;
      for (const s of SECCIONES) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mitad && rect.bottom >= mitad) {
          setActivo(s.id);
          break;
        }
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        actualizar();
        frame = null;
      });
    };

    actualizar();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const irA = (id) => (e) => {
    e.preventDefault();
    setActivo(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between gap-6 px-8 py-3 bg-black/90 backdrop-blur border-b border-purple-900/50">
      <span className="flex items-center gap-2 font-bold text-lg tracking-tight text-white shrink-0">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-purple-500" />
        MesaTech<span className="text-emerald-400">Cloud</span>
      </span>

      <div className="hidden sm:flex items-center gap-1 rounded-full bg-white/5 p-1">
        {SECCIONES.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={irA(s.id)}
            className="relative px-4 py-1.5 text-sm font-medium rounded-full"
          >
            {activo === s.id && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 bg-purple-600 rounded-full"
                transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors ${
                activo === s.id ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {s.label}
            </span>
          </a>
        ))}
      </div>

      <button
        onClick={onLogin}
        className="rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 shrink-0"
      >
        Iniciar sesión
      </button>
    </nav>
  );
}

export default HomeNavbar;
