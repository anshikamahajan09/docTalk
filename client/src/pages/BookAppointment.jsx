// import React, { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
// import moment from 'moment-timezone';
// import { Button } from "flowbite-react";

// export default function BookAppointment() {
//   const path = window.location.pathname;
//   const id = path.split("/").pop();

//   const [slots, setSlots] = useState({});
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date()); // Default to current date

//   useEffect(() => {
//     const fetchSlots = async () => {
//       try {
//         const res = await fetch(`/api/doctor/${id}`);
//         const data = await res.json();
//         setSlots(data.dateSlots);

//         const firstDate = new Date(Object.keys(data.dateSlots)[0]);
//         setSelectedDate(firstDate);
//       } catch (error) {
//         console.error("Error fetching slots:", error.message);
//       }
//     };
//     fetchSlots();
//   }, [id]);

//   const formatDate = (date) => {
//     return moment(date).tz('Asia/Kolkata').format('YYYY-MM-DD');
//   };

//   const formatTime = (time) => {
//     const [hour, minute] = time.split(":");
//     const hourNum = parseInt(hour, 10);
//     const period = hourNum >= 12 ? "PM" : "AM";
//     const formattedHour = hourNum % 12 || 12;
//     return `${formattedHour}:${minute} ${period}`;
//   };

//   const handleSlotSelection = (date, slotIndex) => {
//     setSelectedSlot({ date, slotIndex });
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const tileClassName = ({ date }) => {
//     const formattedDate = formatDate(date);
//     const isSelectedDate = formattedDate === formatDate(selectedDate);
//     const isCurrentDate = formattedDate === formatDate(new Date()); // Check if the date is today
  
//     return `
//     ${isCurrentDate ? "react-calendar__tile--current" : ""}
//     ${isSelectedDate && !isCurrentDate ? "react-calendar__tile--selected" : ""}
//     ${slots[formattedDate] && !isSelectedDate && !isCurrentDate ? "react-calendar__tile--hasSlots" : ""}
//     transition-transform duration-200 
//     `;
//   };

//   const renderSlots = () => {
//     const formattedDate = formatDate(selectedDate);
//     const slotData = slots[formattedDate];

//     if (!slotData || slotData.length === 0) {
//       return <p className="text-gray-600 mb-2">No slots for {formattedDate}</p>;
//     }

//     return slotData.map((slot, index) => (
//       <button
//         key={index}
//         className={`w-full px-4 py-2 mb-2 text-left font-semibold rounded-md transition ${
//           slot.isBooked
//             ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//             : "bg-[#e3f1ff] hover:bg-[#e8f3ff]"
//         } ${
//           selectedSlot && selectedSlot.date === formattedDate && selectedSlot.slotIndex === index
//             ? "bg-[#e3f1ff]"
//             : ""
//         }`}
//         disabled={slot.isBooked}
//         onClick={() => handleSlotSelection(formattedDate, index)}
//       >
//         {formatTime(slot.startTime)} - {formatTime(slot.endTime)}{" "}
//         {slot.isBooked ? "(Booked)" : "(Available)"}
//       </button>
//     ));
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-[#f3f7ff] p-6">
//       <div className="max-w-5xl w-full bg-white p-10 border-8 border-[#6ea8ff] rounded-3xl shadow-md flex space-x-6">
//         <div className="w-1/2">
//         <p className="text-gray-600 mb-2">Select Date:</p>
//           <Calendar
//             onChange={handleDateChange}
//             value={selectedDate}
//             tileClassName={tileClassName}
//           />
//         </div>
//         <div className="w-1/2 space-y-6">
//           <div className="px-4 ">
//             <div>
//               <input className="w-full pb-3 pl-0  border-t-0 border-l-0 border-r-0 border-b-2 border-slate-300 placeholder-slate-400 placeholder:text-md  focus:outline-none  focus:ring-0 focus:border-slate-300" type="text" placeholder="Enter reason for appointment"/>
//             </div>
//             <div className="my-6">
//               <p className="text-gray-600 mb-3">Select a time slot for {formatDate(selectedDate)}:</p>
//               {renderSlots()}
//             </div>
//             <div className="flex justify-center">
//               <Button
//                 className="bg-gradient-to-r from-[#0067ff] to-[#009dff] text-white hover:bg-teal-700"
//                 disabled={!selectedSlot}
//               >
//                 Confirm Appointment
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from 'moment-timezone';
import { Button } from "flowbite-react";

export default function BookAppointment() {
  const path = window.location.pathname;
  const id = path.split("/").pop(); // Doctor ID from URL

  const [slots, setSlots] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default to current date
  const [reason, setReason] = useState(""); // State to store reason for visit
  const [isSubmitting, setIsSubmitting] = useState(false); // State to handle form submission

  // Fetch slots from API when component mounts or doctor ID changes
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch(`/api/doctor/${id}`);
        const data = await res.json();
        setSlots(data.dateSlots);

        const firstDate = new Date(Object.keys(data.dateSlots)[0]);
        setSelectedDate(firstDate);
      } catch (error) {
        console.error("Error fetching slots:", error.message);
      }
    };
    fetchSlots();
  }, [id]);

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    return moment(date).tz('Asia/Kolkata').format('YYYY-MM-DD');
  };

  // Format time to 12-hour AM/PM format
  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour, 10);
    const period = hourNum >= 12 ? "PM" : "AM";
    const formattedHour = hourNum % 12 || 12;
    return `${formattedHour}:${minute} ${period}`;
  };

  // Handle slot selection
  const handleSlotSelection = (date, slotIndex) => {
    setSelectedSlot({ date, slotIndex });
  };

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot || !reason) {
      alert("Please select a time slot and provide a reason for the visit.");
      return;
    }
    setIsSubmitting(true);

    const formattedDate = formatDate(selectedSlot.date);
    const selectedTimeSlot = slots[formattedDate][selectedSlot.slotIndex];
    const requestData = {
      doctorId: id,
      date: formattedDate,
      timeSlot: `${selectedTimeSlot.startTime}-${selectedTimeSlot.endTime}`,
      reasonForVisit: reason,
    };

    try {
      const res = await fetch('/api/appointment/create-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (res.ok) {
        alert('Appointment booked successfully!');
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error booking appointment:', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom CSS classes for calendar tiles
  const tileClassName = ({ date }) => {
    const formattedDate = formatDate(date);
    const isSelectedDate = formattedDate === formatDate(selectedDate);
    const isCurrentDate = formattedDate === formatDate(new Date()); // Check if the date is today

    return `
      ${isCurrentDate ? "react-calendar__tile--current" : ""}
      ${isSelectedDate && !isCurrentDate ? "react-calendar__tile--selected" : ""}
      ${slots[formattedDate] && !isSelectedDate && !isCurrentDate ? "react-calendar__tile--hasSlots" : ""}
      transition-transform duration-200 
    `;
  };

  // Render available slots for the selected date
  const renderSlots = () => {
    const formattedDate = formatDate(selectedDate);
    const slotData = slots[formattedDate];

    if (!slotData || slotData.length === 0) {
      return <p className="text-gray-600 mb-2">No slots for {formattedDate}</p>;
    }

    return slotData.map((slot, index) => (
      <button
        key={index}
        className={`w-full px-4 py-2 mb-2 text-left font-semibold rounded-md transition ${
          slot.isBooked
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-[#e3f1ff] hover:bg-[#e8f3ff]"
        } ${
          selectedSlot && selectedSlot.date === formattedDate && selectedSlot.slotIndex === index
            ? "bg-[#e3f1ff]"
            : ""
        }`}
        disabled={slot.isBooked}
        onClick={() => handleSlotSelection(formattedDate, index)}
        type="button" // This prevents form submission
      >
        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}{" "}
        {slot.isBooked ? "(Booked)" : "(Available)"}
      </button>
    ));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f3f7ff] p-6">
      <div className="max-w-5xl w-full bg-white p-10 border-8 border-[#6ea8ff] rounded-3xl shadow-md flex space-x-6">
        <div className="w-1/2">
          <p className="text-gray-600 mb-2">Select Date:</p>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={tileClassName}
          />
        </div>
        <div className="w-1/2 space-y-6">
          <div className="px-4 ">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  className="w-full pb-3 pl-0  border-t-0 border-l-0 border-r-0 border-b-2 border-slate-300 placeholder-slate-400 placeholder:text-md  focus:outline-none  focus:ring-0 focus:border-slate-300"
                  type="text"
                  placeholder="Enter reason for appointment"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </div>
              <div className="my-6">
                <p className="text-gray-600 mb-3">Select a time slot for {formatDate(selectedDate)}:</p>
                {renderSlots()}
              </div>
              <div className="flex justify-center">
                <Button
                  className="bg-gradient-to-r from-[#0067ff] to-[#009dff] text-white hover:bg-teal-700"
                  type="submit" // Submit happens only when this button is clicked
                  disabled={!selectedSlot || isSubmitting}
                >
                  {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

