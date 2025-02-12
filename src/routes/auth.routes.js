import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", (req, res) => {
    res.send({title: "User registered"});
});

authRouter.post("/login", (req, res) => {
    res.send({title: "User logged in" });
});

authRouter.post("/logout", (req, res) => {
    res.send({title: "User logged out" });
});

export default authRouter;