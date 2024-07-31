import mongoose, {ObjectId, Schema, model} from "mongoose";

export interface IUser {
    name: string,
    surname: string,
    username: string,
    id: number,
    level: number,
    xp: number,
    reigsteredDriver: boolean,
    verified: boolean,
    achievements: Array<ObjectId>,
    quests: Array<ObjectId>,
    savedMeetings: Array<ObjectId>,
}

export const User = new Schema<IUser> ({
    name:{
        type: String,
        require:true
    },
    surname:{
        type: String,
        require:true
    },
    username:{
        type: String,
        require:true
    },
    id:{
        type: Number,
        required:true,
        index:true
    },
    level:{
        type: Number,
        required:true,
        default: 0
    },
    xp:{
        type: Number,
        required:true,
        default:0
    },
    reigsteredDriver:{
        type:Boolean,
        required: true,
        default: false
    },
    verified:{
        type:Boolean,
        required: true,
        default: false
    },
    achievements:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: ""
        }],
        default: []
    },
    quests:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: ""
        }],
        default: []
    },
    savedMeetings:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "CalItem"
        }],
        default: []
    },
})
