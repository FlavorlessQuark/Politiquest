import { FontAwesome } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { Image } from "react-native"

import Calendar from "../../assets/tabIcons/Calendar.png"
import Quest from "../../assets/tabIcons/Quest.png"
import Achievement from "../../assets/tabIcons/Achievement.png"
import Leaderboard from "../../assets/tabIcons/Leaderboard.png"
import Settings from "../../assets/tabIcons/Settings.png"

const TabLayout = () => {

    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', tabBarStyle: {backgroundColor:'#656565', borderTopColor: '#797979'}}}>
            <Tabs.Screen
                name="home"
                options={{
                title: 'Home',
                tabBarActiveTintColor: '#C1F2F2',
                tabBarInactiveTintColor: 'white',
                tabBarIcon: () => <Image style={{ width: 30, height: 30 }} source={Calendar}/>,
                }}
            />
            <Tabs.Screen
                name="quest"
                options={{
                title: 'Quests',
                tabBarActiveTintColor: '#C1F2F2',
                tabBarInactiveTintColor: 'white',
                tabBarIcon: () => <Image style={{ width: 30, height: 30 }} source={Quest}/>,
                }}
            />
            <Tabs.Screen
                name="achievements"
                options={{
                title: 'Achievements',
                tabBarActiveTintColor: '#C1F2F2',
                tabBarInactiveTintColor: 'white',
                tabBarIcon: () => <Image style={{ width: 30, height: 30 }} source={Achievement}/>,
                }}
            />
            <Tabs.Screen
                name="leaderboard"
                options={{
                title: 'Leaderboard',
                tabBarActiveTintColor: '#C1F2F2',
                tabBarInactiveTintColor: 'white',
                tabBarIcon: () => <Image style={{ width: 30, height: 30 }} source={Leaderboard}/>,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                title: 'Settings',
                tabBarActiveTintColor: '#C1F2F2',
                tabBarInactiveTintColor: 'white',
                tabBarIcon: () => <Image style={{ width: 30, height: 30 }} source={Settings}/>,
                }}
            />
        </Tabs>
    )
}

export default TabLayout
