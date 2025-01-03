import React from "react";

const Navbar = () => {
  return (
    <div className="max-w-7xl mx-auto flex justify-between items-center py-5">
      <div className="flex-1 text-xl font-bold cursor-pointer hover:scale-105 transition flex items-center justify-start">
        AR GLASSES
      </div>
      <div className="flex-1">
        <nav className="w-full">
          <ul className="flex justify-between">
            <li className="cursor-pointer border-clip-path w-28 flex justify-center hover:bg-black hover:text-white transition">
              Home
            </li>
            <li className="cursor-pointer border-clip-path w-28 flex justify-center hover:bg-black hover:text-white transition">
              About
            </li>
            <li className="cursor-pointer border-clip-path w-28 flex justify-center hover:bg-black hover:text-white transition">
              Help
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
