import styled, { css } from 'styled-components/native'
import { TextInput } from 'react-native'

export const Container = styled(TextInput)`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  justify-content: center;
  align-items: center;

  ${({ theme }) => css`
    background-color: ${theme.COLORS.GRAY_700};
    color: ${theme.COLORS.WHITE};
  `}

  border-radius: 6px;
  padding: 16px;
`
