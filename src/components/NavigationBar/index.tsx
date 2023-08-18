import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { NavigationLink } from "./NavigationLinks";

export const NavigationBar = () => {
  const styles: string = "h-[45%]";
  const links: { id: string; href: string; inner: any }[] = [
    { id: "create", href: "/create", inner: <FontAwesomeIcon icon={faPlus} className={styles} /> },
    { id: "explore", href: "/explore", inner: <FontAwesomeIcon icon={faCompass} className={styles} /> },
  ];

  return (
    <div className="fixed z-50 h-[80px] w-full bg-gradient-to-b from-black/10 to-white/0 backdrop-blur-[1px]">
      <div className="absolute h-full center right-4 gap-4">
        {links.map((link, i) => {
          const { id, href, inner } = link;
          return <NavigationLink key={i} id={id} href={href} inner={inner} />;
        })}
      </div>
    </div>
  );
};
