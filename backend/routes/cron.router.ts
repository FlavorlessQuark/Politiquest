import { cities } from "./utils/cities/citiesCollections";
import mongoose from "mongoose";
import { ICalItem, CalendarItemSchema } from "../schemas/calendarItem.schema";
import { updateMeetings } from "./utils/FCSM";
import { IUser, User } from "../schemas/user.schema";

const express = require("express");
const router = express.Router();
const cron = require("node-cron");
const { Expo } = require("expo-server-sdk")

let watchedhr = new  Set<ICalItem>()
let watchedmin = new  Set<ICalItem>()
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



const LOOKAHEAD_HOURS = 12

const sendNotification = async (message: string, token:string) => {
    const  expo = new Expo();
    const chunks = expo.chunkPushNotifications([
        { to: token, sound: "default", body: message }
    ]);


}

cron.schedule("0 0 */11 * *", async () => {
    try {
        const meetCal = cities["FCSM"].collection;
        const begin = new Date();
        const end = new Date();

        console.log("running cron update, 11hr")
        const itemColl = mongoose.model<ICalItem>("CalItem", CalendarItemSchema);
        end.setTime(begin.getTime() + LOOKAHEAD_HOURS * 60 * 60 * 1000);
        const next12 = await itemColl.find({date: {$gte: begin.toISOString(), $lte: end.toISOString()}});

        if (!next12)
            throw "Failed to retrieve meetings";
        updateMeetings(next12 as [any], itemColl, meetCal)

        for (let meet of next12) {
            watchedhr.add(meet);
        }
    }
    catch (error) {
        console.log("Error in job to update meeting data", error)
    }
})


cron.schedule("0 0 */1 * *", async () => {
    try {
        const begin = new Date();
        console.log("running cron update, 1hr")

        const tmp = new Set<ICalItem>()
        for (let item of watchedhr) {
            const date = new Date(item.date)

            if (date.getTime() <= begin.getTime() + 0.5 * 60 * 60 * 1000) {
                //notify
                for (let subscriber of item.subscribers) {
                    let  user = await mongoose.model<IUser>("User", User).findOne({_id: subscriber});

                    if (user && user.notifToken != "undefined"  && user.notifToken != null)
                        await sendNotification("'" + item.category + "'  in 1 hour", user.notifToken);
                }
                watchedmin.add(item)
            }
            else
                tmp.add(item)
        }
        watchedhr = tmp;
    }
    catch (error) {
        console.log("Error in job to update meeting data", error)
    }
})

cron.schedule("*/5 * * * *", async () => {
    try {
        const begin = new Date();

        console.log("running cron update, 5 min")
        const tmp = new Set<ICalItem>()
        for (let item of watchedmin) {
            const date = new Date(item.date)

            if (date.getTime() <= begin.getTime() + 5 * 60 * 1000) {
                 for (let subscriber of item.subscribers) {
                    let  user = await mongoose.model<IUser>("User", User).findOne({_id: subscriber});

                    if (user && user.notifToken != "undefined"  && user.notifToken != null)
                        await sendNotification("'" + item.category + "'  in 1 hour", user.notifToken);
                }
                console.log("Woyuld notify, min")
            }
            else
                tmp.add(item)
        }
        watchedmin = tmp;
    }
    catch (error) {
        console.log("Error in job to update meeting data", error)
    }
})

export default router
