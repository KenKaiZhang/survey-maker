import { useEffect, useState } from "react";
import { faBaseball, faFilm, faGamepad, faHome, faMusic, faRandom, faSearch, faShirt } from "@fortawesome/free-solid-svg-icons";
import { Line } from "../../../../components/Line";
import { SidebarSection } from "../SidebarSection";

export const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<string>("home");

  const handleClick = (e: any) => {
    if (e.target.localName === "a") {
      setActiveTab(e.target.id);
    }
  };

  useEffect(() => {
    const oldActive: HTMLElement = document.querySelector(".active") as HTMLElement;
    if (oldActive) {
      oldActive.classList.remove("active");
      oldActive.style.background = "none";
    }

    const tab: HTMLElement = document.querySelector(`#${activeTab}`) as HTMLElement;
    if (tab) {
      tab.classList.add("active");
      tab.style.background = "rgba(0, 0, 0, 0.25)";
    }
  }, [activeTab]);

  const defaultTabs = [
    { id: "home", name: "Home", icon: faHome, href: "" },
    { id: "search", name: "Search", icon: faSearch, href: "search" },
    { id: "random", name: "Random", icon: faRandom },
  ];
  const exploreTabs = [
    { id: "music", name: "Music", icon: faMusic, href: "music" },
    { id: "gaming", name: "Gaming", icon: faGamepad, href: "gaming" },
    { id: "fashion", name: "Fashion", icon: faShirt, href: "fashion" },
    { id: "sports", name: "Sports", icon: faBaseball, href: "sports" },
    { id: "movies-tv", name: "Movies & TV", icon: faFilm, href: "movies-tv" },
  ];

  return (
    <div className="fixed" onClick={handleClick}>
      <SidebarSection id="default-tab" tabs={defaultTabs} />
      <Line />
      <p className="text-[1.2rem] font-bold my-4">Explore</p>
      <SidebarSection id="default-tab" tabs={exploreTabs} />
    </div>
  );
};
