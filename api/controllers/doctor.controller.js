import { Doctor } from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const getDoctors = async (req, res, next) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        return next(errorHandler(400, "Error fetching doctors"))
    }
}

export const getDoctorById = async (req, res, next) => {
    const {id} = req.params;
    try{
        const doctor = await Doctor.findById(id);
        res.status(200).json(doctor);
    }
    catch(error){
      return next(errorHandler(400, "Doctor not found"));
    }
}


