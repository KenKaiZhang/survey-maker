import { Sidebar } from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./subpages/Home";
import { Category } from "./subpages/Category";
import { Search } from "./subpages/Search";

export const Explore = () => {
  return (
    <div className="pt-[80px] min-h-full w-full grid grid-cols-5">
      <div className="pt-4 px-8 h-full col-span-1">
        <Sidebar />
      </div>

      <div className="p-4 h-full col-span-4">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/search"} element={<Search />} />
          <Route path={"/*"} element={<Category />} />
        </Routes>
      </div>
    </div>
  );
};
