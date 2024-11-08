import {  Schema,Document, model} from "mongoose";

interface UserInterface extends Document{
    name:string,
    surname:string,
    nick:string,
    email:string,
    password:string,
    role:string,
    image:string,
    created_at:Date
}


const UserModel=new Schema<UserInterface>({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String
    },
    nick:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"administrator"
    },
    image:{
        type:String,
        default:"image_user"
    },
    created_at:{
        type:Date,
        default:Date.now()
    }

})

const User = model<UserInterface>('User',UserModel)

export default User