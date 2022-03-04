import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Modal from "react-native-modal";

import Seperator from "./Seperator";
import colors from "../config/colors";
import font from "../config/font";

export default function UserInfoModal({ userID, isvisible, onDismiss }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    getDoc(doc(db, "users", userID))
      .then((snapshot) => {
        if (snapshot.exists) {
          // console.log(snapshot.data());
          setUser(snapshot.data());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Modal
      isVisible={isvisible}
      onBackButtonPress={onDismiss}
      onBackdropPress={onDismiss}
    >
      <View
        style={{
          flex: 0.45,
          backgroundColor: colors.white,
          borderRadius: 40,
          padding: 20,
        }}
      >
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <MaterialCommunityIcons
              name="account-circle"
              size={72}
              color={colors.primary}
              style={{ alignSelf: "center" }}
            />
            <Text
              style={{
                fontSize: font.extraBig,
                fontWeight: "bold",
                // marginVertical: 5,
                marginTop: 5,
                marginBottom: 20,
                alignSelf: "center",
              }}
            >
              {user.username}
            </Text>

            <Seperator style={{ marginVertical: 5 }} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text style={{ fontSize: font.medium, fontWeight: "bold" }}>
                Age:
              </Text>
              <Text style={{ fontSize: font.big }}>{user.age}</Text>
            </View>

            <Seperator style={{ marginVertical: 5 }} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text style={{ fontSize: font.medium, fontWeight: "bold" }}>
                Phone Number:{" "}
              </Text>
              <Text style={{ fontSize: font.big }}>{user.phoneNum}</Text>
            </View>

            <Seperator style={{ marginVertical: 5 }} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text style={{ fontSize: font.medium, fontWeight: "bold" }}>
                NHS Number:{" "}
              </Text>
              <Text style={{ fontSize: font.big }}>{user.nhsNum}</Text>
            </View>

            <Seperator style={{ marginVertical: 5 }} />
          </View>
        )}
      </View>
    </Modal>
  );
}
