import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { initializeApp } from "firebase/app";
import { MenuProvider } from "react-native-popup-menu";

import HomeStack from "./src/navigations/HomeStack";
import NavigationTheme from "./src/navigations/NavigationTheme";
import colors from "./src/config/colors";
import { getFirestore } from "firebase/firestore";

// firebase configs
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBtaOcFrQvT1HFNKqV1W8q9R58BQA_sXZQ",
  authDomain: "softech-nu.firebaseapp.com",
  projectId: "softech-nu",
  storageBucket: "softech-nu.appspot.com",
  messagingSenderId: "597728485559",
  appId: "1:597728485559:web:2d750f960d82641fa26d32",
});

export const db = getFirestore(firebaseApp);

export default function App() {
  // logs to ignore
  LogBox.ignoreLogs([
    'Each child in a list should have a unique "key" prop',
    "Setting a timer for a long period of time",
    "AsyncStorage has been extracted",
    "Can't perform a React state update",
    "Animated: `useNativeDriver` was not specified.",
    "componentWillReceiveProps has been renamed",
    "componentWillMount has been renamed",
    "VirtualizedLists should never be nested inside",
    "is not a system font",
  ]);

  return (
    // theme of react-native-paper
    <PaperProvider
      theme={{
        ...DefaultTheme,
        roundness: 15,
        colors: {
          ...DefaultTheme.colors,
          primary: colors.primary,
          background: colors.white,
          text: colors.black,
        },
      }}
    >
      {/* if user is not logged then take them to login/register screens
          else take them to home screen */}
      <MenuProvider>
        <NavigationContainer theme={NavigationTheme}>
          <HomeStack />
        </NavigationContainer>
      </MenuProvider>
    </PaperProvider>
  );
}
