import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { Button, TextInput, Checkbox } from "react-native-paper";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";

import colors from "../config/colors";
import { db } from "../../App";

function HomeScreen({ navigation }) {
  const [selectedCity, setSelectedCity] = useState("Lahore");
  const [isPrivate, setIsPrivate] = useState(false);
  const [degree, setDegree] = useState();
  const [budget, setBudget] = useState();
  const [isCoeducation, setIsCoeducation] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    {
      HEC_recognised: true,
      budget: 85000,
      city: "lahore",
      coeducation: true,
      degree: ["CS", "CE", "SE"],
      isPrivate: true,
      name: "COMSATS",
      imageURL:
        "https://i0.wp.com/contactlist.pk/wp-content/uploads/2021/10/comsats-university-lahore.jpg",
    },
    {
      HEC_recognised: true,
      budget: 120000,
      city: "Islamabad",
      coeducation: true,
      degree: ["CS", "SE"],
      isPrivate: true,
      name: "FAST-NU",
      imageURL:
        "https://studyinpakistan.pk/wp-content/uploads/2019/09/58173_451356738273726_1362290649_n-1-860x514.jpg",
    },
  ]);
  const cities = ["Lahore", "Sargodha", "Islamabad", "Karachi"];

  const handleSubmit = () => {
    // TODO -- firebase query, and set result array in setData()

    const q = query(
      collection(db, "universities"),
      where("budget", "<=", parseInt(budget)),
      where("city", "==", selectedCity.toLowerCase()),
      where("degree", "array-contains", degree)
    );

    getDocs(q)
      .then((querySnapshot) => {
        setLoading(true);
        let a = [];
        let b = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          if (
            doc.data().coeducation === isCoeducation &&
            doc.data().isPrivate === isPrivate &&
            doc.data().HEC_recognised === true
          ) {
            a.push({ id: doc.id, ...doc.data() });
          }
          if (
            doc.data().coeducation === isCoeducation &&
            doc.data().isPrivate === isPrivate
          ) {
            b.push({ id: doc.id, ...doc.data() });
          }
        });
        return { a, b };
      })
      .then((data) => {
        console.log("data is ", data);
        navigation.navigate("Universities", {
          list: data,
        });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Degree"
        value={degree}
        autoFocus
        onChangeText={(text) => setDegree(text)}
        placeholder="Enter preferred degree"
        style={styles.textInput}
      />

      <TextInput
        mode="outlined"
        label="Budget"
        value={budget}
        onChangeText={(text) => setBudget(text)}
        placeholder="Enter your maximum budget"
        style={styles.textInput}
      />

      <Menu style={styles.citiesSelector}>
        <MenuTrigger text={"Select action: "}></MenuTrigger>
        <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 7 }}>
          {selectedCity}
        </Text>

        <MenuOptions>
          <FlatList
            data={cities}
            keyExtractor={(item) => JSON.stringify(item)}
            renderItem={({ item }) => (
              <MenuOption onSelect={() => setSelectedCity(item)}>
                <Text>{item}</Text>
              </MenuOption>
            )}
          />
        </MenuOptions>
      </Menu>

      <View style={styles.row}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={!isPrivate ? "checked" : "unchecked"}
            onPress={() => setIsPrivate(false)}
            color={colors.primary}
          />
          <Text>Government</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={isPrivate ? "checked" : "unchecked"}
            onPress={() => setIsPrivate(true)}
            color={colors.primary}
          />
          <Text>Private</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={isCoeducation ? "checked" : "unchecked"}
            onPress={() => setIsCoeducation(true)}
            color={colors.primary}
          />
          <Text>Co-education</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={!isCoeducation ? "checked" : "unchecked"}
            onPress={() => setIsCoeducation(false)}
            color={colors.primary}
          />
          <Text>Seperate-education</Text>
        </View>
      </View>

      <Button
        mode="contained"
        loading={loading}
        onPress={handleSubmit}
        style={styles.button}
      >
        <Text style={{ color: colors.white }}>Search</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  button: {
    width: "85%",
    alignSelf: "center",
    marginTop: 30,
  },
  textInput: {
    marginTop: 10,
  },
  citiesSelector: {
    marginTop: 15,
    padding: 10,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default HomeScreen;
