//import modules
import jwt, { decode } from "jwt-simple"
import moment from "moment"
import { Request , Response, NextFunction } from "express"
//import secret key
import { SECRETKEY } from "../services/jwt"
//import jwt
import jwtService from "../services/jwt"

//create a authenticate funtion 

export const authenticate = (req: Request & { user: any }, res: Response, next: NextFunction) => {
    try {
        if(!req.headers.authorization){
            res.status(404).send({
                status: false,
                message: "Unauthorization not found"
            })
            return
        }
        let token = req.headers.authorization?.replace(/['"]+/g, '')
        const decodeToken = jwt.decode(token ? token: "", SECRETKEY)
        if(decodeToken.exp <= moment().unix()){
            res.send({
                status: false,
                message: "Token Expired"
            })
            return
        }
        req.user= decodeToken
        next()
    } catch (error) {
        res.send({
            status: false,
            message: "Invalid Token",
            error
        })
    }
}
export default authenticate;


