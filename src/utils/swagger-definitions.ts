import dotenv from 'dotenv';
dotenv.config();

const WEB_HOST = process.env.WEB_HOST

export const swaggerDefinition = {
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