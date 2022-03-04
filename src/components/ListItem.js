import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

const imagesize = 55;
const dotsize = 10;

function ListItem({
  title,
  numOfBoards,
  isBooked,
  numOfTables,
  image,
  onPress,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <View>
        {image && <Image style={styles.image} source={{ uri: image }} />}

        <View
          style={{
            width: dotsize,
            height: dotsize,
            borderRadius: dotsize / 2,
            backgroundColor: isBooked ? "tomato" : "lightgreen",
            alignSelf: "flex-end",
            bottom: 2,
            position: "absolute",
          }}
        />
      </View>

      <View style={styles.containerText}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        <Text style={styles.description}>{`Whiteboard ${numOfBoards}`}</Text>
        <Text style={styles.description}>{`Tische ${numOfTables}`}</Text>
      </View>

      {isBooked ? (
        <View style={styles.button}>
          <Text style={{ color: "darkgrey" }}>buchen</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={{ color: "black" }}>buchen</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "lightgrey",
    height: 35,
    justifyContent: "center",
  },
  containerText: {
    marginLeft: 14,
    flex: 1,
  },
  image: {
    borderRadius: imagesize / 2,
    height: imagesize,
    width: imagesize,
  },
  title: {
    fontSize: 14,
    marginBottom: 3,
  },
  description: {
    color: "#918C8C",
    fontSize: 13,
  },
});

export default ListItem;
