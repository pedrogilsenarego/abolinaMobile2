import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
//import Snackbar from "./src/components/SnackBar";
import { publishableKeyTest } from "./src/constants/stripe";
import Screens from "./src/screens";
import { persistor, store } from "./src/slicer/createStore";

const theme = {
  ...DefaultTheme,
  color: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function App() {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  const queryClient = new QueryClient();

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <StripeProvider publishableKey={publishableKeyTest}>
        <PersistGate persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer theme={theme}>
              {/* <Snackbar />*/}
              <Screens />
            </NavigationContainer>
          </QueryClientProvider>
        </PersistGate>
      </StripeProvider>
    </Provider>
  );
}
