import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { Button, Label } from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import signinImage from "../assets/sign-in.jpg";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";
import { FileInput } from "flowbite-react";
import moment from 'moment-timezone';


export default function SignUpDoctor() {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateSlots, setDateSlots] = useState({});
  const [slots, setSlots] = useState([
    { startTime: "", endTime: "", isBooked: false },
  ]);

  const [file, setFile] = useState(null);
  const [fileUploadProgress, setFileUploadProgress] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSlotChange = (index, event) => {
    const { name, value } = event.target;
    const updatedSlots = [...slots];
    updatedSlots[index][name] = value;
    setSlots(updatedSlots);
  };

  const handleAddSlot = () => {
    setSlots([...slots, { startTime: "", endTime: "", isBooked: false }]);
  };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   console.log("befor formatted", date);
  //   const formattedDate = date.toISOString().split("T")[0]; // format date as YYYY-MM-DD
  //   console.log("after", formattedDate);
    
  //   if (!dateSlots[formattedDate]) {
  //     setDateSlots({
  //       ...dateSlots,
  //       [formattedDate]: [{ startTime: "", endTime: "", isBooked: false }],
  //     });
  //     setSlots([{ startTime: "", endTime: "", isBooked: false }]);
  //   } else {
  //     setSlots(dateSlots[formattedDate]);
  //   }
  // };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  
    // Convert to Indian Standard Time (IST)
    const formattedDate = moment(date).tz('Asia/Kolkata').format('YYYY-MM-DD');
    console.log("Formatted Date:", formattedDate);
  
    if (!dateSlots[formattedDate]) {
      setDateSlots({
        ...dateSlots,
        [formattedDate]: [{ startTime: "", endTime: "", isBooked: false }],
      });
      setSlots([{ startTime: "", endTime: "", isBooked: false }]);
    } else {
      setSlots(dateSlots[formattedDate]);
    }
  };

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setFileUploadError("Please select an image");
        return;
      }
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      console.log(filename);
      
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setFileUploadError("Image upload failed");
          setFileUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFileUploadProgress(null);
            setFileUploadError(null);
            setFormData({ ...formData, profilePicture: downloadURL });
          });
        } 
      );
    } catch (error) {
      setFileUploadError("Image upload failed");
      setFileUploadProgress(null);
    }
  };

  const handleSaveSlots = () => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setDateSlots({ ...dateSlots, [formattedDate]: slots });
    setSlots([{ startTime: "", endTime: "", isBooked: false }]); // Reset slots for the next date
    setSelectedDate(null); // Reset selected date
    alert("Slots for " + formattedDate + " saved successfully!");
  };

  console.log(formData, dateSlots);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Merge dateSlots into formData
    const finalFormData = { ...formData, dateSlots };

    try {
      dispatch(signInStart());

      // Register doctor
      const res = await fetch("/api/auth/sign-up/doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalFormData),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/sign-in"); // Navigate to some page after successful registration
      } else {
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f1f4ff]">
      <div className="flex w-full max-w-6xl bg-white rounded-3xl shadow-lg overflow-hidden min-h-[600px]">
        <div className="w-1/2 hidden md:block">
          <img
            src={signinImage}
            alt="Sign In"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col">
          <h1 className="text-4xl font-semibold text-center py-4 text-[#009dff]">
            Sign Up
          </h1>

          <form
            className="space-y-6 flex flex-col flex-grow"
            onSubmit={handleSubmit}
          >
            <div className="flex-grow">
              {currentStep === 1 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <Label value="Your name" />
                    <input
                      type="text"
                      className="mt-1 rounded-lg pr-6 py-2 w-full border border-gray-300 bg-[#f9fafb]"
                      onChange={handleChange}
                      name="name"
                      required
                    />
                  </div>

                  <div>
                    <Label value="Email" />
                    <input
                      type="email"
                      className="mt-1 rounded-lg pr-6 py-2 w-full border border-gray-300 bg-[#f9fafb]"
                      onChange={handleChange}
                      name="email"
                      required
                    />
                  </div>

                  <div>
                    <Label value="Phone" />
                    <input
                      type="tel"
                      className="mt-1 rounded-lg pr-6 py-2 w-full border border-gray-300 bg-[#f9fafb]"
                      onChange={handleChange}
                      name="phone"
                      required
                    />
                  </div>

                  <div>
                    <Label value="Password" />
                    <input
                      type="password"
                      className="mt-1 rounded-lg pr-6 py-2 w-full border border-gray-300 bg-[#f9fafb]"
                      onChange={handleChange}
                      name="password"
                      required
                    />
                  </div>
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                  <Button type="button" onClick={prevStep}>
                    Previous
                  </Button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <Label value="Specialization" />
                    <input
                      type="text"
                      className="mt-1 rounded-lg pr-6 py-2 w-full border border-gray-300 bg-[#f9fafb]"
                      onChange={handleChange}
                      name="specialization"
                      required
                    />
                  </div>

                  <div>
                    <Label value="Description" />
                    <textarea
                      className="mt-1 w-full border border-gray-300 bg-[#f9fafb] rounded-lg"
                      name="description"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label value="Experience (years)" />
                    <input
                      type="number"
                      className="mt-1 rounded-lg pr-6 py-2 w-full border border-gray-300 bg-[#f9fafb]"
                      onChange={handleChange}
                      name="experience"
                      required
                    />
                  </div>
                  <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                    <FileInput
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button
                      type="button"
                      gradientDuoTone="purpleToPink"
                      outline
                      onClick={handleUploadImage}
                    >
                      {fileUploadProgress ? (
                        <CircularProgressbar
                          className="h-12 w-12"
                          value={fileUploadProgress}
                          text={`${fileUploadProgress}%` || 0}
                        />
                      ) : (
                        "Upload Image"
                      )}
                    </Button>
                  </div>
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                  <Button type="button" onClick={prevStep}>
                    Previous
                  </Button>
                </div>
              )}

              {currentStep === 3 && (
                <div className="flex flex-col items-center gap-4">
                  <div className="mt-6 flex flex-col gap-2 items-center justify-center">
                    <Label value="Select Available Date" />
                    <div className="relative w-full">
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        dateFormat="yyyy/MM/dd"
                        className="w-full h-full border rounded-lg"
                        inline
                      />
                    </div>
                    {selectedDate && (
                      <p className=" text-gray-700">
                        Selected Date: {selectedDate.toDateString()}
                      </p>
                    )}
                  </div>

                  {selectedDate && (
                    <div className="flex flex-col w-full max-w-md">
                      <Label value="Set Available Slots" />
                      {slots.map((slot, index) => (
                        <div key={index} className="mb-2 flex gap-2 w-full">
                          <input
                            type="time"
                            value={slot.startTime}
                            name="startTime"
                            onChange={(event) => handleSlotChange(index, event)}
                            className="mt-1 rounded-lg w-full border border-gray-300 bg-[#f9fafb]"
                            placeholder="Start Time"
                            required
                          />
                          <input
                            type="time"
                            value={slot.endTime}
                            name="endTime"
                            onChange={(event) => handleSlotChange(index, event)}
                            className="mt-1 rounded-lg w-full border border-gray-300 bg-[#f9fafb]"
                            placeholder="End Time"
                            required
                          />
                        </div>
                      ))}
                      <Button
                        type="button"
                        className="bg-gradient-to-r from-[#0067ff] to-[#009dff] hover:bg-gradient-to-l hover:from-[#0053e6] hover:to-[#007acc] transition-colors duration-300 text-white rounded-lg "
                        onClick={handleAddSlot}
                      >
                        Add Another Slot
                      </Button>
                      <Button
                        type="button"
                        className="bg-gradient-to-r from-[#0067ff] to-[#009dff] hover:bg-gradient-to-l hover:from-[#0053e6] hover:to-[#007acc] transition-colors duration-300 text-white rounded-lg mt-2"
                        onClick={handleSaveSlots}
                      >
                        Save Slots
                      </Button>
                    </div>
                    

                  )}
                  <Button type="submit" className="bg-gradient-to-r from-[#0067ff] to-[#009dff] hover:bg-gradient-to-l hover:from-[#0053e6] hover:to-[#007acc] transition-colors duration-300 text-white rounded-lg">
                      Sign Up
                    </Button>
                    <Button type="button" onClick={prevStep}>
                      Previous
                    </Button>
                </div>
              )}
            </div>

            {/* <div className="flex justify-between items-center">
              {currentStep > 1 && (
                <Button
                  type="button"
                  onClick={prevStep}
                  className="bg-gradient-to-r from-[#0067ff] to-[#009dff] hover:bg-gradient-to-l hover:from-[#0053e6] hover:to-[#007acc] transition-colors duration-300 text-white rounded-lg"
                >
                  Previous
                </Button>
              )}
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-[#0067ff] to-[#009dff] hover:bg-gradient-to-l hover:from-[#0053e6] hover:to-[#007acc] transition-colors duration-300 text-white rounded-lg"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#0067ff] to-[#009dff] hover:bg-gradient-to-l hover:from-[#0053e6] hover:to-[#007acc] transition-colors duration-300 text-white rounded-lg"
                >
                  Sign Up
                </Button>
              )}
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}
