import { FaSearch } from "react-icons/fa";
import UserService from "../Services/UserService";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="p-3 px-15 bg-black fixed top-0 right-0 left-0 flex justify-between">
      <div className="flex items-center">
        <img
          src="/Assets/Logo.jpg"
          className="w-1/4 aspect-video mr-10 cursor-pointer"
        />
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
      </div>
      <div className="flex items-center">
        {UserService.isAuthenticate() ? (
          <div></div>
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
