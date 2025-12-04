import { Link } from 'react-router-dom';

export default function MenuCard({ title, icon, to }) {
  return (
    <Link 
      to={to} 
      className="
        group
        flex flex-col items-center justify-center 
        w-72 h-72               /* Mismo tamaño que el del médico */
        bg-white 
        border border-gray-200 
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
      <div className="mb-8"> 
        <img 
          src={icon} 
          alt={title} 
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