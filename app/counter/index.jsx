import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { intervalToDuration, isBefore } from "date-fns";
import { TimeSegment } from "../../components/TimeSegment";

// 10 seconds from now
const timestamp = Date.now() + 10 * 1000;

export default function CounterScreen() {
  const [status, setStatus] = useState({
    isOverdue: false,
    distance: {},
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const isOverdue = isBefore(timestamp, Date.now());
      const distance = intervalToDuration(
        isOverdue
          ? { start: timestamp, end: Date.now() }
          : {
              start: Date.now(),
              end: timestamp,
            }
      );
      setStatus({ isOverdue, distance });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // const scheduleNotification = async () => {
  //   const result = await registerForPushNotificationsAsync();
  //   if (result === "granted") {
  //     await Notifications.scheduleNotificationAsync({
  //       content: {
  //         title: "I'm a notification from your app",
  //       },
  //       trigger: {
  //         seconds: 5,
  //       },
  //     });
  //     console.log("granted");
  //   } else {
  //     if (Device.isDevice) {
  //       Alert.alert(
  //         "Unable to schedule notification",
  //         "Enable the notification permission for Expo. Go in settings"
  //       );
  //     }
  //   }
  // };
  return (
    <View
      style={[
        styles.container,
        status.isOverdue ? styles.containerLate : undefined,
      ]}
    >
      {status.isOverdue ? (
        <Text style={[styles.heading, styles.whiteText]}>
          {" "}
          Thing overdue by
        </Text>
      ) : (
        <Text>Thing due in...</Text>
      )}
      <View style={styles.row}>
        <TimeSegment
          unit={"Days"}
          number={status.distance.days ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit={"Hours"}
          number={status.distance.hours ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit={"Minutes"}
          number={status.distance.minutes ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit={"Seconds"}
          number={status.distance.seconds ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        // onPress={scheduleNotification}
      >
        <Text style={styles.buttonText}>I've done the thing!</Text>
      </TouchableOpacity>
      <Text style={styles.text}> </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  containerLate: { backgroundColor: theme.colorRed },
  text: {
    fontSize: 24,
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 24,
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  row: {
    flexDirection: "row",
  },
  heading: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 24,
  },
  whiteText: {
    color: theme.colorWhite,
  },
});
