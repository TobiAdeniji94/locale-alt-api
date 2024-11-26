import { Request, Response, NextFunction } from "express";

function validateRequiredFields(fields: string[]) {
    return function (req: Request, res: Response, next: NextFunction): void {
        const missingFields: string[] = [];
        
        // Check for missing fields in the request body
        for (const field of fields) {
            if (!(field in req.body)) {
                missingFields.push(field);
            }
        }
    
        if (missingFields.length > 0) {
            // Return the response and stop further execution
            res.status(400).json({
                error: `Missing required fields: ${missingFields.join(', ')}`,
            });
            return;
        }
    
        // Call next() to proceed to the next middleware
        next();
    };
}

export { validateRequiredFields };
