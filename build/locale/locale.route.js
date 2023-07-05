"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var locale_controller_1 = require("./locale.controller");
var express_1 = __importDefault(require("express"));
var auth_mddleware_1 = require("../auth/middleware/auth.mddleware");
var locationRouter = express_1.default.Router();
locationRouter.get('/region', auth_mddleware_1.authMiddleware, locale_controller_1.getRegions);
locationRouter.get('/state', auth_mddleware_1.authMiddleware, locale_controller_1.getState);
locationRouter.get('/lga', auth_mddleware_1.authMiddleware, locale_controller_1.getLocalGov);
module.exports = locationRouter;
