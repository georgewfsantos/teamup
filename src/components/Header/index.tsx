import { TouchableOpacityProps } from "react-native";

import { useNavigation } from "@react-navigation/native";

import logo from "@assets/logo.png";

import { Container, Logo, BackIcon, BackButton } from "./styles";

type Props = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: Props) {
  const navigation = useNavigation();
  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={() => navigation.navigate("Groups")}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logo} />
    </Container>
  );
}
