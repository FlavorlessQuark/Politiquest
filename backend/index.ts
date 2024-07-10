import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import puppeteer from 'puppeteer';
import mongoose, { connect } from "mongoose";
import cors from "cors"
import bodyParser from "body-parser";

import meetCat from "./schemas/meetingCategories.schema"
import { ICalItem, CalendarItemSchema } from "./schemas/calendarItem.schema";

import meettingsrouter from "./routes/meetings.route";
import zoomrouter from "./zoom/zoom.router";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req: Request, res : Response) => {
  res.send('Express + TypeScript Server');
});

const connectDB = async () => {
        const dbUrl = process.env.MONGO_URL;

        if (dbUrl)
            await connect(dbUrl);
}

const test = async () => {
    const url:string = "https://www.fostercity.org/calendar"

    const coll = mongoose.model<ICalItem>("FCSMCalItem", CalendarItemSchema)
    // const browser = await puppeteer.launch( {headless: false, slowMo: 1000});
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const selector = ".item";
    const result = await page.$$(selector)
    const types = new Set<string>();

    const bulkData = [];

    for (const r of result) {
        const Etype = await r.$(".stripe")
        const info = await r.$eval('a', a => {return {ref:a.getAttribute('href'), text:a.textContent}})

        if (info == null || info.text == null || info.ref == null)
            throw "info data is null but shouldn't be"
        const include = info.text.toLowerCase().includes("meeting");

        if (Etype && include)
        {

            let type = await Etype.evaluate(e =>e.getAttribute("title"));

            const Etime = await r.$(".date-display-single")
            const time = await Etime?.evaluate(e => {return  e.getAttribute("content")})

            if (type == null)
                throw "type is null but shouldn't be"
            if (time == null || time == undefined)
                throw "time is null but shouldn't be"
            // TODO NEED FUZZY MATCH BECAUSE MISSPELLINGS HAPPEN
            const status = info.text.toLowerCase().includes("cancelled");

            type = type.slice(5);
            types.add(type);


            // console.log("Title: ", type, "time", time, "ref", info, "Is meeting", include, status)

            const update : ICalItem = {
                cancelled : status,
                date: time,
                url: info.ref,
                uid : type + time,
                category: type
            }
            bulkData.push(
                {
                    "updateOne": {
                        "filter": {
                            "uid": update.uid
                        },
                        "update": update,
                        "upsert": true
                    }
                }
            )
        }
    }

    // console.log("typoes shoud add", types)
    await meetCat.updateOne(
        {city: "Foster City", county:"San Mateo"},
        {city: "Foster City",
         county:"San Mateo",
         categories: Array.from(types),
        },
        {upsert: true}
    )

    let res = await coll.bulkWrite(bulkData);

    console.log(res)
    // const result = await page.evaluate(() => {
    //     let items = document.getElementsByClassName("field-content aha_ada_fixes_span");

    //     return items
    // })

    // console.log("selectors awaited")
    // const events = await page.$$eval('.item', async (elems) => {
    //     console.log("found", elems)
    // });
    console.log("done")
}

connectDB();
// test()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/meetings", meettingsrouter)
app.use("/zoom", zoomrouter)


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
