import express from "express";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import "express-async-errors";
import { dbConnection } from "./middlewares/db-connection";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);
const port = parseInt(process.env.PORT, 10) || 3000;

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.get("/", (request, response) => {
  response.send("<h1>Ticketing Auth</h1>");
});
app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);
dbConnection();

const start = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("no key");
  }
  app.listen(port, function() {
    console.log("Listening on port 3000");
  });
};

start();
// https://notepad.pw/d022dyzw
