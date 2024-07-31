import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import cors from "cors"
import bodyParser from "body-parser";
import mongoose, { connect } from "mongoose";


import meettingsrouter from "./routes/meetings.route";
import zoomrouter from "./zoom/zoom.router";
import cronrouter from "./routes/cron.router"
import userrouter from "./routes/user.router"
import { IUser, User } from "./schemas/user.schema";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req: Request, res : Response) => {
  res.send('Express + TypeScript Server');
});

const connectDB = async () => {
        const dbUrl = process.env.MONGO_URL;

        if (dbUrl)
            await connect(dbUrl);
}



connectDB();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/meetings", meettingsrouter)
app.use("/user", userrouter)
app.use("/zoom", zoomrouter)
app.use( "_", cronrouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

const test = async() => {
    const userColl = mongoose.model<IUser>("User", User)

    await new userColl({
        name:"testname",
        surname:"test surname",
        username:"test username",
        id:0,
    }).save()

}

// test()
