import express from 'express';
import { getUserByEmail, signout } from '../controllers/user.controller.js';


const router = express.Router();

router.get('/user/:email',getUserByEmail);
router.post('/signout',signout);


export default router;
