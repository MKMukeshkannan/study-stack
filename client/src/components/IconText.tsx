import { ReactNode } from "react";

interface props {
  text: string;
  icon: ReactNode;
}

export default function IconText({ text, icon }: props) {
  return (
    <a href="#" className="text-2xl font-bold flex items-center">
      <span className="pr-2">{icon}</span>
      {text}
    </a>
  );
}
