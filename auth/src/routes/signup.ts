import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password should be in len 4 to 20")
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email already in use");
    }
    const user = User.build({ email, password });
    let resp = await user.save();

    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET!
    );

    req.session = {
      jwt: userJWT
    };
    console.log("resp", resp);
    res.status(201).send(resp);
  }
);

export { router as signupRouter };
