import {  Request,Response} from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';
import jwt from "../services/jwt"
import { UserObject } from "../services/jwt";

interface authentication extends Request{
    user?: any
}

class UserController {
     async userRegister(req:Request,res:Response){
        try {
            //received the data
            const{name, surname, nick, email, password} = req.body;
            //find the user for no repeats users
            const userFind = await User.findOne({
                name:name,
                email:email
            })
            if(userFind){
                res.status(403).send({
                    status:false,
                    message:"The user already exist"
                })
                return
            }

            let newUser={
                name,
                surname,
                nick,
                email,
                password
            }
            //encrypt the password
            const hashed = await bcrypt.hash(password,10)
            newUser.password = hashed
            
            const responseData = new User(newUser)
            await responseData.save()
            //sent an message
            res.send({
                status:true,
                message:"register sucessfull",
                responseData
            })
        } catch (error) {
            res.send({
                status:400,
                message:"Process failed"
            })
        }        
     }
     async getUser(req: Request, res: Response) {
        try {
            
            const { id } = req.params;

            const userFind = await User.findById(id).select('-password -__v -role')

            res.send(userFind)

        } catch (error) {
            
            res.send({
                status:400,
                message:"Process failed"
            })
        }
     }
     async userLogin(req:Request,res:Response){
        try {
            const {email, password} = req.body

            const findUser = await User.findOne({email: email})
            if(!findUser){
                res.status(404).send({
                    status:false,
                    message:"User not found"
                })
                return
            }

            const verifyPassword = await bcrypt.compare(password,findUser.password)
            if(!verifyPassword){
                res.send({
                    status:false,
                    message:"Invalid password"
                })
                return
            }

            //create interface
            const interfaceUser:UserObject={
                name:findUser.name,
                surname:findUser.surname,
                nick:findUser.nick,
                email:findUser.email,
                role:findUser.role
            }
            const jwtLogin = jwt.authentication(interfaceUser)
            res.send({
                status:true,
                message:"Login sucessfull",
                findUser,
                token: jwtLogin
            })


            
        } catch (error) {
            res.send({
                status:false,
                message: "Login failed",
                error
                
            })
        }
     }
     async privateTest(req:Request, res: Response){
        try {
            res.send({

                status: true,

                message: "Private test sucessfull",

                data: req.params
            })

        } catch (error) {

            res.status(404).send({

                status:false,

                message:"Error",

                error
            })
        }
     }
     async getListUser(req: Request, res: Response){
        try {
            //convert to number the page
            const page = Number(req.params.page) | 1
            //convert to number the limit
            const limit = Number(req.params.limit) | 3
            //create the skip
            const skip = (page - 1) * limit
            //get all users
            const data = await User.find().skip(skip).limit(limit).select('-password -__v -role')
            const couterDocument = await User.countDocuments()
            res.send({
                status:true,
                message:"list user",
                couterDocument,
                data
            })
        } catch (error) {
            res.status(404).send({
                status:false,
                message:"Error",
                error
            })
        }
     }
     async updateUser(req: authentication, res: Response){
        try {
           const userBody = req.body
           const userTokem = req.user
            
        } catch (error) {
            res.send({
                status:false,
                message:"Error",
                error
            })
        }
     }
     //delete user solo para ordenar mi db aun falta arreglarlo con el jwtoken
     async deleteUser(req: authentication, res: Response){
        try {
            const { id } = req.params
            const deleteUser = await User.findByIdAndDelete(id)
            res.send({
                status:true,
                message:"delete user",
            })
        } catch (error) {
            res.send({
                status:false,
                message:"Error",
                error
            })
        }
     }
}


export default new UserController()
