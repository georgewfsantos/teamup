import { useState } from "react";

import { Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Heading } from "@components/Heading";
import { Input } from "@components/Input";
import { AppError } from "@utils/AppError";
import { GROUPS } from "@utils/storageKeys";
import { getGroupsFromStorage } from "@utils/storage";

import { Container, Content, UsersIcon } from "./styles";

export function CreateGroup() {
  const [group, setGroup] = useState("");

  const navigation = useNavigation();

  async function handleGroupCreation() {
    try {
      if (!group.trim().length) {
        throw new AppError("Você precisa digitar o nome da turma.");
      }

      const storedGroups = await getGroupsFromStorage();

      const groupNameIsTaken = storedGroups.includes(group);

      if (groupNameIsTaken) {
        throw new AppError("Já existe uma turma cadastrado com este nome.");
      }

      await AsyncStorage.setItem(
        GROUPS,
        JSON.stringify([...storedGroups, group])
      );
      navigation.navigate("Players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Criação de Turma", error.message);
      } else {
        Alert.alert("Criação de Turma", "Não foi possível criar a turma");
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <UsersIcon />

        <Heading
          title="Nova turma"
          subtitle="crie a turma apara adicionar as pessoas"
        />

        <Input
          placeholder="Nome da Turma"
          style={{ marginBottom: 20 }}
          onChangeText={setGroup}
        />

        <Button title="Criar" onPress={handleGroupCreation} />
      </Content>
    </Container>
  );
}
