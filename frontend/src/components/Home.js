import React from 'react';
import { Vortex } from './ui/vortex';
import { AnimatedTestimonials } from './ui/animated-testimonials';
import { SqueezeCarousel } from './ui/carousel-squeeze';
import { CardStack, Highlight } from './ui/card-stack';
import { WobbleCard } from './ui/wobble-card';
import MinimalFooter from './ui/minimal-footer';
import HomeNavbar from './HomeNavbar';

const marca = (texto) => <span className="text-sm font-medium tracking-tight text-white">{texto}</span>;

const FEATURE_CARDS = [
  {
    id: 0,
    name: 'Gestión centralizada',
    designation: '01',
    content: (
      <p>
        Crea, asigna y sigue cada solicitud desde{' '}
        <Highlight>un único registro</Highlight>, con historial completo por caso.
      </p>
    ),
  },
  {
    id: 1,
    name: 'Roles y permisos',
    designation: '02',
    content: (
      <p>
        Cliente, operador y administrador ven exactamente{' '}
        <Highlight>lo que su rol necesita</Highlight> — nada más.
      </p>
    ),
  },
  {
    id: 2,
    name: 'Trazabilidad completa',
    designation: '03',
    content: (
      <p>
        Cada solicitud sigue <Highlight>un flujo de estados claro</Highlight>, visible
        para todos los involucrados.
      </p>
    ),
  },
];

const SOFTWARE_SLIDES = [
  {
    id: 'auth',
    title: 'Autenticación corporativa con Microsoft Entra ID.',
    description:
      'El login se hace con la cuenta de la organización; el backend valida cada token — emisor, audiencia, firma y expiración — antes de autorizar cualquier operación.',
    image: '/ENTRAID.png',
    imageAlt: 'Logo de Microsoft Entra ID',
    overlay: marca('Entra ID'),
  },
  {
    id: 'solicitudes',
    title: 'Cada solicitud sigue un flujo de estados controlado.',
    description:
      'Creada, asignada, en proceso, resuelta o cerrada: el sistema impide saltarse pasos, por ejemplo resolver algo que nunca estuvo en proceso.',
    image: '/solicitudes.png',
    imageAlt: 'Icono de una solicitud aprobada',
    overlay: marca('Solicitudes'),
  },
  {
    id: 'roles',
    title: 'Tres roles, tres vistas distintas.',
    description:
      'Cliente, operador y administrador ven y pueden hacer exactamente lo que su rol permite, validado tanto en el frontend como en el backend.',
    image: '/roles.jpeg',
    imageAlt: 'Panel de Microsoft Entra ID con los usuarios asignados a la app mesatech-api',
    overlay: marca('Roles'),
  },
  {
    id: 'arquitectura',
    title: 'Arquitectura de microservicios con un BFF al centro.',
    description:
      'El frontend nunca habla directo con los microservicios: todo pasa por un Backend for Frontend que valida el token y coordina las llamadas.',
    image: '/arquitectura.png',
    imageAlt: 'Estructura de carpetas del proyecto MesaTech Cloud en el editor',
    overlay: marca('Arquitectura'),
  },
  {
    id: 'catalogo',
    title: 'Catálogo de categorías administrable.',
    description:
      'El administrador mantiene las categorías y su prioridad por defecto, disponibles de inmediato para clientes y operadores.',
    image: '/catalogo.gif',
    imageAlt: 'Ilustración de un catálogo de productos',
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
    name: 'Bianco Martinez',
    designation: 'Ingeniero en Informática · Full Stack Developer',
    quote:
      'Full Stack Developer enfocado en que cada solicitud tenga una respuesta clara y a tiempo.',
    src: '/bianco.jpg',
  },
  {
    name: 'Cesar Flores',
    designation: 'Ingeniero en Informática · Full Stack Developer',
    quote:
      'Convencido de que la buena arquitectura empieza por entender bien el problema del cliente.',
    src: '/cesar.jpg',
  },
  {
    name: 'Paulo Berríos',
    designation:
      'Jefe de Fábrica de Software | Docente DuocUC | Magíster en Data Science | SFPC™, GAIPC™, LSSWBPC™, BIFPC™, BMCEPC™ | Desarrollador Full Stack | AWS Educator | Gestión de Proyectos ágiles | Arquitecto de Software',
    quote: 'Docente guía de la asignatura Desarrollo Cloud Native I (DSY1107).',
    src: '/docente-paulo.png',
  },
];

function Home({ onLogin }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <HomeNavbar onLogin={onLogin} />

      {/* Hero con Vortex */}
      <div id="inicio" className="w-full h-[34rem] overflow-hidden">
        <Vortex
          backgroundColor="black"
          baseHue={280}
          particleCount={140}
          className="flex items-center flex-col justify-center px-4 md:px-10 py-4 w-full h-full"
        >
          <h1 className="text-white text-3xl md:text-6xl font-bold text-center max-w-3xl">
            Ninguna solicitud se pierde <span className="text-purple-400">jamás</span>.
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
              className="px-5 py-2.5 text-white border border-white/30 rounded-lg hover:border-purple-400 hover:text-purple-400 transition"
            >
              Conoce al equipo
            </a>
          </div>
        </Vortex>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-8 py-24">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-12 text-white">
          Beneficios
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          {FEATURE_CARDS.map((card) => (
            <CardStack key={card.id} items={[card]} />
          ))}
        </div>
      </div>

      {/* Cómo funciona el software */}
      <div id="producto" className="border-t border-white/10 bg-black px-6 py-16 md:px-10">
        <h2 className="mx-auto max-w-5xl text-2xl md:text-3xl font-bold mb-2 text-white">
          Cómo funciona MesaTech Cloud
        </h2>
        <p className="mx-auto max-w-5xl text-neutral-400 mb-8">
          Un recorrido rápido por las piezas técnicas detrás de la plataforma.
        </p>
        <div className="mx-auto max-w-5xl">
          <SqueezeCarousel slides={SOFTWARE_SLIDES} label="Cómo funciona" accent="#9333ea" />
        </div>
      </div>

      {/* Sobre nosotros */}
      <div id="nosotros" className="bg-neutral-950 border-y border-white/10 px-6 py-20 md:px-10">
        <h2 className="mx-auto max-w-6xl text-2xl md:text-3xl font-bold mb-8 text-white">
          Sobre nosotros
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto w-full">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-purple-900 min-h-[500px] lg:min-h-[300px]"
          >
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Creemos que la mejor forma de dar soporte es colaborar.
              </h2>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
                MesaTech Cloud nació como proyecto de la asignatura Desarrollo Cloud Native I
                (DSY1107): frontend, autenticación con Microsoft Entra ID, backend y
                arquitectura de microservicios, todo construido por el mismo equipo.
              </p>
            </div>
            <img
              src="/icono333.png"
              alt="MesaTech Cloud"
              className="absolute -right-4 lg:-right-[10%] grayscale filter -bottom-10 object-contain rounded-2xl w-56 h-56 opacity-60"
            />
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-neutral-900">
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Un equipo, un objetivo.
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Tres ingenieros en informática full stack, guiados por un docente con
              experiencia en AWS y arquitectura de software.
            </p>
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-purple-950 min-h-[300px]">
            <div className="max-w-sm">
              <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                ¿Quieres conocer al equipo completo?
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                Revisa quién construyó cada parte de la plataforma, foto y rol incluidos.
              </p>
            </div>
            <img
              src="/icono333.png"
              alt="MesaTech Cloud"
              className="absolute -right-10 md:-right-[10%] lg:-right-[5%] -bottom-10 object-contain rounded-2xl w-56 h-56 opacity-60"
            />
          </WobbleCard>
        </div>
      </div>

      {/* Equipo */}
      <div id="equipo" className="max-w-5xl mx-auto px-8 bg-black">
        <h2 className="text-center text-2xl md:text-3xl font-bold pt-16 text-white">
          El equipo detrás de esto
        </h2>
        <AnimatedTestimonials testimonials={EQUIPO} autoplay />
      </div>

      <MinimalFooter />
    </div>
  );
}

export default Home;
