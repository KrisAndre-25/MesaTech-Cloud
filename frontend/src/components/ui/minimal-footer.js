import { useState } from 'react';
import { motion } from 'motion/react';

// lucide-react ya no incluye iconos de marcas (Github, redes sociales, etc.)
// por temas de licencia, asi que este va como SVG inline.
function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.78 10.79.57.1.78-.25.78-.55 0-.27-.01-1.16-.01-2.1-3.17.58-3.99-.77-4.24-1.48-.14-.36-.75-1.48-1.28-1.78-.44-.24-1.06-.83-.02-.84.98-.01 1.68.9 1.91 1.27 1.12 1.87 2.9 1.34 3.61 1.02.11-.8.44-1.34.8-1.65-2.79-.32-5.72-1.4-5.72-6.22 0-1.37.49-2.5 1.29-3.38-.13-.32-.56-1.61.12-3.35 0 0 1.05-.34 3.45 1.29a11.8 11.8 0 0 1 6.28 0c2.4-1.63 3.45-1.29 3.45-1.29.68 1.74.25 3.03.12 3.35.8.88 1.29 2 1.29 3.38 0 4.84-2.94 5.9-5.74 6.21.45.39.85 1.16.85 2.35 0 1.7-.02 3.07-.02 3.49 0 .3.21.66.79.55a11.05 11.05 0 0 0 7.76-10.79C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}

export function MinimalFooter() {
  const year = new Date().getFullYear();
  const [mouse, setMouse] = useState({ x: 50, y: 0 });
  const [activo, setActivo] = useState(false);

  const producto = [
    { title: 'Inicio', href: '#inicio' },
    { title: 'Sobre nosotros', href: '#nosotros' },
    { title: 'Equipo', href: '#equipo' },
  ];

  const proyecto = [
    { title: 'Repositorio', href: 'https://github.com/KrisAndre-25/MesaTech-Cloud' },
    {
      title: 'Microsoft Entra ID',
      href: 'https://www.microsoft.com/security/business/identity-access/microsoft-entra-id',
    },
  ];

  const socialLinks = [
    {
      icon: <GithubIcon className="size-4" />,
      link: 'https://github.com/KrisAndre-25/MesaTech-Cloud',
    },
  ];

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.footer
      className="relative overflow-hidden bg-black border-t border-white/10"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setActivo(true)}
      onMouseLeave={() => setActivo(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* cuadricula de fondo */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(147,51,234,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(147,51,234,0.18) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'linear-gradient(to bottom, black, transparent 90%)',
        }}
      />

      {/* spotlight que sigue al mouse */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: activo ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(480px circle at ${mouse.x}% ${mouse.y}%, rgba(168,85,247,0.28), transparent 60%)`,
        }}
      />

      <div className="relative mx-auto max-w-4xl md:border-x md:border-white/10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
        <div className="grid max-w-4xl grid-cols-6 gap-6 p-4 pt-8">
          <div className="col-span-6 flex flex-col gap-5 md:col-span-4">
            <a href="#inicio" className="flex w-max items-center gap-2 font-bold text-white">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-purple-500" />
              MesaTech<span className="text-purple-400">Cloud</span>
            </a>
            <p className="max-w-sm font-mono text-sm text-balance text-neutral-400">
              Plataforma de gestión de solicitudes de soporte técnico — proyecto de Desarrollo
              Cloud Native I (DSY1107).
            </p>
            <div className="flex gap-2">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  className="rounded-md border border-white/10 p-1.5 text-neutral-300 transition-colors hover:border-purple-400/50 hover:bg-purple-500/10 hover:text-purple-300"
                  target="_blank"
                  rel="noreferrer"
                  href={item.link}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="mb-1 text-xs text-neutral-500">Producto</span>
            <div className="flex flex-col gap-1">
              {producto.map(({ href, title }, i) => (
                <a
                  key={i}
                  className="w-max py-1 text-sm text-neutral-300 duration-200 hover:text-purple-300 hover:underline"
                  href={href}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="mb-1 text-xs text-neutral-500">Proyecto</span>
            <div className="flex flex-col gap-1">
              {proyecto.map(({ href, title }, i) => (
                <a
                  key={i}
                  className="w-max py-1 text-sm text-neutral-300 duration-200 hover:text-purple-300 hover:underline"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
        <div className="flex max-w-4xl flex-col justify-between gap-2 px-4 pt-4 pb-5">
          <p className="text-center font-thin text-neutral-500">
            © MesaTech Cloud {year} — DSY1107, Desarrollo Cloud Native I
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

export default MinimalFooter;
