import { useState } from 'react'
import { Header } from '@components/Header'
import { Container, Content, Icon, SafeAreaContextContainer } from './styles'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { Alert, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { groupCreate } from '@storage/group/groupCreate'
import { AppError } from '@utils/AppError'

export function NewGroup() {
  const [group, setGroup] = useState('')
  const navigation = useNavigation()

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Nova Turma', 'Informe o nome da turma')
      }
      await groupCreate(group)
      navigation.navigate('players', { group }) //Quando tempos a rota igual ao parametro do conteudo, basta apenas 1 nome...
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message)
      } else {
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.')
      }
      console.log(error)
    }
  }

  return (
    <Container
      enabled={Platform.OS === 'ios' ? true : false}
      behavior="padding"
    >
      <SafeAreaContextContainer>
        <Header showBackButton={true} isGroupsScreen={true} />

        <Content>
          <Icon />

          <Highlight
            title="Nova turma"
            subtitle="Crie a turma para adicionar novos alunos"
          />

          <Input placeholder="Nome da turma" onChangeText={e => setGroup(e)} />

          <Button
            type="PRIMARY"
            onPress={handleNew}
            title="Criar"
            style={{ marginTop: 20 }}
          />
        </Content>
      </SafeAreaContextContainer>
    </Container>
  )
}
