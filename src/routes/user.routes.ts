import UserController from "../controllers/UserController";
import Authenticate from "../middleware/auth";
import { Router} from "express";
const app=Router()
app.post("/public/user-register",UserController.userRegister)
app.post("/public/user-login",UserController.userLogin)
app.post("/private/user-test",Authenticate.authenticate, UserController.privateTest)
export default app




