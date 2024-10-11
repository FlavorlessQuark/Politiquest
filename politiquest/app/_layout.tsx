import NavBar from "@/components/NavBar";
import { Stack } from "expo-router";

export const unstable_settings = {initalRouteName: 'home'}

export default function RootLayout() {
  return (
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
  );
}
