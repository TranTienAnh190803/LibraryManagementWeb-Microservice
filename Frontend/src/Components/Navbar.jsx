import { FaBell, FaSearch, FaUser } from "react-icons/fa";
import UserService from "../Services/UserService";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    UserService.logout();
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="h-25 px-15 bg-black fixed top-0 right-0 left-0 flex justify-between z-1000">
      <div className="flex items-center">
        <img
          src="/Assets/Logo.jpg"
          className="h-full aspect-video mr-10 cursor-pointer"
        />
        {UserService.isAdmin() ? (
          <>
            <Link
              className="text-white text-xl/25 px-8 font-bold cursor-pointer hover:text-gray-500"
              to={"/admin/librarian-management"}
            >
              Librarians
            </Link>{" "}
            <Link
              className="text-white text-xl/25 px-8 font-bold cursor-pointer hover:text-gray-500"
              to={"/admin/member-management"}
            >
              Members
            </Link>
          </>
        ) : (
          <form>
            <input
              type="text"
              placeholder="Search"
              name="search"
              className="px-5 py-2 bg-white rounded-full"
            />
            <button className="ml-3 bg-yellow-500 p-3 rounded-full hover:bg-yellow-100 cursor-pointer">
              <FaSearch />
            </button>
          </form>
        )}
      </div>
      <div className="flex items-center">
        {UserService.isAuthenticate() ? (
          UserService.isAdmin() ? (
            <div className="text-white font-bold text-base">
              Welcome back, Admin |{" "}
              <button
                className="text-red-500 cursor-pointer hover:underline hover:underline-offset-5"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              {UserService.isMember() && (
                <button className="ml-5 bg-green-700 p-4 text-white text-xl rounded-full hover:bg-green-100 hover:text-black cursor-pointer">
                  <FaBell />
                </button>
              )}
              <button className="ml-5 bg-blue-700 p-4 text-white text-xl rounded-full hover:bg-blue-100 hover:text-black cursor-pointer">
                <FaUser />
              </button>
              <button
                className="ml-5 bg-red-700 p-4 text-white text-xl rounded-full hover:bg-red-100 hover:text-black cursor-pointer"
                onClick={handleLogout}
              >
                <FaArrowRightFromBracket />
              </button>
            </div>
          )
        ) : (
          <Link
            className="px-5 py-3 font-bold rounded-xl bg-green-600 text-white hover:bg-green-100 hover:text-black cursor-pointer"
            to={"/login"}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
