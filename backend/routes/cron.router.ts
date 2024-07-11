import { fetchMeetingForDate } from "./utils/fetchMeetings";

const express = require("express");
const router = express.Router();
const cron = require("node-cron");

cron.schedule("*/15 * * * *", async () =>
{
    console.log('transfer crons')
    try {
    }
    catch(error) {
        console.log(error);
    }
})

cron.schedule("0 0 0 * * *", async () =>
{
    console.log("running cron update")
    const today = new Date();

    const month = today.getUTCMonth();
    const year = today.getUTCFullYear();
    try {
        await fetchMeetingForDate(year, month)
        await fetchMeetingForDate(year, month + 1)
    }
    catch(error) {
        console.log(error);
    }
})

export default router
