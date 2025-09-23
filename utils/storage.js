import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getFromStorage(key) {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    return null;
  }
}

export async function saveToStorage(key, data) {
  try {
    console.log(data, key);
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    return null;
  }
}
