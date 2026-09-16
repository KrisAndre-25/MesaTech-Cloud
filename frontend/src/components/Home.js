import React from 'react';
import { Vortex } from './ui/vortex';
import { PointerHighlight } from './ui/pointer-highlight';
import { AnimatedTestimonials } from './ui/animated-testimonials';

const EQUIPO = [
  {
    name: 'Kristopher Durán',
    designation: 'Ingeniero en Informática · Full Stack Developer',
    quote:
      'Construimos MesaTech Cloud para demostrar que un sistema de soporte técnico puede ser simple, seguro y trazable a la vez.',
    src: '/kristopher.jpg',
  },
  {
    name: 'Bianco',
    designation: 'Ingeniero en Informática · Full Stack Developer',
    quote:
      'Full Stack Developer enfocado en que cada solicitud tenga una respuesta clara y a tiempo.',
    src: '/bianco.jpg',
  },
  {
    name: 'Cesar',
    designation: 'Ingeniero en Informática · Full Stack Developer',
    quote:
      'Convencido de que la buena arquitectura empieza por entender bien el problema del cliente.',
    src: '/cesar.webp',
  },
];

function Home({ onLogin }) {
  return (
    <div className="w-full min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white border-b border-neutral-200">
        <span className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-purple-600" />
          MesaTech
          <span className="text-emerald-500">Cloud</span>
        </span>
        <button
          onClick={onLogin}
          className="rounded-md bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
        >
          Iniciar sesión
        </button>
      </nav>

      {/* Hero con Vortex */}
      <div className="w-full h-[34rem] overflow-hidden">
        <Vortex
          backgroundColor="black"
          baseHue={270}
          particleCount={250}
          className="flex items-center flex-col justify-center px-4 md:px-10 py-4 w-full h-full"
        >
          <h1 className="text-white text-3xl md:text-6xl font-bold text-center max-w-3xl">
            Ninguna solicitud se pierde <span className="text-emerald-400">jamás</span>.
          </h1>
          <p className="text-neutral-300 text-sm md:text-xl max-w-xl mt-6 text-center">
            MesaTech Cloud centraliza el soporte técnico de tu organización: clientes,
            operadores y administradores comparten un único registro de solicitudes,
            de principio a fin.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            <button
              onClick={onLogin}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 transition duration-200 rounded-lg text-white font-semibold shadow-[0px_2px_0px_0px_#FFFFFF40_inset]"
            >
              Iniciar sesión con Microsoft
            </button>
            <a
              href="#equipo"
              className="px-5 py-2.5 text-white border border-white/30 rounded-lg hover:border-emerald-400 hover:text-emerald-400 transition"
            >
              Conoce al equipo
            </a>
          </div>
        </Vortex>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-8 py-20">
        {[
          ['01', 'Gestión centralizada', 'Crea, asigna y sigue cada solicitud desde un único registro, con historial completo por caso.'],
          ['02', 'Roles y permisos', 'Cliente, operador y administrador ven exactamente lo que su rol necesita — nada más.'],
          ['03', 'Trazabilidad completa', 'Cada solicitud sigue un flujo de estados claro, visible para todos los involucrados.'],
        ].map(([n, title, desc]) => (
          <div key={n} className="flex flex-col gap-3">
            <span className="text-sm font-mono font-bold text-purple-600">{n}</span>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Sobre nosotros */}
      <div className="bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-3xl mx-auto px-8 py-20 text-center">
          <div className="mx-auto text-2xl font-bold tracking-tight md:text-4xl">
            Creemos que la mejor forma de dar soporte es{' '}
            <PointerHighlight
              rectangleClassName="border-emerald-500"
              pointerClassName="text-emerald-500"
            >
              <span className="text-purple-600">colaborar</span>
            </PointerHighlight>
            .
          </div>
          <p className="mt-8 text-neutral-600 leading-relaxed">
            MesaTech Cloud nació como proyecto de la asignatura Desarrollo Cloud Native I
            (DSY1107). Diseñamos e implementamos toda la plataforma — frontend, autenticación
            con Microsoft Entra ID, backend y arquitectura de microservicios — como un equipo
            de tres ingenieros en informática, desarrolladores full stack.
          </p>
        </div>
      </div>

      {/* Equipo */}
      <div id="equipo" className="max-w-5xl mx-auto px-8">
        <h2 className="text-center text-2xl md:text-3xl font-bold pt-16">
          El equipo detrás de esto
        </h2>
        <AnimatedTestimonials testimonials={EQUIPO} autoplay />
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-200 px-8 py-6 flex items-center justify-between text-sm text-neutral-500">
        <span>© MesaTech Cloud</span>
        <span>DSY1107 — Desarrollo Cloud Native I</span>
      </div>
    </div>
  );
}

export default Home;
