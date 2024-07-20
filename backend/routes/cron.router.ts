import { buildMeetingsBy_Month_FCSM } from "./utils/FCSM";

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

export default router
