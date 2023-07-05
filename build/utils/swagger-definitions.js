"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDefinition = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var WEB_HOST = process.env.WEB_HOST;
exports.swaggerDefinition = {
    swaggerDefinition: {
        info: {
            title: 'Locale-ALT-API',
            version: '1.0.0',
            description: 'API consisting of endpoints to signup, verify user and API key and get locations by the regions, states and local government areas',
        },
        host: WEB_HOST,
        basePath: '/',
        securityDefinitions: {
            ApiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
            },
        },
    },
    apis: ['src/docs/swagger-docs.ts'],
};
