import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/currentUser", (req: Request, res: Response) => {
  if(!req.session?.jwt) {
    console.log("payload 1", req);
    res.send({currentUser: null});
  }
    try {
      const payload = jwt.verify(req.session.jwt,process.env.JWT_SECRET!)
      console.log("payload", payload);
      console.log("payload", req.session.jwt);
      res.send({currentUser:payload})
    } catch(err) {
      res.send({currentUser:null})
    }
});

export { router as currentUserRouter };
