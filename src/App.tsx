import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Answer } from "./pages/Answer";
import { Create } from "./pages/Create";
import { Explore } from "./pages/Explore";
import { NavigationBar } from "./components/NavigationBar";

export const App = () => {
  return (
    <div className="max-w-[100vw] min-h-[100vh] bg-gradient-to-b from-purple-800 to-red-500">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/answer/*" element={<Answer />} />
          <Route path="/create" element={<Create />} />
          <Route path="/explore/*" element={<Explore />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
