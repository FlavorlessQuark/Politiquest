import { FontAwesome } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { Image } from "react-native"

import * as Notifications from "expo-notifications"

import Calendar from "../../assets/tabIcons/Calendar.png"
import Quest from "../../assets/tabIcons/Quest.png"
import Achievement from "../../assets/tabIcons/Achievement.png"
import Leaderboard from "../../assets/tabIcons/Leaderboard.png"
import Settings from "../../assets/tabIcons/Settings.png"
import { Text, View } from "react-native";
import { useEffect } from "react"
import { registerForPushNotifications } from "@/utils"
import { useUserConsumer } from "@/hooks/useUser"

const TabLayout = () => {
    const {user} = useUserConsumer();

    useEffect(() => {
        if (user.notify == false)
            registerForPushNotifications(user.id).then((res) => {})
        else
            console.log("aready registered for notif");
    })

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false
            }),
        });

    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', tabBarStyle: {backgroundColor:'#656565', borderTopColor: '#797979'}}}
            sceneContainerStyle={{backgroundColor: "#948181"}}
        >
            <Tabs.Screen
                name="home"
                options={{
                title: 'Home',
                tabBarActiveTintColor: '#C1F2F2',
                tabBarInactiveTintColor: 'white',
                header: () => <></>,
                tabBarIcon: () => <Image style={{ width: 26, height: 29 }} source={Calendar}/>,
                }}
            />
            <Tabs.Screen
                name="quest"
                options={{
                title: 'Quests',
                tabBarActiveTintColor: '#C1F2F2',
                tabBarInactiveTintColor: 'white',
                tabBarIcon: () => <Image style={{ width: 26, height: 26 }} source={Quest}/>,
                }}
            />
            <Tabs.Screen
                name="achievements"
                options={{
                title: 'Achievements',
                tabBarActiveTintColor: '#C1F2F2',
                tabBarInactiveTintColor: 'white',

                tabBarIcon: () => <Image style={{ width: 26, height: 26 }} source={Achievement}/>,
                }}
            />
            <Tabs.Screen
                name="leaderboard"
                options={{
                title: 'Leaderboard',
                tabBarActiveTintColor: '#C1F2F2',
                tabBarInactiveTintColor: 'white',
                tabBarIcon: () => <Image style={{ width: 26, height: 26 }} source={Leaderboard}/>,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                title: 'Settings',
                tabBarActiveTintColor: '#C1F2F2',
                tabBarInactiveTintColor: 'white',
                tabBarIcon: () => <Image style={{ width: 26, height: 28 }} source={Settings}/>,
                }}
            />
        </Tabs>
    )
}

export default TabLayout
