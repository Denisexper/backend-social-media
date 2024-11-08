//import the modules 
import jwtSimple from "jwt-simple"
import moment from "moment"

//create the secret key
export const SECRETKEY = "SPUTNIK_SECRET"

//we´ll create the token funtion 
export interface UserObject {
    name:string,
    surname: string,
    nick: string,
    email:string,
    role: string,
    iat?:number,
    exp?:number
}
const authentication = (user: UserObject) => {
    const payload={
        name:user.name,
        surname:user.surname,
        nick:user.nick,
        email:user.email,
        role:user.role,
        iat:moment().unix(),
        exp:moment().add(30, "days").unix()
    }

    //return decodify token
    return jwtSimple.encode(payload, SECRETKEY)
}

export default {
    authentication
};
