import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized";

interface UserPaylod {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPaylod;
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) throw new NotAuthorizedError();
  next();
};
