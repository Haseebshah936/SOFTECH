import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import React from "react";
import { Button } from "react-native-paper";

import colors from "../config/colors";

const backgroundImage = require("../assets/splash.png");

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={backgroundImage}
      >
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Home")}
          theme={{ colors: { primary: "#413c78" } }}
          style={styles.button}
        >
          Get Started
        </Button>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  button: {
    width: "85%",
    position: "absolute",
    alignSelf: "center",
    bottom: Dimensions.get("screen").height * 0.2,
  },
});
