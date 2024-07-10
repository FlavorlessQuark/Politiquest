import {Schema, model} from "mongoose";


interface meetCat {
    city: String,
    county:String,
    state?:String,
    categories: Array<String>
}

const meetingCategory = new Schema<meetCat>({
    city: {
        type: String,
        required: true
    },
    county: {
        type: String,
        required: true
    },
    state: {
        type: String,
    },
    categories: {
        type: [],
        required: true
    },
});

export default model<meetCat>("meetCat", meetingCategory)
