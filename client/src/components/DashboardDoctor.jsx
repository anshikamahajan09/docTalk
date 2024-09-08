import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function DashboardDoctor() {
  const [appointment, setAppointment] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isJoinDisabled, setIsJoinDisabled] = useState(true); // For Join button state

  useEffect(() => {
    // Fetch the latest appointment from the server
    const fetchNextAppointment = async () => {
      try {
        const response = await fetch('/api/appointment/next');
        const data = await response.json();
        console.log('Fetched appointment data:', data);

        // Store the appointment data
        setAppointment(data);

        // Extract start time from the timeSlot and format date
        const [startTime] = data.timeSlot.split('-'); // get start time from timeSlot
        const appointmentDateTime = new Date(`${data.date.split('T')[0]}T${startTime}:00`); // combine date and start time

        // Start the countdown
        startCountdown(appointmentDateTime);
      } catch (error) {
        console.error('Error fetching appointment:', error);
      }
    };

    fetchNextAppointment();
  }, []);

  // Function to start the countdown timer
  const startCountdown = (appointmentDateTime) => {
    const updateTimer = () => {
      const now = new Date();
      const timeLeft = appointmentDateTime - now;

      if (timeLeft <= 0) {
        setTimeRemaining('Appointment time!');
        setIsJoinDisabled(false); // Enable join button
        clearInterval(timerInterval);
        return;
      }

      // Convert timeLeft into hours, minutes, and seconds
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      // Update the timeRemaining state
      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    const timerInterval = setInterval(updateTimer, 1000);

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(timerInterval);
  };

  return (
    <div className="pl-64 p-6 bg-[#e6f0ff] w-full">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {appointment ? (
        <div>
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
          {/* Left section with doctor name and appointment info */}
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">Dr. {appointment.doctor.name}</h2> {/* Doctor's name */}
            <p className="text-gray-700 mt-2">Reason: {appointment.reasonForVisit}</p>
            <p className="text-gray-700">Time: {appointment.timeSlot}</p> {/* Display time slot */}
          </div>

          {/* Right section with countdown timer and join button */}
          <div className="flex flex-col items-end">
            <div>
            <h3 className="text-lg font-semibold">Time remaining:</h3>
            <p className={`text-2xl ${timeRemaining === 'Appointment time!' ? 'text-red-600' : 'text-gray-900'}`}>{timeRemaining}</p> {/* Display countdown */}
            </div>
            <Link to={`/room/${appointment._id}`}>
            <button>
              Join
            </button>
            </Link>
          </div>
        </div>
        </div>
      ) : (
        <p>No upcoming appointments.</p>
      )}
    </div>
  );
}
