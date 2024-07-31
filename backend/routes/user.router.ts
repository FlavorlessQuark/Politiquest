import { Router } from "express";
import mongoose from "mongoose";
import { IMeetCal, MeetingCalendar } from "../schemas/meetingCalendar.schema";
import { buildMeetingsBy_Month_FCSM } from "./utils/FCSM";
import { ICalItem, CalendarItemSchema } from "../schemas/calendarItem.schema";
import { cities } from "./utils/cities/citiesCollections";
import { IUser, User } from "../schemas/user.schema";

const router = Router();

const userColl = mongoose.model<IUser>("User", User)

router.get("/get-user", async (req, res) => {
    try {
        if (!req.query.id)
            throw 'Invalid request'

        const user = await userColl.findOne({id: req.query.id})

        if (!user)
            throw `user not found`
        return res.status(200).send(user)
    }
    catch (err) {
        return res.status(500).send(err)
    }
})

export default router;
