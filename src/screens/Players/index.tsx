import { useState } from "react";

import { FlatList } from "react-native";

import { useTheme } from "styled-components/native";

import { Header } from "@components/Header";
import { Heading } from "@components/Heading";
import { IconButton } from "@components/IconButton";
import { Input } from "@components/Input";

import { Container, FilterListWrapper, Form, NumberOfPlayers } from "./styles";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { EmptyList } from "@components/EmptyList";
import { Button } from "@components/Button";

export function Players() {
  const [selectedTeam, setSelectedTeam] = useState("Time A");
  const [players, setPlayers] = useState(["Fulano", "Carl"]);

  const { COLORS } = useTheme();

  return (
    <Container>
      <Header showBackButton />

      <Heading
        title="Nome da turma"
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <IconButton icon="add" color={COLORS.GREEN_700} />
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
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onPlayerRemoval={() => {}} />
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
      <Button title="Remover turma" variant="secondary" />
    </Container>
  );
}
