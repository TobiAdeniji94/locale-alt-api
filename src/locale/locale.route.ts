import { getRegions, getState, getLocalGov } from "./locale.controller";
import express from 'express';
import { authMiddleware } from "../auth/middleware/auth.mddleware";
const locationRouter = express.Router()

locationRouter.get('/region', authMiddleware, getRegions);

locationRouter.get('/state', authMiddleware, getState);

locationRouter.get('/lga', authMiddleware, getLocalGov);

export = locationRouter;