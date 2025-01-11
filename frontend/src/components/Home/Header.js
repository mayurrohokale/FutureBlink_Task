import { Link } from "react-router-dom";
import { useAppState } from "../../utils/appState";
import { useState } from "react";
import { FiUser } from "react-icons/fi"; 
import Cstbutton from "../reusables/CstButton";

export default function Header() {
  const { user, setUser } = useAppState();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setDropdownVisible(false); 
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="border-b-black border-[1px] fixed h-16 w-full items-center justify-between flex px-1 md:px-8 z-30 bg-white">
      <h1 className="font-courier font-bold text-black md:text-base text-sm">
        <Link to="/">Future Blink</Link>
      </h1>
      <div>
        {user ? (
          <div className="relative flex items-center">
        
            <div
              className="flex  items-center cursor-pointer"
              onClick={toggleDropdown}
            >
              <FiUser size={25} className="text-black" />
              <h1 className="md:text-sm text-xs font-josiefin">{user.name}</h1>
            </div>
           
            {dropdownVisible && (
              <div className="absolute right-0 mt-[105px]  bg-white border border-gray-300 rounded-md shadow-md z-50">
                <button
                  className="w-full px-4 py-2  text-left text-black hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex space-x-2 md:space-x-4">
            <Link to="/login">
              <Cstbutton
                text="Login"
                className="w-14 md:w-20 bg-blue-500 hover:bg-blue-600 border-[2px] border-blue-500 text-white font-bold p-1 md:p-2 rounded-md"
              />
            </Link>
            <Link to="/register">
              <Cstbutton
                text="Sign Up"
                className="border-black rounded-md border-[2px] p-1 md:p-2 font-bold hover:bg-gray-300"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
