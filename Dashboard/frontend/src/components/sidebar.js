import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, Radio, ChevronLeft, ChevronRight } from "lucide-react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Toggle button */}
      <button
        className={`fixed top-6 ${
          isOpen ? "left-64" : "left-4"
        } z-50 p-2 bg-gray-800 rounded-lg transition-all duration-300 hover:bg-gray-700 shadow-lg`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
      >
        {isOpen ? (
          <ChevronLeft className="w-5 h-5 text-white" />
        ) : (
          <ChevronRight className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Main sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white transition-all duration-300 shadow-xl ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header section */}
          <div className="p-4 border-b border-gray-700">
            <h2 className={`text-xl font-bold ${!isOpen && "hidden"}`}>
              Dashboard
            </h2>
          </div>

          {/* Navigation section */}
          <nav className="flex-1 py-4 space-y-2 overflow-y-auto">
            <Link
              to="/"
              className="flex items-center px-4 py-3 mx-2 transition-all duration-200 rounded-lg hover:bg-gray-700 group"
            >
              <Home className="w-5 h-5 text-gray-300 group-hover:text-white" />
              <span
                className={`ml-3 text-gray-300 group-hover:text-white ${
                  !isOpen && "hidden"
                }`}
              >
                Home
              </span>
            </Link>

            <Link
              to="/websocket-test"
              className="flex items-center px-4 py-3 mx-2 transition-all duration-200 rounded-lg hover:bg-gray-700 group"
            >
              <Radio className="w-5 h-5 text-gray-300 group-hover:text-white" />
              <span
                className={`ml-3 text-gray-300 group-hover:text-white ${
                  !isOpen && "hidden"
                }`}
              >
                Notify Warehouse
              </span>
            </Link>
          </nav>
        </div>

        {/* Mobile menu button */}
        <button
          className="fixed p-2 transition-colors duration-200 bg-gray-800 rounded-lg top-4 right-4 md:hidden hover:bg-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 transition-opacity duration-300 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
