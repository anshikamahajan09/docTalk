import { errorHandler } from "../utils/error.js";
import { Doctor, Patient } from "../models/user.model.js";

export const getUserByEmail = async (req, res, next) => {
    const { email } = req.params.email;
    try {
        const user = await Patient.findOne({email}) || await Doctor.findOne({email});
        if (!user) {
            return next(errorHandler(404, "User not found"));
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}


export const signout = (req, res, next) => {
    try {
      res.clearCookie("access_token").status(200).json("Signout successfully");
    } catch (error) {
      next(error);
    }
  };
