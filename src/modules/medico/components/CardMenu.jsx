import { Link } from 'react-router-dom';

export default function CardMenu({ title, icon, to }) {
  return (
    <Link 
      to={to} 
      className="
        group
        flex flex-col items-center justify-center 
        w-72 h-72               /* Aumenté un poco el tamaño de la tarjeta (antes 64) */
        bg-white 
        border border-gray-200  /* Borde gris muy suave (casi invisible) */
        shadow-sm
        hover:shadow-xl 
        hover:-translate-y-1 
        hover:border-blue-600
        transition-all duration-300 ease-in-out
        cursor-pointer
        rounded-sm
        no-underline
      "
    >
      {/* Contenedor del ícono - Aumentado de tamaño */}
      <div className="mb-8"> {/* Un poco más de margen abajo */}
        <img 
          src={icon} 
          alt={title} 
          /* AQUI ESTÁ EL CAMBIO: w-32 h-32 hace la imagen mucho más grande */
          className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-300" 
        />
      </div>

      {/* Título */}
      <span className="text-blue-900 font-bold text-xl tracking-wide uppercase">
        {title}
      </span>
    </Link>
  );
}