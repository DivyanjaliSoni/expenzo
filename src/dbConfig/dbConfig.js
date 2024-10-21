import mongoose from "mongoose";

export default async function connect() {
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB already connected");
    return; 
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");

  } catch (error) {
    console.error("Something went wrong during MongoDB connection:", error);
    throw new Error("MongoDB connection failed");
  }
}
