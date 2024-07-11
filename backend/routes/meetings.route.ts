import { Router } from "express";
import mongoose from "mongoose";
import { IMeetCal, MeetingCalendar } from "../schemas/meetingCalendar.schema";
import { fetchMeetingForDate } from "./utils/fetchMeetings";


const router = Router();

const schemas = {
    "FCSM": mongoose.model<IMeetCal>("FCSMCalendar", MeetingCalendar)
}


import {RequestHandler} from "express";

type Params = {};
type ResBody = {};
type ReqBody = {};
type ReqQuery = {
    query: string;
}


router.get("/get-all", async (req, res) => {
    try {

        if (!req.query.year || !req.query.month || !req.query.from)
            throw "Invalid params"

        let from = req.query.from?.toString();
        let month = parseInt(req.query.month as string)
        let year = parseInt(req.query.year as string);


        if (from && Object.keys(schemas).includes(from))
        {
            const coll = schemas.FCSM;

            let result = await coll.findOne({month: month, year: year}).populate("meetings")

            if ( result == null)
                await fetchMeetingForDate(year, month)

            result = await coll.findOne({month: month, year: year}).populate("meetings")
            // console.log('Query result', result)
            return res.status(200).send(result?.meetings)
        }
        else
            throw "From field not supported or inexistant " + from
    }
    catch(err) {
        return res.status(500)
    }

})

export default router;
