import { useState, useEffect, useRef } from "react";

import { Alert, FlatList, Keyboard, TextInput } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components/native";

import { Button } from "@components/Button";
import { EmptyList } from "@components/EmptyList";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Heading } from "@components/Heading";
import { IconButton } from "@components/IconButton";
import { Input } from "@components/Input";
import { PlayerCard } from "@components/PlayerCard";
import { AppError } from "@utils/AppError";
import { GROUPS, PLAYERS } from "@utils/storageKeys";
import { getGroupsFromStorage, getPlayersByGroup } from "@utils/storage";

import { Container, FilterListWrapper, Form, NumberOfPlayers } from "./styles";

type RouteParams = {
  group: string;
};

export type Player = {
  name: string;
  team: string;
};

export function Players() {
  const [selectedTeam, setSelectedTeam] = useState("Time A");
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  const newPlayerNameInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const route = useRoute();

  const { group } = route.params as RouteParams;

  const { COLORS } = useTheme();

  const newPlayer = {
    name: newPlayerName,
    team: selectedTeam,
  };

  async function handlePlayerCreation(player: Player, group: string) {
    try {
      if (!newPlayerName.trim().length) {
        throw new AppError("Você precisa digitar o nome do jogador.");
      }

      const storedPlayers = await getPlayersByGroup(group);

      const playerNameIsTaken =
        storedPlayers.filter(
          (storedPlayer) => storedPlayer.name === player.name
        ).length > 0;

      if (playerNameIsTaken) {
        throw new AppError(
          "Já existe uma pessoa com este nome em um dos times."
        );
      }

      await AsyncStorage.setItem(
        `${PLAYERS}-${group}`,
        JSON.stringify([...storedPlayers, newPlayer])
      );

      setNewPlayerName("");
      newPlayerNameInputRef.current?.blur();

      fetchPlayersFromSelectedTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Cadastro de Jogador", error.message);
      } else {
        Alert.alert(
          "Cadastro de Jogador",
          "Não foi possível cadastrar o jogador."
        );
      }
    }
  }

  async function removeGroupFromStorage(group: string) {
    try {
      const storedGroups = await getGroupsFromStorage();
      const filteredGroups = storedGroups.filter(
        (filteredGroup) => filteredGroup !== group
      );

      await AsyncStorage.setItem(GROUPS, JSON.stringify(filteredGroups));

      await AsyncStorage.removeItem(`${PLAYERS}-${group}`);

      navigation.navigate("Groups");
    } catch (error) {
      throw error;
    }
  }

  async function handleGroupRemoval() {
    Alert.alert(
      "Remoção de Turmas",
      "Tem certeza que deseja remover esta turma?",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          onPress: () => removeGroupFromStorage(group),
        },
      ]
    );
  }

  async function handlePlayerRemoval(playerName: string, group: string) {
    try {
      const storedPlayers = await getPlayersByGroup(group);

      const filteredPlayers = storedPlayers.filter(
        (player) => player.name !== playerName
      );

      await AsyncStorage.setItem(
        `${PLAYERS}-${group}`,
        JSON.stringify(filteredPlayers)
      );

      fetchPlayersFromSelectedTeam();
    } catch (error) {
      throw error;
    }
  }

  async function getPlayersByGroupAndTeam(group: string, team: string) {
    try {
      const players = await getPlayersByGroup(group);

      const playersFromSelectedTeam = players.filter(
        (player) => player.team === team
      );

      return playersFromSelectedTeam;
    } catch (error) {
      throw error;
    }
  }

  async function fetchPlayersFromSelectedTeam() {
    try {
      const playersFromSelectedTeam = await getPlayersByGroupAndTeam(
        group,
        selectedTeam
      );

      setPlayers(playersFromSelectedTeam);
    } catch (error) {
      Alert.alert(
        "Listagem de Jogadores",
        "Não foi possível listar os jogadores do time selecionado."
      );
    }
  }

  useEffect(() => {
    fetchPlayersFromSelectedTeam();
  }, [selectedTeam]);

  return (
    <Container>
      <Header showBackButton />

      <Heading title={group} subtitle="adicione a galera e separe os times" />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onBlur={() => Keyboard.dismiss()}
          onSubmitEditing={() => handlePlayerCreation(newPlayer, group)}
        />
        <IconButton
          icon="add"
          color={COLORS.GREEN_700}
          onPress={() => handlePlayerCreation(newPlayer, group)}
        />
      </Form>

      <FilterListWrapper>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === selectedTeam}
              onPress={() => setSelectedTeam(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </FilterListWrapper>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onPlayerRemoval={() => handlePlayerRemoval(item.name, group)}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyList message="Não há jogadores nesse time." />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          !players.length && { flex: 1 },
        ]}
      />
      <Button
        title="Remover turma"
        variant="secondary"
        onPress={handleGroupRemoval}
      />
    </Container>
  );
}
