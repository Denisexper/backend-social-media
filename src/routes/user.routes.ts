import UserController from "../controllers/UserController";

import { Router} from "express";

const auth = require("../middleware/auth");

const app=Router()
app.post("/public/user-register",UserController.userRegister)
app.post("/public/user-login",UserController.userLogin)
app.post("/private/user-test",auth.authenticate, UserController.privateTest)
export default app




