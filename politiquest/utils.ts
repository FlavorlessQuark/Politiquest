import { ICalItem } from "./constants/interfaces";

export const get_month_week = (date: string)  => {
    const _date = new Date(date);
    const week = Math.min(4, Math.max(1, Math.ceil(_date.getDate() / 7))) - 1
    const month =  parseInt(_date.toLocaleString('default', {month: "numeric"}));

    return {month, week}
}
