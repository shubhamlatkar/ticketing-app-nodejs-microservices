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
  let payload = null;
  console.log("payload 0", req.session);

  if(!req.session?.jwt) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      payload = jwt.verify(token, process.env.JWT_SECRET) as UserPaylod;
      req.currentUser = payload;
    } catch(err) {
      next();
    }
  } else {
    try {
      payload = jwt.verify(req.session.jwt,process.env.JWT_SECRET!) as UserPaylod;
     req.currentUser = payload;
   } catch(err) {
     next();
   }
  }
  next(); 
};
