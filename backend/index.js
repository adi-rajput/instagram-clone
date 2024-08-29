import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import userRoute from "./routes/user_routes.js"
import postRoute from "./routes/post_routes.js"
import messageRoute from "./routes/message_routes.js"

dotenv.config({});

const app = express();

const PORT =  process.env.PORT || 3000
app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"Hello from server",
        success:true
    })
})
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
const corsOptions={
    origin:["http://localhost:5173"],
    credentials:true,
}
app.use(cors(corsOptions));


//routes
app.use("/api/v1/user" , userRoute);
app.use("/api/v1/post" , postRoute);
app.use("/api/v1/message" , messageRoute);
//"http://locolhost:8000/api/v1/user/register"

app.listen(PORT,()=>{
    connectDB();
    console.log(`server running at ${PORT}`)
})
