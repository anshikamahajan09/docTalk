import express from 'express';
import { createAppointment, getNextAppointment } from '../controllers/appointment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create-appointment',verifyToken, createAppointment);
router.get('/next',verifyToken, getNextAppointment);

export default router;