import React, { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/doctor/get-doctors");
        const data = await res.json();
        setLoading(false);
        setDoctors(data);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };
    fetchDoctors();
  }, []);
  return (
    <div className="p-7 md:pl-64 w-full bg-[#fafbff]">
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
        </div>
      )}
      <h1 className="text-2xl font-semibold text-gray-800">Doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {doctors.map((doctor) => (
          <div
            className="bg-white shadow-lg rounded-2xl flex flex-col gap-4 pt-8"
            key={doctor._id}
          >
            <div className="w-36 h-36  flex items-center justify-center rounded-full mx-auto shadow-lg shadow-[#c1d6f5]">
              <img
                src={doctor.profilePicture}
                alt="doctor"
                className="w-32 h-32 rounded-full mx-auto "
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800 mt-2 text-center">
                {doctor.name}
              </p>
              <p className="text-sm text-gray-600 text-center">
                {doctor.experience} years experience
              </p>
            </div>
            <div className="bg-[#ecf1ff] px-5 py-1 rounded-lg flex items-center justify-center mx-auto">
            <p className="text-xs font-semibold text-[#0067ff] text-center tracking-widest">
              {doctor.specialization.toUpperCase()}
            </p>
            </div>
            <Link to = {`/appointment/${doctor._id}`}>
              <button className="bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-500 transiton duration-300 rounded-bl-2xl rounded-br-2xl py-2 w-full">
                Make an appointment
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
