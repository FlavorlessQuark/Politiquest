import axios from "axios";
import * as Notifications from "expo-notifications"

export const registerForPushNotifications = async (id: string) => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    let token = null;

    console.log("regoister for notuif")
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        token = undefined
    }
    else
        token = (await Notifications.getExpoPushTokenAsync()).data;

    axios.post("/saveNotifToken", {id, token}).then((res) => console.log("Saved notif token"))
    console.log(token);

    return token;
}

export const get_month_week = (date: string)  => {
    const _date = new Date(date);
    const week = Math.min(4, Math.max(1, Math.ceil(_date.getDate() / 7))) - 1
    const month =  parseInt(_date.toLocaleString('default', {month: "numeric"}));

    return {month, week}
}
