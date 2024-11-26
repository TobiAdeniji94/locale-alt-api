"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@node-redis/client");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var REDIS_URL = process.env.REDIS_URL;
var client = (0, client_1.createClient)({
    url: REDIS_URL,
    socket: {
        connectTimeout: 50000,
    },
});
client.connect()
    .then(function () { return console.log('Connected to Redis'); })
    .catch(function (err) { return console.error('Failed to connect to Redis', err); });
exports.default = client;
