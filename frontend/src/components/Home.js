import React from 'react';
import { Vortex } from './ui/vortex';
import { PointerHighlight } from './ui/pointer-highlight';
import { AnimatedTestimonials } from './ui/animated-testimonials';
import { SqueezeCarousel } from './ui/carousel-squeeze';
import MinimalFooter from './ui/minimal-footer';
import HomeNavbar from './HomeNavbar';

const marca = (texto) => <span className="text-sm font-medium tracking-tight text-white">{texto}</span>;

const SOFTWARE_SLIDES = [
  {
    id: 'auth',
    title: 'Autenticación corporativa con Microsoft Entra ID.',
    description:
      'El login se hace con la cuenta de la organización; el backend valida cada token — emisor, audiencia, firma y expiración — antes de autorizar cualquier operación.',
    background: 'linear-gradient(135deg, #3b0764, #000000)',
    overlay: marca('Entra ID'),
  },
  {
    id: 'solicitudes',
    title: 'Cada solicitud sigue un flujo de estados controlado.',
    description:
      'Creada, asignada, en proceso, resuelta o cerrada: el sistema impide saltarse pasos, por ejemplo resolver algo que nunca estuvo en proceso.',
    background: 'linear-gradient(135deg, #064e3b, #000000)',
    overlay: marca('Solicitudes'),
  },
  {
    id: 'roles',
    title: 'Tres roles, tres vistas distintas.',
    description:
      'Cliente, operador y administrador ven y pueden hacer exactamente lo que su rol permite, validado tanto en el frontend como en el backend.',
    background: 'linear-gradient(135deg, #581c87, #064e3b)',
    overlay: marca('Roles'),
  },
  {
    id: 'arquitectura',
    title: 'Arquitectura de microservicios con un BFF al centro.',
    description:
      'El frontend nunca habla directo con los microservicios: todo pasa por un Backend for Frontend que valida el token y coordina las llamadas.',
    background: 'linear-gradient(135deg, #18181b, #3b0764)',
    overlay: marca('Arquitectura'),
  },
  {
    id: 'catalogo',
    title: 'Catálogo de categorías administrable.',
    description:
      'El administrador mantiene las categorías y su prioridad por defecto, disponibles de inmediato para clientes y operadores.',
    background: 'linear-gradient(135deg, #064e3b, #3b0764)',
    overlay: marca('Catálogo'),
  },
];

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
      <HomeNavbar onLogin={onLogin} />

      {/* Hero con Vortex */}
      <div id="inicio" className="w-full h-[34rem] overflow-hidden">
        <Vortex
          backgroundColor="black"
          baseHue={270}
          particleCount={140}
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

      {/* Cómo funciona el software */}
      <div id="producto" className="border-t border-neutral-200 bg-white px-6 py-16 md:px-10">
        <h2 className="mx-auto max-w-5xl text-2xl md:text-3xl font-bold mb-2">
          Cómo funciona MesaTech Cloud
        </h2>
        <p className="mx-auto max-w-5xl text-neutral-500 mb-8">
          Un recorrido rápido por las piezas técnicas detrás de la plataforma.
        </p>
        <div className="mx-auto max-w-5xl">
          <SqueezeCarousel slides={SOFTWARE_SLIDES} label="Cómo funciona" accent="#9333ea" />
        </div>
      </div>

      {/* Sobre nosotros */}
      <div id="nosotros" className="bg-neutral-50 border-y border-neutral-200">
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

      <MinimalFooter />
    </div>
  );
}

export default Home;
