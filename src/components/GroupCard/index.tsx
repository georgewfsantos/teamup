import { TouchableOpacityProps } from "react-native";

import { Container, Title, UsersIcon } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
};

export function GroupCard({ title, ...props }: Props) {
  return (
    <Container {...props}>
      <UsersIcon />
      <Title>{title}</Title>
    </Container>
  );
}
