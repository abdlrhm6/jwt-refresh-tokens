import express from "express";
import router from "./routes/auth.js";
import { connect } from "./utils/db.js"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
const app = express()
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}))
app.use(express.json())
app.use("/api/auth", router)

connect().then(() => {
    app.listen(4000, () => console.log("listening ...."))
})