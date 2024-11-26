import { Request, Response, NextFunction } from "express";
import { apiKeyModel } from "../../models/api-keys.model";

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
      res.status(401).send('Missing Authorization header');  // Send response and exit middleware
      return;  // Ensure no further execution
  }

  try {
      const key = await apiKeyModel.findOne({ "API_key": authHeader });

      if (key === null) {
          res.status(401).send('Invalid API Key');  // Send response and exit middleware
          return;  // Ensure no further execution
      }

      // If the API key is valid, continue to the next middleware
      next();
  } catch (error) {
      res.status(401).send('Invalid API Key');  // Send response on error and exit middleware
  }
}
