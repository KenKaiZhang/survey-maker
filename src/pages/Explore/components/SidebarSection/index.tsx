import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";

export interface SidebarSectionProps {
  id: string;
  tabs: { id: string; name: string; icon: IconDefinition; href?: string }[];
}

export const SidebarSection = (props: SidebarSectionProps) => {
  const { id, tabs } = props;
  return (
    <ul id={id} className="mb-4">
      {tabs.map((tab) => {
        const { id, name, icon, href } = tab;
        return (
          <Link
            id={id}
            key={name}
            to={href}
            className="flex mb-2 p-4 h-[35px] w-full rounded-[10px] gap-4 hover:bg-black/25 duration-[0.5s] cursor-pointer"
          >
            <div className="center pointer-events-none">
              <FontAwesomeIcon className="center pointer-events-none" icon={icon} />
            </div>
            <div className="center pointer-events-none">{name}</div>
          </Link>
        );
      })}
    </ul>
  );
};
