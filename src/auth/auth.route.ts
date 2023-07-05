import { signup, verify } from './auth.controller';
import express from 'express';
const authRouter = express.Router()
import { validateRequiredFields } from '../utils/required-fields';


authRouter.post('/registration', validateRequiredFields(['email', 'password', 'firstname', 'lastname']), signup)

authRouter.post('/login', validateRequiredFields(['API_key']), verify)

export = authRouter;