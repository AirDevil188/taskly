import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import { theme } from "../theme";
export function ShoppingListItem(props) {
  console.log(props.isCompleted);
  const handleDelete = () => {
    Alert.alert(
      "Are you sure you want to delete this?",
      "It will be gone for good",
      [
        {
          text: "Yes",
          onPress: () => console.log("Ok deleting"),
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };
  return (
    <View
      style={[
        styles.itemContainer,
        props.isCompleted ? styles.completedContainer : undefined,
      ]}
    >
      <Text
        style={[
          styles.itemText,
          props.isCompleted ? styles.completedText : null,
        ]}
      >
        {props.text}
      </Text>
      <TouchableOpacity
        onPress={props.handleDelete}
        style={[
          styles.button,
          props.isCompleted ? styles.buttonComplete : null,
        ]}
      >
        <Text style={[styles.buttonText]}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colorCerulean,
    paddingVertical: 16,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "200",
  },
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
  buttonComplete: {
    backgroundColor: theme.colorGrey,
  },
  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
  },
});
