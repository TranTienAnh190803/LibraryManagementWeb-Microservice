import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import UserService from "./Services/UserService";
import HomePage from "./Pages/HomePage";
import LibrarianManagementPage from "./Pages/LibrarianManagementPage";
import MemberManagementPage from "./Pages/MemberManagementPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />

          {!UserService.isAuthenticate() && (
            <>
              <Route path="/login" element={<LoginPage />} />
            </>
          )}

          {UserService.isAdmin() && (
            <>
              <Route
                path="/admin/librarian-management"
                element={<LibrarianManagementPage />}
              />
              <Route
                path="/admin/member-management"
                element={<MemberManagementPage />}
              />
            </>
          )}

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
