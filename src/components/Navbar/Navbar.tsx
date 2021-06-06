import { useState } from "react";

function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const toggleNavbar = () => setIsNavbarOpen((isNavbarOpen) => !isNavbarOpen);
  const linkStyles = "text-lg font-bold text-gray-800";

  return (
    <div className="flex flex-col">
      <button className="z-10 self-end" onClick={toggleNavbar}>
        <img src="img/hamburger.svg" className="w-6" />
      </button>
      <h1 className="-mt-4 text-2xl text-white">Rule of thumb.</h1>
      <div
        className={`shadow-md bg-gray-50 bottom-0 duration-500 transition-all fixed top-0 z-50 ${
          isNavbarOpen ? "right-0" : "-right-56"
        }`}>
        <div className="flex justify-end mt-4 mr-4" onClick={toggleNavbar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <ul className="p-10 space-y-5">
          <li className={linkStyles}>Past Trials</li>
          <li className={linkStyles}>How It Works</li>
          <li className={linkStyles}>Login / Sign Up</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
