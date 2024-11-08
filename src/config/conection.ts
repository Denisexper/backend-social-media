import mongoose from "mongoose";

let urlglobal = "mongodb://localhost:27017"

const conection=async()=>{
    try {
        //Rememeber change your database
        //in this case it`s social in your case it will be your database
        await mongoose.connect(urlglobal)
        console.log("Connection succesfull");
    } catch (error) {
        console.log(error);
    }
}
export {conection}