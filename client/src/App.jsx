import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUpDoctor from "./pages/SignUpDoctor";
import SignUpUser from "./pages/SignUpUser";
import Dashboard from "./pages/Dashboard";
import { useSelector } from 'react-redux';
import BookAppointment from "./pages/BookAppointment";

export default function App() {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up/doctor" element={<SignUpDoctor/>} />
        <Route path="/sign-up/user" element={<SignUpUser/>} />
        {currentUser && <Route path={`${currentUser.role}`} element={<Dashboard/>} />}
        <Route path="/appointment/:doctorId" element={<BookAppointment/>} />
      </Routes>
    </BrowserRouter>
  )
}
