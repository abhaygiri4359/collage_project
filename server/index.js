import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import interviewRouter from "./routes/interview.route.js"
import paymentRouter from "./routes/payment.route.js"
const app = express()

// Trust reverse proxy (required for Render HTTPS and secure cookies)
app.set("trust proxy", 1)

const allowedClientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, "") : null;

app.use(cors({
    origin: (origin, callback) => {
        // allow requests with no origin (like mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);
        const cleanOrigin = origin.replace(/\/$/, "");
        let isRenderDomain = false;
        try {
            isRenderDomain = /\.onrender\.com$/.test(new URL(origin).hostname);
        } catch {
            isRenderDomain = false;
        }
        if (
            cleanOrigin === "http://localhost:5173" ||
            cleanOrigin === "http://localhost:5174" ||
            cleanOrigin === "http://127.0.0.1:5173" ||
            cleanOrigin === "http://127.0.0.1:5174" ||
            (allowedClientUrl && cleanOrigin === allowedClientUrl) ||
            isRenderDomain ||
            /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
        ) {
            return callback(null, true);
        }
        return callback(new Error("CORS not allowed"));
    },
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

// Health check endpoint for Render
app.get("/", (req, res) => {
    res.status(200).json({ message: "InterviewAI Backend Server Running Successfully" });
})

app.use("/api/auth" , authRouter)
app.use("/api/user", userRouter)
app.use("/api/interview" , interviewRouter)
app.use("/api/payment" , paymentRouter)

const PORT = process.env.PORT || 8000
app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`)
    connectDb()
})
