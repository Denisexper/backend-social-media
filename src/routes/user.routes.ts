import UserController from "../controllers/UserController";

import { Router} from "express";

import authJwt from "../middleware/auth";

const app=Router()
app.post("/public/user-register",UserController.userRegister)
app.post("/public/user-login",UserController.userLogin)
app.get("/private/get-user/:id", authJwt, UserController.getUser)
app.get("/private/user-list/:page", authJwt, UserController.getListUser)
app.put("/private/user/update", authJwt, UserController.updateUser)
app.delete("/public/delete-user/:id", UserController.deleteUser)
export default app 

//para entender el metodo del get/id es necesario crear el usuario luego logearse con el y de ahi 
//y luego buscar por id le pasamos el id por los parametros y el token que nos genero en el login
//se lo pasamos por lo headers Authorization si no le pasamos el token nos dara unhautorizate
//tambien tenemos que ver que el token no haya expirado





