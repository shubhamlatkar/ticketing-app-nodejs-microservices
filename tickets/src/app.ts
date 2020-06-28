import express from "express";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import "express-async-errors";
import { errorHandler, NotFoundError } from "@sgtickets/common";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test"
  })
);
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/", (request, response) => {
  response.send("<h1>Ticketing Ticket</h1>");
});
app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);
export default app;
