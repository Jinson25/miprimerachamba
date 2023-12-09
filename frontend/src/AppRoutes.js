import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePages from "./pages/Home/HomePages";
import BookPage from "./pages/Book/BookPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePages />} />
      <Route path="/search/:searchTerm" element={<HomePages />} />
      <Route path="/book/:id" element={<BookPage />} />
    </Routes>
  );
}
