import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB=async()=>{
    mongoose.set('strictQuery',true);
    if(!process.env.MONGODB_URI) return console.log("MONGODB_URI is not defined");

    if(isConnected) return console.log("=> Using existing database connection")

    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 10 seconds
            socketTimeoutMS: 45000
        });
        isConnected=true;
        console.log("MongoDb Connected")
    }
    catch(error){
        console.log(error)
    }
}