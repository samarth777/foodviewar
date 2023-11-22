'use client'

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-secondary text-black border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-semibold whitespace-nowrap ml-2">
            FoodViewAR
          </span>
        </Link>
        <button
          onClick={handleToggle}
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-black rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011 1h12a1 1 0 110-2H4a1 1 0 01-1 1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link href="/" className="links">
                Home
              </Link>
            </li>
            <li>
              <Link href="/restaurants" className="links">
                Restaurants
              </Link>
            </li>
            </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;