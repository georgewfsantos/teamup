import styled, { css } from "styled-components/native";

export type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  variant: ButtonVariant;
};

export const Container = styled.TouchableOpacity<ButtonProps>`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background-color: ${({ theme, variant }) =>
    variant === "primary" ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
  `}
`;
