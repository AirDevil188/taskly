import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { theme } from "./theme";
import { ShoppingListItem } from "./components/ShoppingListItem";

export default function App() {
  return (
    <View style={styles.container}>
      <ShoppingListItem text={"Coffee"} />
      <ShoppingListItem text={"Tea"} />
      <ShoppingListItem text={"Sugar"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: theme.colorWhite,
    justifyContent: "center",
  },
});
