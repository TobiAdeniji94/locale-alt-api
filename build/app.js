"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = require("./db");
var rate_limiter_1 = require("./utils/rate-limiter");
var auth_route_1 = __importDefault(require("./auth/auth.route"));
var locale_route_1 = __importDefault(require("./locale/locale.route"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_definitions_1 = require("./utils/swagger-definitions");
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var swaggerSpec = (0, swagger_jsdoc_1.default)(swagger_definitions_1.swaggerDefinition);
dotenv_1.default.config();
var app = (0, express_1.default)();
(0, db_1.connectMongoDB)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use("/documentation", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use('/auth', rate_limiter_1.rateLimiter, auth_route_1.default);
app.use('/locale', rate_limiter_1.rateLimiter, locale_route_1.default);
app.get('/', function (req, res) {
    res.send("Welcome to Locale. Locale is a developer tool for anyone needing geographical information about Nigeria. It's an API that details Nigeria's regions, states, and local government areas (LGAs). It's a useful tool for businesses targeting Nigeria's population of over 200M.");
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server listening on port ".concat(port));
});
