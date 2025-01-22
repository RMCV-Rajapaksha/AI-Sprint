import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-screen w-[400px] absolute left-0 top-0 bg-gray-900  transition"></div>
  );
};

export default Navbar;
