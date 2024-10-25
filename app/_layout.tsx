import { Stack } from "expo-router";
import Index from ".";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import store from "./store/store";
import { ThemeProvider } from "react-native-magnus";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <ThemeProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
          </Stack>
        </ThemeProvider>
      </PaperProvider>
    </Provider>
  );
}
