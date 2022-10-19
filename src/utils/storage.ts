import AsyncStorage from "@react-native-async-storage/async-storage";

import { Player } from "@screens/Players";
import { GROUPS, PLAYERS } from "./storageKeys";

async function getGroupsFromStorage() {
  try {
    const data = await AsyncStorage.getItem(GROUPS);

    const groups: string[] = data ? JSON.parse(data) : [];

    return groups;
  } catch (error) {
    throw error;
  }
}

async function getPlayersByGroup(group: string) {
  try {
    const data = await AsyncStorage.getItem(`${PLAYERS}-${group}`);

    const players: Player[] = data ? JSON.parse(data) : [];

    return players;
  } catch (error) {
    throw error;
  }
}

export { getGroupsFromStorage, getPlayersByGroup };
