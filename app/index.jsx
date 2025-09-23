import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  View,
  LayoutAnimation,
} from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";

const initialList = [];
const storageKey = "shopping-list";

export default function App() {
  const [value, setValue] = useState("");
  const [shoppingList, setShoppingList] = useState(initialList);

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await getFromStorage(storageKey);
      if (data) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShoppingList(data);
      }
    };
    fetchInitialData();
  }, []);

  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        {
          id: new Date().toISOString(),
          name: value,
          completed: false,
          lastUpdatedTimestamp: Date.now(),
        },
        ...shoppingList,
      ];
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShoppingList(newShoppingList);
      saveToStorage(storageKey, shoppingList);
      setValue("");
    }
  };

  const handleDelete = (id) => {
    const newShoppingList = shoppingList.filter((item) => item.id !== id);
    saveToStorage(storageKey, shoppingList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList);
  };

  const handleToggleComplete = (id) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: item.completed ? false : Date.now(),
          lastUpdatedTimestamp: Date.now(),
        };
      }
      return item;
    });
    saveToStorage(storageKey, shoppingList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList);
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty</Text>
        </View>
      }
      ListHeaderComponent={
        <TextInput
          value={value}
          style={styles.textInput}
          onChangeText={setValue}
          placeholder="E.g Coffee"
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
      }
      data={orderShoppingList(shoppingList)}
      renderItem={({ item }) => {
        return (
          <ShoppingListItem
            text={item.name}
            handleDelete={() => handleDelete(item.id)}
            handleToggleComplete={() => handleToggleComplete(item.id)}
            isCompleted={Boolean(item.completed)}
          />
        );
      }}
    />
  );
}

function orderShoppingList(shoppingList) {
  return shoppingList.sort((item1, item2) => {
    if (item1.completed && item2.completed) {
      return item2.completed - item1.completed;
    }

    if (item1.completed && !item2.completed) {
      return 1;
    }

    if (!item1.completed && item2.completed) {
      return -1;
    }

    if (!item1.completed && !item2.completed) {
      return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
    }

    return 0;
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingVertical: 12,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
    backgroundColor: theme.colorWhite,
  },
});
