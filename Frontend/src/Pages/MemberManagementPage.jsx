import { FaSearch } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import UserService from "../Services/UserService";
import { useEffect, useState } from "react";
import AdminTable from "../Components/AdminTable";
import AdminPopup from "../Components/AdminPopup";

export default function MemberManagementPage() {
  document.title = "Admin";
  const [MemberList, setMemberList] = useState([]);
  const [noUser, setNoUser] = useState({
    check: false,
    message: "",
  });
  const [popup, setPopup] = useState(false);
  const [registrationForm, setRegistrationform] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "default",
    dateOfBirth: null,
    address: "",
  });
  const [isWorking, setIsWorking] = useState(false);

  const fetchMember = async () => {
    const response = await UserService.getAllUser("MEMBER");
    if (response.statusCode === 200 && response.success) {
      setMemberList(response.dataList);
    } else if (response.statusCode === 200 && !response.success) {
      setNoUser({ check: true, message: response.message });
    } else {
      alert(response.message);
    }
  };

  useEffect(() => {
    fetchMember();
  }, []);

  const handlePopup = () => {
    setPopup(!popup);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsWorking(true);
    const response = await UserService.registration(false, registrationForm);
    alert(response.message);
    setIsWorking(false);
    if (response.success) {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mt-35 mx-30 p-8 rounded-xl bg-white/80 overflow-x-auto">
        <h1 className="text-5xl font-bold mb-5">Member</h1>
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
          <button
            className="text-xl font-bold py-3 px-4 bg-green-700 text-white rounded-md cursor-pointer hover:bg-green-200 hover:text-black"
            onClick={handlePopup}
          >
            + Register Member
          </button>
        </div>
        {noUser.check ? (
          <h1 className="text-center font-bold text-2xl text-red-500">
            {noUser.message}
          </h1>
        ) : (
          <AdminTable data={MemberList} fetchData={fetchMember} />
        )}
      </div>
      {popup && (
        <AdminPopup
          registrationForm={registrationForm}
          setRegistrationForm={setRegistrationform}
          closePopup={handlePopup}
          handleRegister={handleRegister}
          isProcessing={isWorking}
        />
      )}
    </div>
  );
}
