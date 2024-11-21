import { cities } from "./utils/cities/citiesCollections";
import mongoose from "mongoose";
import { ICalItem, CalendarItemSchema } from "../schemas/calendarItem.schema";
import { updateMeetings } from "./utils/FCSM";
import { IUser, User } from "../schemas/user.schema";

const express = require("express");
const router = express.Router();
const cron = require("node-cron");
const { Expo } = require("expo-server-sdk")


enum BATCH {
    HALFDAY_BATCH = 0,
    HOUR_BATCH ,
    BATCH_END
}


let batchMeetings: Array<Set<ICalItem>> = Array(BATCH.BATCH_END).fill(null).map((_) => new Set<ICalItem>())

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
    console.log("tokenn", token)
     if (!Expo.isExpoPushToken(token)) {
        console.log(`Push token ${token} is not a valid Expo push token`);
    }
    const chunks = expo.chunkPushNotifications([
        { to: token, sound: "default", body: message }
    ]);
    let tickets = [];

    for (let chunk of chunks) {
        try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
        } catch (error) {
        console.log("error",error);
        }
    }
    console.log("notify chunks", chunks)
}

// cron.schedule("0 0 */11 * *", async () => {
//     try {
//         const meetCal = cities["FCSM"].collection;
//         const begin = new Date();
//         const end = new Date();

//         console.log("running cron update, 11hr")
//         const itemColl = mongoose.model<ICalItem>("CalItem", CalendarItemSchema);
//         end.setTime(begin.getTime() + LOOKAHEAD_HOURS * 60 * 60 * 1000);
//         const next12 = await itemColl.find({date: {$gte: begin.toISOString(), $lte: end.toISOString()}});

//         if (!next12)
//             throw "Failed to retrieve meetings";
//         updateMeetings(next12 as [any], itemColl, meetCal)

//         for (let meet of next12) {
//             watchedhr.add(meet);
//         }
//     }
//     catch (error) {
//         console.log("Error in job to update meeting data", error)
//     }
// })





const notify_meeting = async(lookahead_time:number, batch_num: number) => {
    const updated_batch = new Set<ICalItem>()
    const next_batch = new Set<ICalItem>()
    const now = new Date();

    console.log("Notification cron :", lookahead_time / 1000 / 60 ,"min")
    console.log("Lookingat batch :", batchMeetings[batch_num])
        for (let item of batchMeetings[batch_num]) {
            const date = new Date(item.date)

            console.log("Dates", item.date, date, date.getTime() , now.getTime() + lookahead_time)
            if (date.getTime() <= now.getTime() + lookahead_time) {
                console.log("NOTIFY- mettting", item)
                 for (let subscriber of item.subscribers) {
                    let  user = await mongoose.model<IUser>("User", User).findOne({id: subscriber});

                    if (user && user.notifToken != "undefined"  && user.notifToken != null)
                        await sendNotification("'" + item.category + "'  in 1 hour", user.notifToken);
                }
                console.log("Woyuld notify, min")
                next_batch.add(item)
            }
            else
                updated_batch.add(item)
        }
        console.log("UpdTED", updated_batch)
        console.log("next", next_batch)
        batchMeetings[batch_num] = updated_batch;
        batchMeetings[batch_num + 1] = next_batch;
}


export const make_cron_batches = async() => {
    const meetCal = cities["FCSM"].collection;
    const begin = new Date();
    const end = new Date();

    console.log("Get new meetings batch")
    const itemColl = mongoose.model<ICalItem>("CalItem", CalendarItemSchema);
    end.setTime(begin.getTime() + 10 * 60 * 60 * 1000);
    const nexthr = await itemColl.find({date: {$gte: begin.toISOString(), $lte: end.toISOString()}});
    batchMeetings[BATCH.HALFDAY_BATCH] = new Set(nexthr);
    console.log("HOUR - Got meetings", nexthr)

    notify_meeting(1 * 60 * 60 * 1000, BATCH.HALFDAY_BATCH);
    notify_meeting(5 * 60 * 1000, BATCH.HOUR_BATCH);
}


cron.schedule("0 0 */1 * *", async () => {
    try {
        notify_meeting(1 * 60 * 60 * 1000, BATCH.HALFDAY_BATCH);
    }
    catch (error) {
        console.log("Error in job to update meeting data", error)
    }
})

cron.schedule("*/5 * * * *", async () => {
    try {
        notify_meeting(5 * 60 * 1000, BATCH.HOUR_BATCH);
    }
    catch (error) {
        console.log("Error in job to update meeting data", error)
    }
})

export default router
