import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Container, Icon } from "./styles";
import theme from "src/theme";

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
};

export function IconButton({ icon, color, ...props }: Props) {
  return (
    <Container {...props}>
      <Icon name={icon} color={color} />
    </Container>
  );
}
