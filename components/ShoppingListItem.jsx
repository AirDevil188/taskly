import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { theme } from "../theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

export function ShoppingListItem(props) {
  const onDelete = () => {
    Alert.alert(
      "Are you sure you want to delete this?",
      "It will be gone for good",
      [
        {
          text: "Yes",
          onPress: () => props.handleDelete(),
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
    <Pressable
      style={[
        styles.itemContainer,
        props.isCompleted ? styles.completedContainer : undefined,
      ]}
      onPress={props.handleToggleComplete}
    >
      <View style={styles.row}>
        <Feather
          name={props.isCompleted ? "check" : "circle"}
          size={24}
          color={props.isCompleted ? theme.colorGrey : theme.colorCerulean}
        />
        <Text
          style={[
            styles.itemText,
            props.isCompleted ? styles.completedText : null,
          ]}
        >
          {props.text}
        </Text>
      </View>

      <TouchableOpacity onPress={props.handleDelete}>
        <Ionicons
          name="close-circle"
          size={24}
          color={props.isCompleted ? theme.colorGrey : theme.colorRed}
          onPress={onDelete}
        />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colorCerulean,
    paddingVertical: 16,
    paddingHorizontal: 18,
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
    flex: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    flex: 1,
  },
});
