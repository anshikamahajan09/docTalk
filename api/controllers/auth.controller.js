import { Patient, Doctor} from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// export const signUpDoctor = async (req, res, next) => {
//   const {
//     name,
//     email,
//     phone,
//     password,
//     specialization,
//     description,
//     experience,
//   } = req.body;

//   const trimmedName = name.trim();
//   //check if the email is already in use in the patient collection
//   const patient = await Patient.findOne({ email });
//   if (patient) {
//     return next(errorHandler("400", "Email already in use"));
//   }

//   const hashedPassword = bcryptjs.hashSync(password, 10);

//   const newDoctor = new Doctor({
//     name: trimmedName,
//     email,
//     phone,
//     password: hashedPassword,
//     specialization,
//     description,
//     experience,
//   });

//   try {
//     const doctor = await newDoctor.save();
//     res.status(201).json(doctor);
//   } catch (error) {
//     next(error);
//   }
// };

export const signUpDoctor = async (req, res, next) => {
  
  const { name, email, phone, password, specialization, description, experience, dateSlots, profilePicture } = req.body;

  try {
    // Check if the email is already in use in the Patient collection
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return next(errorHandler(400, "Patient Email already in use"));
    }

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return next(errorHandler(400, "Doctor Email already in use"));
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new doctor
    const newDoctor = new Doctor({
      name: name.trim(),
      email,
      phone,
      password: hashedPassword,
      specialization,
      description,
      experience,
      dateSlots,
      profilePicture
    });

    // Save the doctor to the database
    const savedDoctor = await newDoctor.save();
    res.status(200).json(savedDoctor);

  } catch (error) {
    next(error);
  }
};


export const signUpUser = async (req, res, next) => {
  const { name, email, phone, password, medicalHistory } =
    req.body;
  const trimmedName = name.trim();
  
  //check if the email is already in use in the doctor collection
  const doctor = await Doctor.findOne({ email });
  if (doctor) {
    return next(errorHandler(400, "Email already in use"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newPatient = new Patient({
    name: trimmedName,
    email,
    phone,
    password: hashedPassword,
    medicalHistory,
  });
  try {
    const patient = await newPatient.save();
    res.status(201).json(patient);
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const patient = await Patient.findOne({
      email,
    });
    const doctor = await Doctor.findOne({
      email,
    });
    if (!patient && !doctor) {
      return next(errorHandler(400, "User not found"));
    }

    const user = patient || doctor;

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return next(errorHandler(400, "Invalid email or password"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password: userPassword, ...userWithoutPassword } = user._doc;
    res
      .status(200)
      .cookie("access_token", token, {httpOnly: true})
      .json(userWithoutPassword);

  } catch (error) {
    next(error);
  }
};



