import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import UserService from "../Services/UserService";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  document.title = "Login";
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await UserService.login(loginForm);
    if (response.success) {
      localStorage.setItem("token", response.data.token);
      if (UserService.isAdmin()) {
        navigate("/admin/librarian-management");
      } else {
        navigate("/");
      }
    } else {
      alert(response.message);
    }
  };

  return (
    <div
      className={`h-screen flex items-center bg-cover bg-center bg-[url(/Assets/Login.jpg)]`}
    >
      <div className="h-full w-2/5 flex items-center justify-center border-r-2 border-white rounded-r-[35%] p-8 bg-white/70 backdrop-blur-md">
        <form className="w-4/5" onSubmit={handleSubmit}>
          <h1 className="text-5xl font-bold text-center">Login</h1>
          <hr className="mt-3 mb-8" />
          <div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                className="input-value font-bold"
                name="username"
                value={loginForm.username}
                onChange={handleInputChange}
                required
              />
              <FaUser className="input-icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                className="input-value font-bold"
                name="password"
                value={loginForm.password}
                onChange={handleInputChange}
                required
              />
              <FaLock className="input-icon" />
            </div>
            <button className="font-bold w-full p-3 bg-gray-800 text-white hover:bg-gray-500 hover:text-gray-50 cursor-pointer">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
