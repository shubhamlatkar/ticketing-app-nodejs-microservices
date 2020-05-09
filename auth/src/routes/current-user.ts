import express from "express";

const router = express.Router();

router.get("/api/users/currentUser", (req, res) => {
  res.send("curr");
});

export { router as currentUserRouter };
