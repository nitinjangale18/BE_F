
import User from "../model/user-schema.js";

export const userSignup=async(request,response)=>{
    try{
        const user=request.body;
        const newUser=new User(user);
        await newUser.save();
        response.status(200).json({ message: "User created successfully", newUser });
        
       console.log(newUser);
    }
    catch(error){
        console.log("error is",error);
    }
}

export const userLogin = async (request, response) => {
    try {
        console.log("Login API called");

        const { username, password } = request.body;

        // Check if user exist
        console.log(request.body);
        const existingUser = await User.findOne({username});

        if (!existingUser){
            return response.status(400).json({ message: "User not found" });
        }

        // Check password (assuming plain-text password for now)
        if (existingUser.password !== password) {
            return response.status(401).json({ message: "Invalid credentials" });
        }

        console.log("User found:", existingUser);
        return response.status(200).json({ message: "User login successful", user: existingUser });

    } catch (error) {
        console.error("Error during login:", error);
        return response.status(500).json({ message: "Internal Server Error" });
    }
};

