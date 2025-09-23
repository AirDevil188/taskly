import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../theme";

export default function IdeaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Counter</Text>
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
  text: {
    fontSize: 24,
  },
});
