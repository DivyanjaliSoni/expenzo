import mongoose, { connection } from "mongoose";


export default function connect (){
    try {
        mongoose.connect(process.env.MONGODB_URI);

        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log("mongodb connected ")
        })

        connection.on('error',(error)=>{
            console.log("mongoose connection failed" + error )
            process.exit()
        })
        
    } catch (error) {
        console.log("something went wrong")
        console.log(error)
    }
}