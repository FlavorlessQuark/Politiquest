import axios from "axios";
import * as Notifications from "expo-notifications"

const NOTIF_STATUS_UNDEF = 0;
const NOTIF_STATUS_YES = 1;
const NOTIF_STATUS_NO = 2;



export const registerForPushNotifications = async (id: string) => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    let token = null;
    let notif_stat = NOTIF_STATUS_UNDEF;

    console.log("regoister for notuif",  existingStatus)
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        token = undefined
        notif_stat = NOTIF_STATUS_NO
    }
    else {
        token = (await Notifications.getExpoPushTokenAsync()).data;
        notif_stat = NOTIF_STATUS_YES;
    }

    console.log("Should save", id, token, notif_stat)
    axios.defaults.baseURL = "http://192.168.1.13:5000"
    try {
        await axios.post("/user/saveNotifToken", {id, token, status: notif_stat}).then((res) => console.log("Saved notif token"));
    }catch(err) {
        console.log("Error updating notif status", err);
    }
    console.log(token);

    return 0;
}

export const get_month_week = (date: string)  => {
    const _date = new Date(date);
    const week = Math.min(4, Math.max(1, Math.ceil(_date.getDate() / 7))) - 1
    const month =  parseInt(_date.toLocaleString('default', {month: "numeric"}));

    return {month, week}
}
