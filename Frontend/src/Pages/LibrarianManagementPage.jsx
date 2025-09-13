import { FaSearch } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import UserService from "../Services/UserService";
import { useEffect, useState } from "react";
import AdminTable from "../Components/AdminTable";

export default function LibrarianManagementPage() {
  document.title = "Admin";
  const [librarianList, setLibrarianList] = useState([]);
  const [noUser, setNoUser] = useState({
    check: false,
    message: "",
  });

  const fetchLibrarian = async () => {
    const response = await UserService.getAllUser("LIBRARIAN");
    if (response.statusCode === 200 && response.success) {
      setLibrarianList(response.dataList);
    } else if (response.statusCode === 200 && !response.success) {
      setNoUser({ check: true, message: response.message });
    } else {
      alert(response.message);
    }
  };

  useEffect(() => {
    fetchLibrarian();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mt-35 mx-30 p-8 rounded-xl bg-white/80 overflow-x-auto">
        <h1 className="text-5xl font-bold mb-5">Librarian</h1>
        <div className="flex justify-between items-center mb-10">
          <form className="input-box w-1/2!">
            <input
              type="text"
              placeholder="Find Someone"
              className="input-value-reverse font-bold"
              name="username"
              required
            />
            <FaSearch className="input-icon-reverse" />
          </form>
          <button className="text-xl font-bold py-3 px-4 bg-green-700 text-white rounded-md cursor-pointer hover:bg-green-200 hover:text-black">
            + Register Librarian
          </button>
        </div>
        {noUser.check ? (
          <h1 className="text-center font-bold text-2xl text-red-500">
            {noUser.message}
          </h1>
        ) : (
          <AdminTable data={librarianList} />
        )}
      </div>
    </div>
  );
}
