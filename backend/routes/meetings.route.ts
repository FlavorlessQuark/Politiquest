import { Router } from "express";
import mongoose from "mongoose";
import { IMeetCal, MeetingCalendar } from "../schemas/meetingCalendar.schema";
import { buildMeetingsBy_Month_FCSM } from "./utils/FCSM";
import { ICalItem, CalendarItemSchema } from "../schemas/calendarItem.schema";
import { cities } from "./utils/cities/citiesCollections";

const router = Router();

const itemColl = mongoose.model<ICalItem>("CalItem", CalendarItemSchema);

router.get("/get-by-id", async (req, res) => {
    try {
        console.log("got request for ", req.query)
        if (!req.query.id)
            throw "Invalid request"

        console.log("got request for id", req.query.id)

        const meeting = await itemColl.findOne({_id: req.query.id});

        if (!meeting)
            throw "Invalid request"

        return res.status(200).send(meeting)
    }
    catch(err) {
        return res.status(500).send(err)
    }
})


router.get("/get-year", async (req, res) => {
    try {

        if (!req.query.year || !req.query.from)
            throw "Invalid params"

        let from = req.query.from?.toString();
        let year = parseInt(req.query.year as string);

        if (from in cities)
        {
            const key = from as keyof typeof cities;
            const response:any = {};
            const exists = new Set<number>();
            let calColl = cities[key].collection;

            let result = await calColl.find({year: year}).populate("meetings")
            if (result) {
                for (const entry of result) {
                    exists.add(entry.month)
                    response[entry.month] = entry.meetings;
                }
            }
            for (let i = 1; i <= 12; i++)
            {
                if (!(exists.has(i)))
                {
                    await cities[from].build(year, i, itemColl, calColl)
                    let meetings = await calColl.find({ year: year}).populate("meetings")
                    response[i]= meetings
                }
            }
            // console.log('Query result', response)s
            return res.status(200).send(response)
            // return res.status(200).send([])
        }
        else
            throw "From field not supported or inexistant " + from
    }
    catch(err) {
        return res.status(500)
    }

})

router.get("/get-month", async (req, res) => {
    try {

        if (!req.query.year || !req.query.month || !req.query.from)
            throw "Invalid params"

        let from = req.query.from?.toString();
        let month = parseInt(req.query.month as string)
        let year = parseInt(req.query.year as string);

        if (from && Object.keys(cities).includes(from))
        {
            let calColl = cities[from].collection;

            let result = await calColl.findOne({month: month, year: year}).populate("meetings")

            if ( result == null)
            {
                await  cities[from].build(year, month, itemColl, calColl)
                result = await calColl.findOne({month: month, year: year}).populate("meetings")
            }

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
