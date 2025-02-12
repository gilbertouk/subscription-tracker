import { Router } from "express";
import { logIn, logOut, register } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", logIn);
authRouter.post("/logout", logOut);

export default authRouter;
