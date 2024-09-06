import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },  // e.g., "09:00-09:30 AM"
    status: { type: String, enum: ["Booked", "Completed", "Cancelled"], default: "Booked" },
    reasonForVisit: { type: String },  // Optional field for the patient to specify the reason for the visit
    prescription: { type: String },  // Optional field for the doctor to provide a prescription after the appointment
    notes: { type: String },  // Optional field for additional notes
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);

export { Appointment };
