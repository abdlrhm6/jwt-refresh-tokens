import mongoose from "mongoose";


export const connect = () => {
   return new Promise((resolve)=>{
    mongoose.connect(process.env.MONGO_URL)
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB');
        resolve(true)
    })
    
   })
}