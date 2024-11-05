import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import store from "./store/store";
import { LogBox } from 'react-native';

export default function RootLayout() {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <PaperProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
          </Stack>
      </PaperProvider>
    </Provider>
  );
}

