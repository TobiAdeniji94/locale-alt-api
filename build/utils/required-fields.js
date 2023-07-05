"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequiredFields = void 0;
function validateRequiredFields(fields) {
    return function (req, res, next) {
        var missingFields = [];
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            if (!(field in req.body)) {
                missingFields.push(field);
            }
        }
        if (missingFields.length > 0) {
            return res.status(400).json({
                error: "Missing required fields: ".concat(missingFields.join(', ')),
            });
        }
        next();
    };
}
exports.validateRequiredFields = validateRequiredFields;
