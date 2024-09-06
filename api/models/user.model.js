import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    medicalHistory: {
      bloodGroup: { type: String },
      height: { type: Number },
      weight: { type: Number },
      pastConditions: [{ type: String }],
      allergies: [{ type: String }],
      chronicConditions: [{ type: String }],
      socialHistory: Object,
      vaccinations: [{ type: String }],
      currentMedications: [{ type: String }],
      others: [{ type: String }],
    },
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
    profilePicture: {
      type: String,
      default:
        "https://i0.wp.com/vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png?fit=860%2C681&ssl=1",
    },
  },
  { timeStamps: true }
);

const Patient = mongoose.model("Patient", PatientSchema);

export { Patient };



const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "doctor" },
    specialization: { type: String, required: true },
    description: { type: String },
    experience: { type: Number, required: true },
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
    profilePicture: {
      type: String,
      default:
        "https://www.sonicseo.com/wp-content/uploads/2020/07/surgeon-768x768.jpg",
    },
    dateSlots: {},
  },
  { timeStamps: true }
);


const Doctor = mongoose.model("Doctor", DoctorSchema);

export { Doctor };
