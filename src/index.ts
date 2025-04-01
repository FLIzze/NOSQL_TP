import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/mongodb";
import profileRoutes from "./api/profiles";  

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());  

connectDB();

app.use("/api/profiles", profileRoutes);  

app.get("/", (req, res) => {
        res.send("API Mongoose is running...");
});

app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
});
