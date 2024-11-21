import NavBar from "@/components/NavBar";
import { UserProvider } from "@/hooks/useUser";
import { Stack } from "expo-router";
import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications"
export const unstable_settings = {initalRouteName: 'home'}


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  }),
});


export default function RootLayout() {
    const responseListener = useRef<any>()
    useEffect (() => {
        responseListener.current = Notifications.addNotificationResponseReceivedListener(res => {
            console.log("res from notfis", res)
        })
        return () => {
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [])
  return (
    <UserProvider>
        <Stack initialRouteName="home">
        <Stack.Screen name="(tabs)" options={{
            headerShown: false,
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            }}/>
        </Stack>
    </UserProvider>
  );
}
