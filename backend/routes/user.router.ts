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

        const user = await userColl.findOne({id: req.query.id}).populate("savedMeetings")

        if (!user)
            throw `user not found`
        user.notifToken = undefined;
        console.log("got user", user)
        return res.status(200).send(user)
    }
    catch (err) {
        return res.status(500).send(err)
    }
})


router.post("/star-meeting", async (req, res) => {
    try {

        const itemColl = mongoose.model<ICalItem>("CalItem", CalendarItemSchema);
        console.log(req.body)
        if (req.body.meetingid == undefined|| req.body.userid == undefined)
            throw "invalid request"

        const meet = await itemColl.findOne({uid: req.body.meetingid}, {_id: true})
        console.log("Foiound", meet)

        if (!meet)
            throw "Meeting does not exists"

        await itemColl.updateOne({uid: req.body.meetingid}, {$addToSet: {subscribers  : req.body.userid}})
        const op = await userColl.updateOne({id: req.body.userid}, {$addToSet: {savedMeetings: meet._id}})
        // const user = await userColl.findOne({id: req.query.id})
        if (!op)
            throw "Unable to save meeting"

        // if (!user)
        //     throw `user not found`
        // return res.status(200).send(user)
        return res.status(200).send(op? true : false)
    }
    catch (err) {
        console.log("error starring meeting", err)
        return res.status(500).send(err)
    }
})

router.post("/unstar-meeting", async (req, res) => {
    try {

        const itemColl = mongoose.model<ICalItem>("CalItem", CalendarItemSchema);
        console.log(req.body)
        if (req.body.meetingid == undefined|| req.body.userid == undefined)
            throw "invalid request"

        const meet = await itemColl.findOne({uid: req.body.meetingid}, {_id: true})
        console.log("Foiound", meet)

        if (!meet)
            throw "Meeting does not exists"

        itemColl.updateOne({uid: req.body.meetingid}, {$pull: {subscribers  : req.body.userid}})
        const op = await userColl.updateOne({id: req.body.userid}, {$pull: {savedMeetings: meet._id}})
        // const user = await userColl.findOne({id: req.query.id})
        if (!op.matchedCount)
            throw "Unable to delete meeting"

        console.log("deleted meeting res", op)
        // if (!user)
        //     throw `user not found`
        // return res.status(200).send(user)
        return res.status(200).send(op? true : false)
    }
    catch (err) {
        console.log("error unstarring meeting", err)
        return res.status(500).send(err)
    }
})

router.post("/saveNotifToken", async (req, res) => {
    try {
         if (!req.query.id)
            throw 'Invalid request'

        const user = await userColl.updateOne({id: req.query.id}, {notifToken: req.body.token, notify: true})
        console.log("Update dnotif prefs")
        if (!user)
            throw `user not found`
    }
    catch (err) {
        console.log("error unstarring meeting", err)
        return res.status(500).send(err)
    }
})

export default router;
