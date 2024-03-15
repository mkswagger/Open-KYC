"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SlMenu } from "react-icons/sl";
import { BsBell } from "react-icons/bs";
import { PiPenNibBold, PiArrowBendDoubleUpLeftDuotone } from "react-icons/pi";
import logo from "/public/sc-logo.png";
import { FaRegUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogin = () => {
    setShowLogin(!showLogin);
    if (showRegister) setShowRegister(false);
  };

  const handleRegister = () => {
    setShowRegister(!showRegister);
    if (showLogin) setShowLogin(false);
  };

  //   const links = [
  // { name: "", href: "/" },
  // { name: "Your Reading List", href: "/readinglist" },
  // { name: "Explore Creators", href: "/creators" },
  //   ];
  return (
    <header>
      <nav className="flex justify-between items-end border-b border-black/20 sm:pb-5 pb-3">
        <div className="flex items-center">
          <h3 className="flex items-end text-2xl font-bold mr-2">
            <Image src={logo} alt="me" width={40} height={40} />
            OpenKYC
          </h3>
          {/* <ul className="hidden md:flex mb-[3px]">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm lg:text-md font-semibold mx-2"
              >
                {link.name}
              </Link>
            ))}
          </ul> */}
        </div>
        <div className=" rounded-full">
          <FaRegUserCircle size={30} />
        </div>
      </nav>
      {/* <div
        className={`${showMenu ? "md:hidden left-0 transition ease-in duration-500" : "left-0 -translate-x-[700px] transition ease-out duration-500"} fixed z-20 top-0 flex justify-center items-center h-screen bg-white text-black rounded-l-md shadow-2xl min-h-screen sm:w-[385px] w-full`}
      >
        <ul className="flex flex-col justify-center items-center md:hidden mb-[3px]">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-md lg:text-md font-semibold underline m-2"
            >
              {link.name}
            </Link>
          ))}
        </ul>
        <button onClick={handleMenu} className="fixed top-5 left-5 text-3xl">
          <PiArrowBendDoubleUpLeftDuotone />
        </button>
      </div> */}
    </header>
  );
}
