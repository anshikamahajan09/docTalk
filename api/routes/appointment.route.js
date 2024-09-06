import express from 'express';
import { createAppointment } from '../controllers/appointment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create-appointment',verifyToken, createAppointment);

export default router;