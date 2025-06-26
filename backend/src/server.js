import express from "express";
import cors from "cors"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path"
dotenv.config();


console.log(process.env.MONGO_URI);

const app = express();
const PORT= process.env.PORT || 5001
const __dirname = path.resolve()



//middleware
if(process.env.NODE_ENV !== "production"){

    app.use(cors({
    origin:"http://localhost:5173"
}
))
}

app.use(express.json());
app.use(rateLimiter);


// app.use((req,res,next) =>{
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);
if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/my-app/dist")))

app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../frontend/my-app", "dist" , "index.html"))
})
}

connectDB().then(() => {
    app.listen(PORT, ()=> {
    console.log("server started on PORT:",PORT);
});

})


