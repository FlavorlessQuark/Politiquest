import mongoose, {ObjectId, Schema, model} from "mongoose";


export interface ICalItem {
    cancelled: boolean,
    date: string,
    url:string,
    uid: string,
    title: string,
    category: string,
    subscribers: Array<ObjectId>
}

export const CalendarItemSchema = new Schema<ICalItem>({
    cancelled : {
        type: Boolean,
        required: true
    },
    date: {
        type : String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required:true
    },
    title: {
        type:  String,
        required:true
    },
    category: {
        type:  String,
        required:true
    },
    subscribers: {
        type: [{
            type: Array<mongoose.Schema.Types.ObjectId>,
            ref: "User"
        }],
        required:true,
        default: [],
    }
});

