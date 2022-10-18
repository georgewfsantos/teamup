import { useTheme } from "styled-components/native";

import { IconButton } from "@components/IconButton";

import { Container, Icon, Name } from "./styles";

type Props = {
  name: string;
  onPlayerRemoval: () => void;
};

export function PlayerCard({ name, onPlayerRemoval }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Icon name="person" />
      <Name>{name}</Name>
      <IconButton
        icon="close"
        color={COLORS.RED_DARK}
        onPress={onPlayerRemoval}
      />
    </Container>
  );
}
