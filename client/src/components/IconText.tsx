import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface props {
  text: string;
  icon: ReactNode;
  link: string
}

export default function IconText({ text, icon, link }: props) {
  return (
    <Link to={link} className="text-2xl font-bold flex items-center">
      <span className="pr-2">{icon}</span>
      {text}
    </Link>
  );
}
