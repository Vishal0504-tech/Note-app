import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-700">
      <nav className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <div className="brand">
            <span className=" md:text-5xl font-bold mb-4 text-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    ThinkBord
                  </span>
          </div>
          <div className="actions">
            <div className="flex items-center gap-4">
              <Link 
                to={"/create"} 
                className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 hover:shadow-lg text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
                aria-label="Create new note"
              >
                <PlusIcon className="w-5 h-5" />
                <span>New Note</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;