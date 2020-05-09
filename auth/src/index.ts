import express from "express";
import { json } from "body-parser";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";

const app = express();
app.use(json());
const port = parseInt(process.env.PORT, 10) || 3000;

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.get("/", (request, response) => {
  response.send("<h1>Ticketing Auth</h1>");
});

app.listen(port, function() {
  console.log("Listening on port 3000");
});

// https://notepad.pw/d022dyzw
