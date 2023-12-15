import { ButtonIcon } from '@components/ButtonIcon'
import { Container, Icon, Name, ContentLeft, ContentRight } from './styles'

type Props = {
  name: string
  onRemove: () => void
}
export function PlayerCard({ name, onRemove }: Props) {
  return (
    <Container>
      <ContentLeft>
        <Icon name="person" />

        <Name>{name}</Name>
      </ContentLeft>
      <ContentRight>
        <ButtonIcon icon="close" type="SECONDARY" onPress={onRemove} />
      </ContentRight>
    </Container>
  )
}
