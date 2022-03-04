import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { AntDesign } from "@expo/vector-icons";

import UnivercityItem from "../components/UnivercityItem";
import colors from "../config/colors";

export default function UniversitiesScreen({ route }) {
  const { list } = route.params;
  const [selectedFilter, setSelectedFilter] = useState("");
  const [index, setIndex] = useState(false);
  const handleFilter = (type) => {
    if (selectedFilter === type) {
      setSelectedFilter("");
    } else {
      setSelectedFilter(type);
    }
    if (type === "HEC Recognised") {
      setIndex(!index);
    }
    // use if struture on "type" param to perferm filtering.
  };

  return (
    <View style={styles.container}>
      <Menu>
        <MenuTrigger customStyles={{ triggerWrapper: styles.triggerWrapper }}>
          <AntDesign name="filter" size={24} color={colors.primary} />
          <Text style={{ color: colors.primary }}>{"Filter By: "}</Text>
          <Text style={styles.selectedFilter}>{selectedFilter}</Text>
        </MenuTrigger>

        <MenuOptions>
          <MenuOption
            onSelect={() => handleFilter("HEC Recognised")}
            text="HEC Recognised"
          />
          <MenuOption
            onSelect={() => handleFilter("Fee")}
            text="Sort by: Fee"
          />
        </MenuOptions>
      </Menu>

      <FlatList
        data={index ? list.a : list.b}
        keyExtractor={(item) => JSON.stringify(item)}
        renderItem={({ item }) => <UnivercityItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  triggerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 5,
  },
  selectedFilter: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primary,
  },
});
