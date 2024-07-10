import { Router } from "express";
import { ICalItem, CalendarItemSchema } from "../schemas/calendarItem.schema";
import mongoose from "mongoose";


const router = Router();

const schemas = {
    "FCSM": mongoose.model<ICalItem>("FCSMCalItem", CalendarItemSchema)
}

router.get("/get-all", async (req, res) => {
    let data = req.query.from?.toString();

    try {
        if (data && Object.keys(schemas).includes(data))
        {
            const coll = schemas.FCSM;

            let result = await coll.find()

            // console.log('Query result', result)
            return res.status(200).send(result)
        }
        else
            throw "From field not supported or inexistant " + data
    }
    catch(err) {
        return res.status(500)
    }

})

export default router;
