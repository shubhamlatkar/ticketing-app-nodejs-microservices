import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPaylod {
  id:string,
  email:string
}

// declare global {
//   namespace Express {
//     interface Request {
//       currentUser?:UserPaylod
//     }
//   }
// }

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(!req.session?.jwt) {
    console.log("payload", req.session);
    return next();
  }
  try {
    const payload = jwt.verify(req.session.jwt,process.env.JWT_SECRET!) as UserPaylod;
    console.log("payload", payload);
    req.currentUser = payload;
  } catch(err) {
    next();
  }

    next(); 
};
