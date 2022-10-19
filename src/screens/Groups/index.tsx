import { useState, useCallback } from "react";

import { FlatList } from "react-native";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Button } from "@components/Button";
import { EmptyList } from "@components/EmptyList";
import { Header } from "@components/Header";
import { Heading } from "@components/Heading";
import { GroupCard } from "@components/GroupCard";
import { getGroupsFromStorage } from "@utils/storage";
import { Container } from "./styles";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  async function fetchGroups() {
    try {
      const data = await getGroupsFromStorage();
      setGroups(data);
    } catch (error) {
      throw error;
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Heading title="Turmas" subtitle="jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            onPress={() => navigation.navigate("Players", { group: item })}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <EmptyList message="Que tal cadastrar a primeira turma?" />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Button
        title="Criar nova turma"
        onPress={() => navigation.navigate("CreateGroup")}
      />
    </Container>
  );
}
