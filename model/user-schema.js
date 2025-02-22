import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
       

    },
    lastname:{
        type:String,
      

    },
    username:{
        type:String,
       

    },
    email: { type: String, unique: true, required: true }, // Ensure email is required

    password:{
        type:String,
       

    },
    phone:{
        type:String,
      
    }
})
const User=mongoose.model('User',userSchema);
export default User;
