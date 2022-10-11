import express from "express"
import dbConnection from "./Database/dbconnection.js";
import Env from 'dotenv'
import apiRouter from "./Routes/api/routes.js";

//initial configurations
const app = express();
app.use(express.json());
Env.config();

//connecting to db
dbConnection(process.env.DB_URL);

//routes
app.use('/api',apiRouter);

//listening to server
app.listen(3000);