import { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Heading } from "@components/Heading";
import { Input } from "@components/Input";

import { Container, Content, UsersIcon } from "./styles";

export function CreateGroup() {
  const [group, setGroup] = useState("");

  const navigation = useNavigation();

  function handleGroupCreation() {
    navigation.navigate("Players", { group });
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
