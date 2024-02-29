import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../components/Main/Main";
import Chat from "../components/Chat/Chat";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default AppRoutes;
