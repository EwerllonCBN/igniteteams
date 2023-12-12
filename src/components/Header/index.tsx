import { Container, Logo, BackIcon, BackButton, ContainerProps } from './styles'

import logoImg from '@assets/logo.png'
import { useNavigation } from '@react-navigation/native'

export function Header({ showBackButton = false, isGroupsScreen = false }) {
  const navigation = useNavigation()
  function handleGoHome() {
    navigation.navigate('groups')
  }

  return (
    <Container isGroupsScreen={isGroupsScreen}>
      {showBackButton && (
        <BackButton onPress={handleGoHome}>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  )
}
