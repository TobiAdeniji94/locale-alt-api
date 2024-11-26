"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDB = connectMongoDB;
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var MONGO_URL = process.env.MONGO_URL;
function connectMongoDB() {
    mongoose_1.default.connect(MONGO_URL);
    mongoose_1.default.connection.on('connected', function () {
        console.log('Connected to MongoDB Successfully');
    });
    mongoose_1.default.connection.on('error', function (e) {
        console.log('An error occured while connecting to MongoDB');
        console.log(e);
    });
}
