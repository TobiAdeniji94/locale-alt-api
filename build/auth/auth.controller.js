"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.verify = verify;
var api_keys_model_1 = require("../models/api-keys.model");
var generateApiKey_1 = require("../apiKey/generateApiKey");
var auth_model_1 = require("../models/auth.model");
var bcrypt = __importStar(require("bcrypt"));
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var regex, _a, email, password, firstname, lastname, foundUser, API_key, apiKey, key, user, savedUser;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    regex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/;
                    _a = req.body, email = _a.email, password = _a.password, firstname = _a.firstname, lastname = _a.lastname;
                    if (!regex.test(email)) return [3 /*break*/, 7];
                    return [4 /*yield*/, auth_model_1.userModel.findOne({ email: email })];
                case 1:
                    foundUser = _b.sent();
                    API_key = (0, generateApiKey_1.generateApiKey)(32);
                    if (foundUser) {
                        res.status(409).send("User already exists, try logging in");
                        API_key;
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, api_keys_model_1.apiKeyModel.create({ API_key: API_key, createdAt: Date.now() })];
                case 2:
                    apiKey = _b.sent();
                    return [4 /*yield*/, apiKey.save()];
                case 3:
                    key = _b.sent();
                    return [4 /*yield*/, auth_model_1.userModel.create({
                            email: email,
                            password: password,
                            firstname: firstname,
                            lastname: lastname,
                            // retype_password,
                            API_key_id: key._id,
                        })];
                case 4:
                    user = _b.sent();
                    return [4 /*yield*/, user.save()];
                case 5:
                    savedUser = _b.sent();
                    key.user = savedUser._id;
                    key.createdBy = "".concat(firstname, " ").concat(lastname);
                    return [4 /*yield*/, key.save()];
                case 6:
                    _b.sent();
                    res.status(201).json({
                        message: "Signup successful",
                        user: {
                            email: email,
                            firstname: firstname,
                            lastname: lastname,
                        },
                        API_key: API_key
                    });
                    return [2 /*return*/];
                case 7:
                    res.status(401).send("Please enter a valid email");
                    _b.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
function verify(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, API_key, user, match, user_apikey;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password, API_key = _a.API_key;
                    return [4 /*yield*/, auth_model_1.userModel.findOne({ email: email })
                            .populate({
                            path: 'API_key_id',
                            select: 'API_key',
                        })];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        res.status(404).send("User doesn't exist, Signup");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, bcrypt.compare(password, user.password)];
                case 2:
                    match = _b.sent();
                    if (!match) {
                        res.status(401).send('Invalid credentials');
                        return [2 /*return*/];
                    }
                    user_apikey = user.API_key_id.API_key;
                    if (API_key !== user_apikey) {
                        res.status(401).send("Invalid API key, please check that you are using your own API key and try again");
                        return [2 /*return*/];
                    }
                    res.status(200).send("API key has been verified and is valid");
                    return [2 /*return*/];
            }
        });
    });
}
