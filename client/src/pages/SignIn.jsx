import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Modal, Button } from "flowbite-react";
import signinImage from "../assets/sign-in.jpg";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        const { password, ...rest } = data;
        dispatch(signInSuccess(rest));
        navigate(`/${data.role}`);
      } else {
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f1f4ff] p-4">
      <div className="bg-white rounded-3xl shadow-lg sha shadow-[#a4c7fc] overflow-hidden w-full max-w-4xl p-8">
        <h1 className="text-4xl font-semibold text-center py-4 text-[#009dff]">
          Sign In
        </h1>
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/2 w-full">
            <img
              src={signinImage}
              alt="Sign In"
              className="object-cover w-full h-full md:rounded-none md:rounded-l-lg rounded-b-lg"
            />
          </div>

          {/* Form Section */}
          <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="border rounded-lg px-4 py-2 w-full"
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="border rounded-lg px-4 py-2 w-full"
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-[#0067ff] to-[#009dff] hover:bg-gradient-to-l hover:from-[#0053e6] hover:to-[#007acc] transition-colors duration-300 text-white rounded-lg px-4 py-2 w-full"
              >
                Sign In
              </button>

              <p className="text-center">
                Don't have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setOpenModal(true)}
                >
                  Create account
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              How would you like to proceed?
            </h3>
            <div className="flex justify-center gap-4">
              <Link to="/sign-up/doctor">
                <Button className="bg-gradient-to-r from-[#0067ff] to-[#009dff] hover:bg-gradient-to-l hover:from-[#0053e6] hover:to-[#007acc] transition-colors duration-300">As a Doctor</Button>
              </Link>
              <Link to="/sign-up/user">
                <Button className="bg-gradient-to-r from-[#0067ff] to-[#009dff] hover:bg-gradient-to-l hover:from-[#0053e6] hover:to-[#007acc] transition-colors duration-300">As a User</Button>
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
