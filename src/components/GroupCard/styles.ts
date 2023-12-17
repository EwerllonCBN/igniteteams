import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'
import { User, UsersThree } from 'phosphor-react-native'

export const Container = styled(TouchableOpacity)`
  width: 90%;
  max-width: 90%;
  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 6px;

  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  padding: 24px 80px 24px 24px;
  margin: 0px 0px 20px 20px;
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_200};
  `}
`

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.GREEN_700,
  weight: 'fill' //Estilo de icone preenchido
}))`
  margin-right: 20px;
`
