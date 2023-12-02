import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  title: string;
  linkTo: string;
  linkTitle: string
}

export default function LayoutBooks(props: Readonly<Props>) {
  const { children, title, linkTo, linkTitle } = props;
  return (
    <div className="my-4 p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="font-bold text-xl text-white">{title}</p>
        <Link to={linkTo}>
          <Button variant="outline" className="font-bold">
            {linkTitle}
          </Button>
        </Link>
      </div>
      {children}
    </div>
  );
}
