import { Link } from "react-router-dom";
import React from "react";

interface HeaderWithLinkProps {
  title: string;
  linkTo: string;
  linkText?: string;
}

const SubHeaderConEnlaces: React.FC<HeaderWithLinkProps> = ({
  title,
  linkTo,
  linkText,
}) => {
  return (
    <div className="flex justify-between p-4 text-black border-b-2 text-sm">
      <div>
        <div className="uppercase font-medium">{title}</div>
      </div>
      <div>
        <Link to={linkTo} className="text-[#009EFB]">{linkText}</Link>
      </div>
    </div>
  );
};

export default SubHeaderConEnlaces;
