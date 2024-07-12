import mongoose, { ObjectId, Schema } from "mongoose";

export interface IMeetCal {
    year: number,
    month: number,
    meetings: Array<ObjectId>,
}

export const MeetingCalendar = new Schema<IMeetCal> ({
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    meetings: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "CalItem"
        }],
    }
})
