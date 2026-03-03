import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/db.js";

dotenv.config({ path: "./.env" });

connectDB();
try{
    app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    });
}
catch(err){
    console.log("Error in connecting to database",err);
}