import app from "./app";
import { dbConnection } from "@sgtickets/common";

const port = parseInt(process.env.PORT, 10) || 3000;

const start = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("no key");
  }

  app.listen(port, function() {
    console.log("Listening on port 3000");
  });
};

dbConnection();

start();
// https://notepad.pw/d022dyzw
