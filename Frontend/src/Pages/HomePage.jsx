import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import UserService from "../Services/UserService";
import { useEffect } from "react";

export default function HomePage() {
  document.title = "Home";
  return (
    <>
      <Navbar />
    </>
  );
}
