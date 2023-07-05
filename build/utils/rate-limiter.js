"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var RATE_LIMIT_MAX = process.env.RATE_LIMIT_MAX;
var RATE_LIMIT_TIME = process.env.RATE_LIMIT_TIME;
exports.rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: parseInt(RATE_LIMIT_TIME),
    max: parseInt(RATE_LIMIT_MAX),
    message: "You have exceeded 50 request limit, limit will expire in 2hrs",
    standardHeaders: false,
    legacyHeaders: false,
});
