import { Router } from 'express';
import { registerController, loginController } from '../controllers';

const express = require('express');
const router = express.Router();


router.post('/register',registerController.register)
router.post('/login',loginController.login)


export default router;