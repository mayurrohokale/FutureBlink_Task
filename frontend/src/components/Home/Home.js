import { useAppState } from "../../utils/appState";
import { Link } from "react-router-dom";
import Sequence from "./Sequence";
import Cstbutton from "../reusables/CstButton";

export default function Home() {
  const { user, setUser } = useAppState();

  console.log("Hello from Home", user);

  return (
    <div className="w-full h-[100vh]">
      {!user ? (
        <div>
          <div className="flex flex-col items-center justify-center text-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6 text-black font-courier">Future Blink</h1>
            <div className="px-[250px]">
              <p className="text-lg mb-6 font-medium font-inter">
                Design and implement your email marketing sequences with our
                easy-to-use visual flowchart interface. Start creating automated
                email campaigns and grow your business!
              </p>
            </div>
            <div className="flex space-x-4">
              <Link to="/login">
                <Cstbutton
                  text="Login"
                  className="w-32 bg-black hover:bg-gray-700 border-[2px] border-black text-white font-bold p-4 rounded-md"
                />
              </Link>
              <Link to="/register">
                <Cstbutton
                  text="Sign Up"
                  className="w-32 border-black rounded-md border-[2px] p-4 font-bold hover:bg-gray-300"
                />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Sequence />
      )}
    </div>
  );
}
