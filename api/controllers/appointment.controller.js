import nodemailer from "nodemailer";
import { Appointment } from "../models/appointment.model.js";
import { Doctor, Patient } from "../models/user.model.js";

// Function to send email, called only in the backend after appointment is created
const sendGreetMail = async (email, doctorName, date, timeSlot) => {
  const mail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD, 
    },
  });

  const message = `
    Dear Patient,<br><br>
    Thank you for booking an appointment with Dr. ${doctorName}.<br>
    Your appointment is scheduled for ${date} during the ${timeSlot} time slot.<br><br>
    Best regards,<br>
    Codewave
  `;

  try {
    await mail.sendMail({
      from: "anshika11437@gmail.com",
      to: email,
      subject: "Appointment Confirmation",
      html: message,
    });
    console.log(`Appointment confirmation email sent to ${email}`);
  } catch (err) {
    console.error(`Error sending email to ${email}:`, err);
  }
};

export const createAppointment = async (req, res, next) => {
  const { doctorId, date, timeSlot, reasonForVisit } = req.body;

  try {
    const newAppointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      date,
      timeSlot,
      reasonForVisit,
    });

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const [startTime, endTime] = timeSlot.split("-");
    const dateSlots = doctor.dateSlots;
    const slots = dateSlots[date];
    const slotIndex = slots.findIndex(
      (slot) => slot.startTime === startTime && slot.endTime === endTime
    );
    
    if (slotIndex === -1 || slots[slotIndex].isBooked) {
      return res.status(400).json({ error: "Time slot is unavailable" });
    }

    slots[slotIndex].isBooked = true;
    doctor.dateSlots[date] = slots;

    await doctor.save();
    await newAppointment.save();

    patient.appointments.push(newAppointment._id);
    doctor.appointments.push(newAppointment._id);
    await patient.save();
    await doctor.save();

    await sendGreetMail(patient.email, doctor.name, date, timeSlot);

    res.status(201).json(newAppointment);
  } catch (error) {
    next(error);  
  }
};



// Fetch the latest upcoming appointment for a user (doctor or patient)
export const getNextAppointment = async (req, res, next) => {
  const userId = req.user.id; // assuming the user is authenticated
  const role = req.user.role; // either 'doctor' or 'patient'

  try {
    const query = {};
    if (role === 'doctor') {
      query.doctor = userId;
    } else if (role === 'patient') {
      query.patient = userId;
    }

    // Fetch the next upcoming appointment
    const nextAppointment = await Appointment.findOne(query)
      .sort({ date: 1, timeSlot: 1 }) // Sort by date and time
      .where({ date: { $gte: new Date() } }) // Ensure it's in the future
      .populate('doctor', 'name') // Populate doctor's name
      .populate('patient', 'name'); // Populate patient's name if needed

    if (!nextAppointment) {
      return res.status(404).json({ message: 'No upcoming appointments found.' });
    }

    res.status(200).json(nextAppointment);
  } catch (error) {
    next(error);
  }
};

