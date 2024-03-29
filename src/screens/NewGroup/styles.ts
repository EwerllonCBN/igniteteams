import styled from 'styled-components/native'
import { UsersThree } from 'phosphor-react-native'
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  SafeAreaView
} from 'react-native'

// type Props = KeyboardAvoidingViewProps & {
//   View: SafeAreaView
// }KeyboardAvoidingView

export const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`

export const SafeAreaContextContainer = styled(SafeAreaView)`
  flex: 1;
`

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`
export const Icon = styled(UsersThree).attrs(({ theme }) => ({
  size: 56,
  color: theme.COLORS.GREEN_700
}))`
  align-self: center;
`
