import { useRef } from "react";
import {
  FaCalendar,
  FaLock,
  FaMailBulk,
  FaMapPin,
  FaUser,
} from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

export default function AdminPopup({
  registrationForm,
  setRegistrationForm,
  closePopup,
  handleRegister,
  isProcessing,
}) {
  const dateInputRef = useRef(null);

  const handleDateIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker?.();
      dateInputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegistrationForm({ ...registrationForm, [name]: value });
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/50 z-1001"
      onClick={closePopup}
    >
      <form
        className="min-w-1/2 bg-white rounded-xl p-5 relative overflow-hidden"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={handleRegister}
      >
        <button
          className="absolute top-0 right-0 p-1 font-bold text-4xl bg-red-600 text-white hover:bg-gray-500 hover:text-black cursor-pointer"
          onClick={closePopup}
        >
          <IoIosClose />
        </button>
        <h1 className="font-bold text-3xl px-3 pb-3">Registration</h1>
        <hr />
        <div className="px-3 py-7 h-65 flex flex-col justify-between">
          <div className="flex justify-between w-full">
            <div className="input-box basis-[49%] my-0!">
              <input
                type="text"
                placeholder="Username"
                className="input-value font-bold"
                name="username"
                value={registrationForm.username}
                onChange={handleInputChange}
                required
              />
              <FaUser className="input-icon" />
            </div>
            <div className="input-box basis-[49%] my-0!">
              <input
                type="text"
                placeholder="Fullname"
                className="input-value font-bold"
                name="fullname"
                value={registrationForm.fullname}
                onChange={handleInputChange}
                required
              />
              <FaPerson className="input-icon" />
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="input-box basis-[49%] my-0!">
              <input
                type="date"
                className="input-value font-bold"
                name="dateOfBirth"
                value={registrationForm.dateOfBirth}
                onChange={handleInputChange}
                ref={dateInputRef}
                required
              />
              <FaCalendar
                className="input-icon"
                onClick={handleDateIconClick}
              />
            </div>
            <div className="input-box basis-[49%] my-0!">
              <input
                type="text"
                placeholder="Address"
                className="input-value font-bold"
                name="address"
                value={registrationForm.address}
                onChange={handleInputChange}
                required
              />
              <FaMapPin className="input-icon" />
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="input-box basis-[49%] my-0!">
              <input
                type="text"
                placeholder="Email"
                className="input-value font-bold"
                name="email"
                value={registrationForm.email}
                onChange={handleInputChange}
                required
              />
              <FaMailBulk className="input-icon" />
            </div>
            <div className="input-box basis-[49%] my-0!">
              <input
                type="password"
                placeholder="Password"
                className="input-value font-bold"
                name="password"
                value={registrationForm.password}
                readOnly
                disabled
              />
              <FaLock className="input-icon" />
            </div>
          </div>
        </div>
        <div className="px-3 mt-2 mb-3">
          <button
            className="w-full py-3 font-bold bg-black text-white hover:bg-gray-500 hover:text-black cursor-pointer disabled:cursor-default disabled:bg-black/20 disabled:text-black"
            disabled={isProcessing}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
