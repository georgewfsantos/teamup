import { Container } from "./styles";

import { Header } from "@components/Header";
import { Heading } from "@components/Heading";
import { GroupCard } from "@components/GroupCard";

export function Groups() {
  return (
    <Container>
      <Header />
      <Heading title="Turmas" subtitle="jogue com a sua turma" />

      <GroupCard title="Galera do Ignite" onPress={() => {}} />
    </Container>
  );
}
