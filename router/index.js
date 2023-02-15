import { Router } from 'express';
import { registerController } from '../controllers';

const express = require('express');
const router = express.Router();


router.post('/register',registerController.register)


export default router;