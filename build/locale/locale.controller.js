"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.getAll = exports.getLocalGov = exports.getState = exports.getRegions = void 0;
var locale_model_1 = require("../models/locale.model");
var get_set_cache_1 = require("../redis/get-set-cache");
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.getAll = getAll;
function getRegions(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var region_name, lga, fields, regions, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    region_name = req.query.region_name;
                    lga = req.query.lga;
                    fields = 'state region capital slogan population dialect longitude latitude landmass senatorial_districts created_date known_for borders';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    if (lga === 'true') {
                        fields += ' lgas';
                    }
                    regions = void 0;
                    if (!(!region_name && !lga)) return [3 /*break*/, 2];
                    res.status(401).send("region_name field is required");
                    return [2 /*return*/];
                case 2:
                    if (!(!region_name && lga)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, get_set_cache_1.getSetCache)("region?lga=".concat(lga), function () { return __awaiter(_this, void 0, void 0, function () {
                            var region;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, locale_model_1.locationModel.find({}, fields)];
                                    case 1:
                                        region = _a.sent();
                                        return [2 /*return*/, region];
                                }
                            });
                        }); })];
                case 3:
                    regions = _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, (0, get_set_cache_1.getSetCache)("region?region_name=".concat(region_name, "?lga=").concat(lga), function () { return __awaiter(_this, void 0, void 0, function () {
                        var splitName, mapped, region, inputRegions, foundRegions, notFoundRegions, errorMessage;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    splitName = region_name.split(', ');
                                    mapped = splitName.map(function (region) {
                                        var regex = new RegExp(region, 'i');
                                        return { region: regex };
                                    });
                                    return [4 /*yield*/, locale_model_1.locationModel.find({ $or: mapped }, fields)];
                                case 1:
                                    region = _a.sent();
                                    inputRegions = splitName.length;
                                    foundRegions = region.length;
                                    if (foundRegions < inputRegions) {
                                        notFoundRegions = inputRegions - foundRegions;
                                        errorMessage = "".concat(notFoundRegions, " region(s) were not found. Check if input is valid state name(s).");
                                        res.status(404).json({
                                            "error": errorMessage,
                                            region: region
                                        });
                                        return [2 /*return*/];
                                    }
                                    return [2 /*return*/, region];
                            }
                        });
                    }); })];
                case 5:
                    regions = _a.sent();
                    _a.label = 6;
                case 6:
                    if (regions) {
                        res.status(200).json({ regions: regions });
                    }
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    if (error_1.message === 'Invalid API_key') {
                        res.status(401).json({ error: error_1.message });
                    }
                    else {
                        res.status(500).json({ error: error_1.message });
                    }
                    return [2 /*return*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.getRegions = getRegions;
function getState(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var state_name_1, lga, fields_1, states, error_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    state_name_1 = req.query.state_name;
                    lga = req.query.lga;
                    fields_1 = 'region state capital slogan population dialect longitude latitude landmass created_date senatorial_districts known_for borders';
                    if (lga === 'true') {
                        fields_1 += ' lgas';
                    }
                    states = void 0;
                    if (!(!state_name_1 && !lga)) return [3 /*break*/, 1];
                    res.status(401).send("state_name field is required");
                    return [2 /*return*/];
                case 1:
                    if (!(!state_name_1 && lga)) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, get_set_cache_1.getSetCache)("state?lga=".concat(lga), function () { return __awaiter(_this, void 0, void 0, function () {
                            var state;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, locale_model_1.locationModel.find({}, fields_1)];
                                    case 1:
                                        state = _a.sent();
                                        return [2 /*return*/, state];
                                }
                            });
                        }); })];
                case 2:
                    states = _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, (0, get_set_cache_1.getSetCache)("state?state_name=".concat(state_name_1, "?lga=").concat(lga), function () { return __awaiter(_this, void 0, void 0, function () {
                        var splitName, mapped, state, inputStates, foundStates, notFoundStates, errorMessage;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    splitName = state_name_1.split(', ');
                                    mapped = splitName.map(function (state) {
                                        var regex = new RegExp(state, 'i');
                                        return { state: regex };
                                    });
                                    return [4 /*yield*/, locale_model_1.locationModel.find({ $or: mapped }, fields_1)];
                                case 1:
                                    state = _a.sent();
                                    inputStates = splitName.length;
                                    foundStates = state.length;
                                    if (foundStates < inputStates) {
                                        notFoundStates = inputStates - foundStates;
                                        errorMessage = "".concat(notFoundStates, " state(s) were not found. Check if input is valid state name(s).");
                                        res.status(404).json({
                                            "error": errorMessage,
                                            state: state
                                        });
                                        return [2 /*return*/];
                                    }
                                    return [2 /*return*/, state];
                            }
                        });
                    }); })];
                case 4:
                    states = _a.sent();
                    _a.label = 5;
                case 5:
                    if (states) {
                        res.status(200).json({ states: states });
                    }
                    return [3 /*break*/, 7];
                case 6:
                    error_2 = _a.sent();
                    res.status(401).json({ error: error_2.message });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.getState = getState;
function getLocalGov(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lga_name, fields, lgas, error_3;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lga_name = req.query.lga_name;
                    fields = 'state lgas region';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!!lga_name) return [3 /*break*/, 2];
                    res.status(401).send("lga_name field is required");
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, (0, get_set_cache_1.getSetCache)("lga?lga_name=".concat(lga_name), function () { return __awaiter(_this, void 0, void 0, function () {
                        var splitName, mapped, lga;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    splitName = lga_name.split(', ');
                                    mapped = splitName.map(function (lga) {
                                        var regex = new RegExp(lga, 'i');
                                        return { lgas: regex };
                                    });
                                    return [4 /*yield*/, locale_model_1.locationModel.find({ $or: mapped }, fields)];
                                case 1:
                                    lga = _a.sent();
                                    return [2 /*return*/, lga];
                            }
                        });
                    }); })];
                case 3:
                    lgas = _a.sent();
                    _a.label = 4;
                case 4:
                    if (lgas.length === 0) {
                        res.status(404).json({
                            message: "\"".concat(lga_name, "\" Local Government not found. Check if input is valid local government name")
                        });
                        return [2 /*return*/];
                    }
                    res.status(200).json({
                        lgas: lgas
                    });
                    return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    res.status(401).json({ error: error_3.message });
                    return [2 /*return*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getLocalGov = getLocalGov;
