import { Link } from "react-router-dom";
import { useAppState } from "../../utils/appState";
import Cstbutton from "../reusables/CstButton";




export default function Header() {

  const {user, setUser} = useAppState();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  }


  return <div className="border-b-black border-[1px] fixed h-16 w-full items-center justify-between flex px-8 z-30 bg-white">
    <h1 className="font-courier font-bold text-black"><Link to="/">Future Blink</Link></h1>
    <div>
      {user? (
        <div className="flex gap-2 items-center">
          <h1>{user.name}</h1>
          <Cstbutton text="Logout" className="w-24 bg-gray-200 border-[1px] p-2 text-black border-black hover:bg-black hover:text-white font-bold rounded-md font-mono" 
          onClick={handleLogout}/>
        </div>
      ):(
        <div className="flex space-x-4">
              <Link to="/login">
                <Cstbutton
                  text="Login"
                  className="w-20 bg-black hover:bg-gray-700 border-[2px] border-black text-white font-bold p-2 rounded-md"
                />
              </Link>
              <Link to="/register">
                <Cstbutton
                  text="Sign Up"
                  className="w-20 border-black rounded-md border-[2px] p-2 font-bold hover:bg-gray-300"
                />
              </Link>
            </div>
      )}
    </div>
  </div>;
}
