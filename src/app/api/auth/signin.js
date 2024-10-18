import connect from "../../../dbConfig";
import User from "../../../models/userModel"; 
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    await connect(); // Ensure the DB is connected
    return res.status(200).json({ message: "Login successful", user });

    // if (req.method === "POST") {
    //     const { username, email, password } = req.body;

    //     try {
    //         // Check if user exists by email
    //         let user = await User.findOne({ email });

    //         if (user) {
    //             // If user exists, check password
    //             const isMatch = await bcrypt.compare(password, user.password);
    //             if (isMatch) {
    //                 // Successful login
    //                 return res.status(200).json({ message: "Login successful", user });
    //             } else {
    //                 // Password does not match
    //                 return res.status(401).json({ message: "Invalid credentials" });
    //             }
    //         } else {
    //             // If user does not exist, create a new user
    //             const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    //             user = new User({
    //                 username, // Include username
    //                 email,
    //                 password: hashedPassword,
    //             });

    //             await user.save(); // Save new user to the database
    //             return res.status(201).json({ message: "User created", user });
    //         }
    //     } catch (error) {
    //         console.error("Error processing request:", error);
    //         res.status(500).json({ message: "Server error" });
    //     }
    // } else {
    //     res.setHeader("Allow", ["POST"]);
    //     res.status(405).end(`Method ${req.method} Not Allowed`);
    // }
}
