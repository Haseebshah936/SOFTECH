import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { getFirestore, updateDoc, doc, getDoc } from "firebase/firestore";
import { Foundation, FontAwesome5 } from "@expo/vector-icons";

import timeToAmPm from "../utilities/timeToAmPm";
import { useUser } from "../hooks/useUser";
import font from "../config/font";
import UserInfoModal from "./UserInfoModal";

export default function ReminderItem({ item }) {
  let { title, priority, time, id, status, username, carerId, uid } = item;
  const { user, isUser } = useUser();
  const [showModal, setShowModal] = useState(false);

  const db = getFirestore();
  time = new Date(time.seconds * 1000);

  const inMinutes = Math.round(
    (((time - new Date()) % 86400000) % 3600000) / 60000
  );

  useEffect(() => {
    if (inMinutes > 0 && isUser) {
      setTimeout(() => {
        if (status == "active") {
          Alert.alert("Reminder", title, [
            {
              text: "Ignore",
              onPress: handleIgnore,
              style: "destructive",
            },
            {
              text: "Done",
              onPress: handleDone,
            },
          ]);
        }
      }, inMinutes * 60 * 1000);
    }
  }, []);

  const handleDone = () => {
    updateDoc(doc(db, "reminders", id), {
      status: "done",
    });
  };
  const handleIgnore = async () => {
    const reminderDoc = doc(db, "reminders", id);

    // update reminder's status to ignore.
    await updateDoc(reminderDoc, {
      status: "ignore",
    });

    // send alert to carer on ignoring 1 high or 2 low priority reminders
    if (priority == "low") {
      if (user.countLowIgnored == 0) {
        await updateDoc(doc(db, "users", user.uid), {
          countLowIgnored: 1,
        });
      } else {
        // 2 low priority missed, send alert NOW
        await updateDoc(doc(db, "carers", carerId), {
          alertUser: {
            username: username,
            title: "2 low",
          },
        });

        await updateDoc(doc(db, "users", user.uid), {
          countLowIgnored: 0,
        });
      }
    } else {
      // high priority missed, send alert NOW
      await updateDoc(doc(db, "carers", carerId), {
        alertUser: {
          username: username,
          title: "1 high",
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <UserInfoModal
        userID={uid}
        isvisible={showModal}
        onDismiss={() => setShowModal(false)}
      />

      {!isUser && (
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <FontAwesome5 name="user-alt" size={20} color="green" />
          <Text
            style={{
              color: "green",
              fontSize: font.big,
              fontWeight: "bold",
              marginLeft: 5,
            }}
          >
            {username || "unknown"}
          </Text>
        </TouchableOpacity>
      )}

      <Text
        style={{ fontSize: font.big, fontWeight: "bold", alignSelf: "center" }}
      >
        {title}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginTop: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: font.medium }}>
            {"Time: "}
          </Text>
          <Text style={{ fontSize: font.extraBig }}>{timeToAmPm(time)}</Text>
        </View>

        <Text>|</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: font.medium }}>
            {"Priority: "}
          </Text>
          <Text style={{ fontSize: font.extraBig }}>{priority}</Text>
        </View>
      </View>

      {status == "done" || !isUser ? null : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginTop: 10,
          }}
        >
          <Button
            mode="contained"
            onPress={handleIgnore}
            disabled={status == "ignore"}
            theme={{ colors: { primary: "tomato" } }}
            style={[styles.button]}
          >
            <Text style={{ color: status != "ignore" ? "white" : "grey" }}>
              ignore
            </Text>
          </Button>

          <Button
            mode="contained"
            onPress={handleDone}
            style={[styles.button, { backgroundColor: "seagreen" }]}
          >
            done
          </Button>
        </View>
      )}

      {status == "ignore" && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            marginTop: 5,
          }}
        >
          <Foundation name="alert" size={24} color="tomato" />
          <Text
            style={{
              color: "tomato",
              fontWeight: "bold",
              marginLeft: 5,
            }}
          >
            Reminder awaiting completion
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgrey",
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  button: {
    borderRadius: 10,
  },
});
