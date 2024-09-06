// import React from "react";
// import { Link } from "react-router-dom";
// import logo from "../assets/logo.png";
// import { Button, Navbar } from "flowbite-react";
// import {useSelector} from 'react-redux';
// import { Avatar, Dropdown } from "flowbite-react";
// import { signOutSuccess } from "../redux/user/userSlice";
// import { useDispatch } from "react-redux";

// export default function Header() {
//   const {currentUser} = useSelector((state) => state.user);

//   const dispatch = useDispatch();

//   const handleSignOut =async () => {
//     try {
//       const res = await fetch("/api/user/signout",{
//         method:'POST'
//       });
//       const data = await res.json();
//       if(data.success === false){
//         console.log(data.message);
//       }
//       if(res.ok){
//         dispatch(signOutSuccess());
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

//   return (
//     <Navbar className=" xl:mx-32 md:my-0 my-2 ">
//       <Link
//         to="/"
//         className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white flex items-center"
//       >
//         <img className="md:h-16 md:w-16 h-12 w-12" src={logo} />
//         <span className="text-cyan-600 font-display md:text-3xl text-2xl font-bold">
//           Doc
//         </span>
//         <span className="text-cyan-600 font-display md:text-3xl text-2xl font-semibold">
//           Talk
//         </span>
//       </Link>
//       <div className="flex gap-2 md:order-2">
//         {currentUser ? 
//         <>
//         <div className="hidden md:inline-block">
//         <span className="font-semibold text-xs flex mt-3">
//            {currentUser.role == "doctor"
//              ? "Doctor"
//              : "User"}
//            : @{currentUser.name}
//          </span>
//         </div>
//          <Dropdown
//            arrowIcon={false}
//            inline
//            label={<Avatar  img={currentUser.profilePicture} rounded />}
//          >
//            <Dropdown.Header>
//              <span className="block">{currentUser.name}</span>
//              <span className="block font-semibold">
//                {currentUser.email}
//              </span>
//            </Dropdown.Header>
//            {/* <Link to={`/${currentUser.userType}?tab=profile`}>
//              <Dropdown.Item>Profile</Dropdown.Item>
//            </Link> */}
//            <Dropdown.Divider />
//            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
//          </Dropdown>
//        </>
//         :<Link to="/sign-in">
//           <Button gradientDuoTone="greenToBlue" >
//             Sign In
//           </Button>
//         </Link> }

//         <Navbar.Toggle />
//       </div>
//       <Navbar.Collapse>
//         <Link to="/" className="text-lg font-semibold text-cyan-700 ">Home</Link>

//         <Link to="/services" className="text-lg font-semibold text-cyan-700">Services</Link>

//         <Link to="/contact" className="text-lg font-semibold text-cyan-700">Contact</Link>

//         <Link to="/about" className="text-lg font-semibold text-cyan-700">About</Link>

//       </Navbar.Collapse>
//     </Navbar>
//   );
// }
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      if (res.ok) {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 top-0 ">
      <div className="xl:mx-32 md:my-0 my-2 flex justify-between items-center p-4">
        <Link
          to="/"
          className="flex items-center"
        >
          <img className="md:h-16 md:w-16 h-12 w-12" src={logo} alt="DocTalk logo" />
          <div className="flex items-center">
            <span className="text-cyan-600 font-display md:text-3xl text-2xl font-bold">Doc</span>
            <span className="text-cyan-600 font-display md:text-3xl text-2xl font-semibold">Talk</span>
          </div>
        </Link>
        <div className="md:hidden flex items-center">
          {currentUser && (
            <img src={currentUser.profilePicture} alt="Avatar" className="rounded-full h-8 w-8 mr-2" />
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-cyan-700"
          >
            ☰
          </button>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="text-lg font-semibold text-cyan-700">Home</Link>
          <Link to="/services" className="text-lg font-semibold text-cyan-700">Services</Link>
          <Link to="/contact" className="text-lg font-semibold text-cyan-700">Contact</Link>
          <Link to="/about" className="text-lg font-semibold text-cyan-700">About</Link>
          {currentUser && (
            <>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs">
                  {currentUser.role === "doctor" ? "Doctor" : "User"}: @{currentUser.name}
                </span>
                <div className="relative">
                  <img src={currentUser.profilePicture} alt="Avatar" className="rounded-full h-8 w-8" />
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 hidden">
                    <div className="px-4 py-2">
                      <span className="block">{currentUser.name}</span>
                      <span className="block font-semibold">{currentUser.email}</span>
                    </div>
                    <hr />
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-cyan-700 hover:bg-gray-100"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {!currentUser && (
            <Link to="/sign-in">
              <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-md">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-20`}>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="text-cyan-700 absolute top-4 right-4"
        >
          ✕
        </button>
        <div className="flex flex-col items-start p-4 mt-12">
          <Link
            to="/"
            className="text-lg font-semibold text-cyan-700 mb-4 hover:text-blue-500 hover:underline transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="text-lg font-semibold text-cyan-700 mb-4 hover:text-blue-500 hover:underline transition-colors duration-200"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="text-lg font-semibold text-cyan-700 mb-4 hover:text-blue-500 hover:underline transition-colors duration-200"
          >
            Contact
          </Link>
          <Link
            to="/about"
            className="text-lg font-semibold text-cyan-700 mb-4 hover:text-blue-500 hover:underline transition-colors duration-200"
          >
            About
          </Link>
          {currentUser && (
            <>
              <hr className="w-full my-4"/>
              <div className="flex flex-col items-start">
                <span className="block font-semibold">{currentUser.name}</span>
                <span className="block font-semibold">{currentUser.email}</span>
                <button
                  className="w-full text-left mt-4 text-sm text-cyan-700 hover:bg-gray-100"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            </>
          )}
          {!currentUser && (
            <Link to="/sign-in">
              <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
      {/* Overlay for Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </nav>
  );
}
