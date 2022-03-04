import React, { useState } from "react";
import { Platform, Text, View } from "react-native";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

function TimePicker({ time, setTime }) {
  const [showModal, setShowModal] = useState(Platform.OS == "ios");

  const onChange = (event, selectedTime) => {
    setShowModal(Platform.OS == "ios");
    setTime(selectedTime || time);
  };

  return (
    <View>
      {Platform.OS == "android" && (
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}
        >
          <Button
            icon="clock-time-eight-outline"
            mode="contained"
            onPress={() => setShowModal(true)}
          >
            Pick time
          </Button>

          {time && (
            <Text
              style={{
                backgroundColor: "lightgrey",
                paddingVertical: 7,
                paddingHorizontal: 10,
                borderRadius: 5,
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              {timeToAmPm(time)}
            </Text>
          )}
        </View>
      )}

      {showModal && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time || new Date()}
          mode={"time"}
          display="default"
          onChange={onChange}
          style={{ marginTop: 15 }}
        />
      )}
    </View>
  );
}

export default TimePicker;

const timeToAmPm = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;

  return strTime;
};
