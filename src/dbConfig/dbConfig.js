import mongoose from "mongoose";

export default function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("MongoDB connected");
        });

        connection.on('error', (error) => {
            console.error("Mongoose connection failed: " + error);
            process.exit();
        });

    } catch (error) {
        console.error("Something went wrong during MongoDB connection:", error);
    }
}
