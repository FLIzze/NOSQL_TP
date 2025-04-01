"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("./config/mongodb");
const profiles_1 = __importDefault(require("./api/profiles"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
(0, mongodb_1.connectDB)();
app.use("/api/profiles", profiles_1.default);
app.get("/", (req, res) => {
    res.send("API Mongoose is running...");
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
