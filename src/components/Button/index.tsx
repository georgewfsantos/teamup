import { TouchableOpacityProps } from "react-native";
import { Container, Title, ButtonVariant } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  variant?: ButtonVariant;
};

export function Button({ title, variant = "primary", ...props }: Props) {
  return (
    <Container variant={variant} {...props}>
      <Title>{title}</Title>
    </Container>
  );
}
