import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../theme";

export function Button(props) {
  return (
    <TouchableOpacity onPress={props.handleDelete} style={styles.button}>
      <Text style={styles.buttonText}>Delete</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colorBlack,
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colorWhite,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
