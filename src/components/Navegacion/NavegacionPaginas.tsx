import React from "react";
import { Link } from "react-router-dom";

interface NavigationItem {
  to: string;
  text: string;
  icon?: React.ReactElement; // Hace que la propiedad icon sea opcional
}

interface BreadcrumbsProps {
  items: NavigationItem[];
}

const NavegacionPaginas: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className="flex gap-2 text-slate-500 pb-6">
      {items.map((item, index) => (
        <React.Fragment key={item.to}>
          {index > 0 && <span>/</span>}
          <Link
            to={item.to}
            className="hover:text-[#009EFB] flex gap-1 items-center"
          >
            {item.icon && item.icon} {item.text}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default NavegacionPaginas;
