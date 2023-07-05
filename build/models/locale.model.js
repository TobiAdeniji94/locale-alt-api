"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var locationSchema = new Schema({
    state: {
        type: String,
        required: true
    },
    capital: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    slogan: {
        type: String,
        required: true
    },
    senatorial_districts: {
        type: Array,
        required: true
    },
    lgas: {
        type: Array,
        required: true
    },
    landmass: {
        type: String,
        required: true
    },
    population: {
        type: String,
        required: true
    },
    dialect: {
        type: String,
        required: true
    },
    map: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    geo_politcal_zone: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    past_governors: {
        type: Array,
        required: true
    },
    borders: {
        type: Array,
        required: true
    },
    known_for: {
        type: Array,
        required: true
    }
});
exports.locationModel = mongoose_1.default.model('map', locationSchema);
