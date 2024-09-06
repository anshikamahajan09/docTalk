import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import DashSidebar from "../components/DashSidebar";
import DashboardDoctor from "../components/DashboardDoctor";
import DashboardUser from "../components/DashboardUser";
import Profile from "../components/Profile";
import DoctorsPage from "../components/DoctorsPage";

export default function Dashboard() {
    const location = useLocation();
    const [tab, setTab] = useState("");
    const {currentUser} = useSelector((state) => state.user);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

  return (
    <div className="min-h-screen flex flex-row">
        <DashSidebar/>
        {(currentUser.role === 'doctor') && (tab === 'dashboard' || !tab) && <DashboardDoctor />}
        {(currentUser.role === 'user') && (tab === 'dashboard' || !tab) && <DashboardUser />}
        {tab === 'profile' && <Profile />}
        {tab === 'doctors' && <DoctorsPage />}
    </div>
  )
}
