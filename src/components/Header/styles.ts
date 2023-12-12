import styled from 'styled-components/native'
import { CaretLeft } from 'phosphor-react-native'
import { css } from 'styled-components'

export type ContainerProps = {
  isGroupsScreen: boolean
}

export const Container = styled.View<ContainerProps>`
  width: 100%;

  flex-direction: row;
  align-items: center;

  justify-content: center;

  ${props =>
    props.isGroupsScreen &&
    css`
      justify-content: space-between; /* Estilo específico para a tela 'groups' */
    `}
`

export const Logo = styled.Image`
  width: 46px;
  height: 55px;
`

export const BackButton = styled.TouchableOpacity``

export const BackIcon = styled(CaretLeft).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.WHITE
}))``
