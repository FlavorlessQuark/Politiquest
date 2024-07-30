import puppeteer from 'puppeteer';
import mongoose, { connect } from "mongoose";
import meetCat from "../../schemas/meetingCategories.schema"
import { ICalItem } from "../../schemas/calendarItem.schema";
import { IMeetCal } from '../../schemas/meetingCalendar.schema';

export const buildMeetingsBy_Month_FCSM = async (
    year: number,
    month:number,
    calItem: mongoose.Model<ICalItem>,
    calendar: mongoose.Model<IMeetCal>) => {
    let formatter = new Intl.NumberFormat('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    let formated_month = formatter.format(month);

    const url:string = "https://www.fostercity.org/calendar/month/" + year.toString() + "-" + formated_month

    console.log("url would be", url);


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

            const date = new Date(time).toISOString();
            type = type.slice(5);
            types.add(type);

            const update : ICalItem = {
                cancelled : status,
                date: date,
                url: info.ref,
                uid : type + date,
                title: info.text,
                category: type
            }

            bulkData.push({
                "updateOne": {
                    "filter": {
                        "uid": update.uid
                    },
                    "update": update,
                    "upsert": true
                }
            })
        }
    }

    await meetCat.updateOne(
        {city: "Foster City", county:"San Mateo"},
        {city: "Foster City",
         county:"San Mateo",
         categories: Array.from(types),
        },
        {upsert: true}
    )

    let res = await calItem.bulkWrite(bulkData);

    console.log(res)

    let newIds = []

    for (let item in Object.keys(res.upsertedIds)) {
        newIds.push(res.upsertedIds[item])
    }

    let nres = await calendar.updateOne(
        {month : month, year: year},
        {$addToSet : {meetings: {$each: newIds}}},
        {upsert:true}
    )

    console.log("nres", nres)
}

//  TODO" Potential edge case here for new month / year but not worrying about that for now (future me will regret)

export const updateMeetings = async (
    meetings: [any],
    calItem: mongoose.Model<ICalItem>,
    calendar: mongoose.Model<IMeetCal>
    ) => {

    if (!meetings.length)
        return 0;

    const date = new Date(meetings[0].date)
    const formatter = new Intl.NumberFormat('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    const formated_month = formatter.format(date.getMonth());


    const url:string = "https://www.fostercity.org/calendar/month/" + date.getFullYear().toString() + "-" + formated_month
    const bulkData = []

    console.log("url would be", url);


    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    for (const meeting of meetings) {
        try {
            let needsUpdate = false;
            const update:ICalItem = {...meeting};
            const date_string = new Date(meeting.date).
            toLocaleString(
                "en-CA",
                {
                    year:"2-digit",
                    month:"2-digit",
                    day:"2-digit"
                })

            let selector = ".calendar" + date_string + "-0";
            const result = await page.$(selector);
            if (result) {
                selector = ".item";
                const items = await page.$$(selector)

                for (const item of items) {
                    const Etype = await item.$(".stripe")

                    if (Etype)
                    {
                        let type = await Etype.evaluate(e =>e.getAttribute("title"));

                        if (type?.toLowerCase().includes(meeting.category)) {
                            if (!meeting.cancelled && type.toLocaleLowerCase().includes("cancelled")) {
                                needsUpdate = true;
                                update.cancelled = true;
                            }

                            const info = await item.$eval('a', a => {return {ref:a.getAttribute('href'), text:a.textContent}})
                            if (meeting.url != info.ref) {
                                needsUpdate = true;
                                update.url = info.ref as string
                            }
                            if (meeting.title != info.text) {
                                needsUpdate = true;
                                update.title = info.text as string
                            }
                            if (needsUpdate)
                            {
                                bulkData.push({
                                "updateOne": {
                                    "filter": {
                                        "uid": update.uid
                                    },
                                    "update": update,
                                    "upsert": true
                                    }
                                })
                            }
                        }
                        break ;
                    }
                }
            }
        }
        catch(err) {
            console.log('Error updating meetting', meeting)
        }

        if (bulkData.length) {
            let res = await calItem.bulkWrite(bulkData);
            console.log('updated the following ', res)
        }
    }


}
