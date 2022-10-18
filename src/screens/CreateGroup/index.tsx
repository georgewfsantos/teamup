import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Heading } from "@components/Heading";
import { Input } from "@components/Input";

import { Container, Content, UsersIcon } from "./styles";

export function CreateGroup() {
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <UsersIcon />

        <Heading
          title="Nova turma"
          subtitle="crie a turma apara adicionar as pessoas"
        />

        <Input placeholder="Nome da Turma" style={{ marginBottom: 20 }} />

        <Button title="Criar" />
      </Content>
    </Container>
  );
}
