import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { Create } from "./pages/Create";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
};
