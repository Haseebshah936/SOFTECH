import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";

import colors from "../config/colors";

export default function UnivercityItem({ item }) {
  const { HEC_recognised, name, imageURL, degree, budget, city } = item;

  return (
    <View>
      <ImageBackground
        source={{ uri: imageURL }}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <Text style={styles.levelText}>{city}</Text>
          <Text style={styles.titleText}>{name}</Text>

          <View style={{ flex: 0.8 }} />

          <Text style={styles.equipAndTimeText}>
            {"Offer degrees: " + degree}
          </Text>
          <Text style={styles.equipAndTimeText}>{"Fee: " + budget}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    backgroundColor: "#000000a0",
    padding: 15,
  },
  imageBackground: {
    marginTop: 10,
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  levelText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "capitalize",
  },
  titleText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 24,
  },
  equipAndTimeText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 15,
    textTransform: "capitalize",
    marginVertical: 2,
  },
});
