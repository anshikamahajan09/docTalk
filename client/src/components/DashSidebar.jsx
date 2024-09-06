import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { HiUser, HiUserGroup, HiArrowSmRight } from "react-icons/hi";
import logo from "../assets/logo.png";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
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
    <div className="w-60 h-full bg-white fixed z-50 p-5">
      <div className="flex flex-col h-full ">
        {/* Logo/Branding Section */}
        <div className="flex items-center mb-5 bg-[#ecf1ff] py-3 px-2 rounded-2xl">
          <img
            className="md:h-8 md:w-8 h-8 w-8 mr-1"
            src={logo}
            alt="DocTalk logo"
          />
          <div className="flex items-center">
            <span className="text-[#0067ff] font-display md:text-lg text-lg font-bold">
              Doc
            </span>
            <span className="text-[#0067ff] font-display md:text-lg text-lg font-bold">
              Talk
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto">
          <nav className="mt-4 space-y-2">
            <Link to={`/${currentUser.role}?tab=dashboard`}>
              <div
                className={`flex items-center p-3 mb-2 rounded-2xl transition duration-75 ${
                  tab === "dashboard" || tab === ""
                    ? "bg-gradient-to-r from-[#0067ff] to-[#009dff] text-white"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <BiSolidDashboard
                  className={`text-2xl mr-3 ${
                    tab === "dashboard" || tab === ""
                      ? "text-white"
                      : "text-gray-400"
                  }`}
                />
                <span className="flex-1">Dashboard</span>
              </div>
            </Link>
            <Link to={`/${currentUser.role}?tab=profile`}>
              <div
                className={`flex items-center p-3 mb-2 rounded-2xl transition duration-75 ${
                  tab === "profile"
                    ? "bg-gradient-to-r from-[#0067ff] to-[#009dff] text-white"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <HiUser
                  className={`text-2xl mr-3 ${
                    tab === "profile" ? "text-white" : "text-gray-400"
                  }`}
                />
                <span className="flex-1">
                  {currentUser.role === "doctor" ? "Doctor" : "User"}
                </span>
              </div>
            </Link>
            {currentUser.role === "user" && (
              <Link to={`/${currentUser.role}?tab=doctors`}>
                <div
                  className={`flex items-center p-3 rounded-2xl transition duration-75 ${
                    tab === "doctors"
                      ? "bg-gradient-to-r from-[#0067ff] to-[#009dff] text-white"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <HiUserGroup
                    className={`text-2xl mr-3 ${
                      tab === "doctors" ? "text-white" : "text-gray-400"
                    }`}
                  />
                  <span className="flex-1">View Doctors</span>
                </div>
              </Link>
            )}
            <hr className="my-3 border-t-2 border-gray-200" />
            <div
              onClick={handleSignOut}
              className="flex items-center p-3 rounded-2xl transition duration-75 text-gray-900 hover:bg-gray-200 cursor-pointer"
            >
              <HiArrowSmRight className="text-lg mr-3" />
              <span>Sign Out</span>
            </div>
          </nav>
        </div>

      </div>
    </div>
  );
}
