import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import colors from "../config/colors";

export default function MuscleItem({ image, imageUrl, title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={image || { uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    // textTransform: "uppercase",
  },
});
