import app from "./app";
import { dbConnection } from "./middleware/db-connection";

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
