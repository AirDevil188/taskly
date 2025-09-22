import { StyleSheet, Text, View, TextInput } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { useRouter } from "expo-router";
import { useState } from "react";

const initialList = [
  { id: 1, name: "Coffee" },
  { id: 2, name: "Tea" },
  { id: 3, name: "Milk" },
];

export default function App() {
  const [value, setValue] = useState("");
  const [shoppingList, setShoppingList] = useState(initialList);

  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        { id: new Date().toISOString(), name: value },
        ...shoppingList,
      ];
      setShoppingList(newShoppingList);
      setValue("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="E.g. Coffee"
        value={value}
        onChangeText={setValue}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />
      {shoppingList.map((todo) => (
        <ShoppingListItem text={todo.name} key={todo.id} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingTop: 12,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
  },
});
