import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Card } from "react-native-paper";

export default function FoodItem({ image, title, description }) {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: image }} />

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
    marginTop: 12,
    textTransform: "capitalize",
  },
  description: {
    fontSize: 16,
    marginTop: 5,
    marginLeft: 12,
    marginBottom: 12,
  },
});
