import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  align-items: center;
  justify-content: center;
`

export const Content = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
`

export const Title = styled.Text`
  color: #fff;
  font-size: 32px;
`
