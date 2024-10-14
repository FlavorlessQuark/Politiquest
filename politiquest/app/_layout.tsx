import NavBar from "@/components/NavBar";
import { UserProvider } from "@/hooks/useUser";
import { Stack } from "expo-router";

export const unstable_settings = {initalRouteName: 'home'}

export default function RootLayout() {
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
