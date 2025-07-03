import express from "express"
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()

connectDB();

//middleware

if(process.env.NODE_ENV !== "production") {
    app.use(cors({
    origin:"http://localhost:5173",
    })
    );
}


app.use(express.json()); //this middleware will parse JSON bodies
app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}


app.listen(PORT, () => {
    console.log("Server started on PORT:",PORT);
})


//What is endpoint?
//An endpoint is a combination of a URL + HTTP method that lets
//the client interact with a specific resource
