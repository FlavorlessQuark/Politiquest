import mongoose from "mongoose";
import { IMeetCal, MeetingCalendar } from "../../../schemas/meetingCalendar.schema";
import { buildMeetingsBy_Month_FCSM } from "../FCSM";
import { ICalItem, CalendarItemSchema } from "../../../schemas/calendarItem.schema";

interface ICitiesMap {
    collection: mongoose.Model<IMeetCal>;
    build: (
        year: number,
        month: number,
        calItem: mongoose.Model<ICalItem>,
        calendar: mongoose.Model<IMeetCal>
    ) => Promise<void>;
}

type CitiesMap = { [key: string]: ICitiesMap }

export const cities: CitiesMap = {
    "FCSM": {collection: mongoose.model<IMeetCal>("FCSMCalendars", MeetingCalendar), build: buildMeetingsBy_Month_FCSM},
}
