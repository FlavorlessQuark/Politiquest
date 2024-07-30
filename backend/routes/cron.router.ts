import { cities } from "./utils/cities/citiesCollections";
import mongoose from "mongoose";
import { ICalItem, CalendarItemSchema } from "../schemas/calendarItem.schema";
import { updateMeetings } from "./utils/FCSM";

const express = require("express");
const router = express.Router();
const cron = require("node-cron");



// cron.schedule("0 0 0 * * *", async () =>
// {
//     console.log("running cron update")
//     const today = new Date();

//     const month = today.getUTCMonth();
//     const year = today.getUTCFullYear();
//     try {
//         await buildMeetingsBy_Month_FCSM(year, month)
//         await buildMeetingsBy_Month_FCSM(year, month + 1)
//     }
//     catch(error) {
//         console.log(error);
//     }
// })



cron.schedule("*/1 * * * *", async () => {
    try {
        const meetCal = cities["FCSM"].collection;
        const begin = new Date();
        const end = new Date();

        const itemColl = mongoose.model<ICalItem>("CalItem", CalendarItemSchema);
        end.setTime(begin.getTime() + 12 * 60 * 60 * 1000);
        const next12 = await itemColl.find({date: {$gte: begin.toISOString(), $lte: end.toISOString()}});

        if (!next12)
            throw "Failed to retrieve meetings";
        updateMeetings(next12 as [any], itemColl, meetCal)
        // console.log(next12)
        // console.log(begin.toISOString(), end.toISOString())
    }
    catch (error) {
        console.log("Error in job to update meeting data", error)
    }
})

export default router
