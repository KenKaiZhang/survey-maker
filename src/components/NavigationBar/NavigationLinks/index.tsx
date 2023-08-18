import { Link } from "react-router-dom";
import { capitalize } from "../../../utils/capitalize";

export interface NavigationLinkProps {
  id: string;
  href: string;
  inner: any;
}

export const NavigationLink = (props: NavigationLinkProps) => {
  const { id, href, inner } = props;
  return (
    <Link to={href} className="relative h-[60px] w-[60px] center rounded-[10px] duration-[0.5s] hover:bg-black/25">
      <div className="mt-4 h-full"> {inner}</div>
      <p className="absolute bottom-0 text-[0.8rem]">{capitalize(id)}</p>
    </Link>
  );
};
