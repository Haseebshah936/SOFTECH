import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import colors from "../config/colors";
import UniversitiesScreen from "../screens/UniversitiesScreen";

const HomeStackNav = createNativeStackNavigator();

// home stack will include home screen, muscle selection and exercises screens.
const HomeStack = () => {
  return (
    <HomeStackNav.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleAlign: "center",
      }}
    >
      <HomeStackNav.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerStyle: { backgroundColor: "#413c78" } }}
      />
      <HomeStackNav.Screen name="Home" component={HomeScreen} />
      <HomeStackNav.Screen name="Universities" component={UniversitiesScreen} />
    </HomeStackNav.Navigator>
  );
};

export default HomeStack;
