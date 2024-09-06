import express from 'express';
import { getDoctors, getDoctorById} from '../controllers/doctor.controller.js';

const router = express.Router();

router.get('/get-doctors', getDoctors);
router.get('/:id',getDoctorById);

export default router;