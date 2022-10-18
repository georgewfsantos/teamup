import { TouchableOpacityProps } from "react-native";
import { Container, FilterStyle, Title } from "./styles";

type Props = TouchableOpacityProps &
  FilterStyle & {
    title: string;
  };

export function Filter({ title, isActive, ...props }: Props) {
  return (
    <Container isActive={isActive} {...props}>
      <Title>{title}</Title>
    </Container>
  );
}
