import express from 'express'
import { Request, Response } from "express";
import { connectMongoDB } from './db'
import { rateLimiter } from './utils/rate-limiter';
import authRouter from './auth/auth.route'
import locationRouter from './locale/locale.route';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerDefinition } from "./utils/swagger-definitions";
import dotenv from 'dotenv';
import cors from "cors";

const swaggerSpec = swaggerJSDoc(swaggerDefinition);
dotenv.config();

const app = express()
connectMongoDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', rateLimiter, authRouter)
app.use('/locale', rateLimiter, locationRouter)

app.get('/', (req: Request, res: Response): void => {
    res.send("Welcome to Locale. Locale is a developer tool for anyone needing geographical information about Nigeria. Its API provides details on Nigeria's regions, states, and local government areas (LGAs). It's a useful tool for businesses targeting Nigeria's population of over 200M.")
})

const port = process.env.PORT || 3000 as number;
app.listen(port, (): void => {
    console.log(`Server listening on port ${port}`)
})

