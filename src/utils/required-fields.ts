import { Request, Response, NextFunction } from "express";

function validateRequiredFields(fields: string[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        const missingFields: string[] = [];
        
        for (const field of fields) {
            if (!(field in req.body)) {
                missingFields.push(field);
            }
        }
    
        if (missingFields.length > 0) {
            return res.status(400).json({
                error: `Missing required fields: ${missingFields.join(', ')}`,
            });
        }
    
        next();
    };
}

export {validateRequiredFields}