import { Header } from '@components/Header'
import { Container, Content } from './styles'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { groupsGetAll } from '@storage/group/groupsGetAll'
import { Loading } from '@components/Loading'

export function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)
      const data = await groupsGetAll()

      setGroups(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  // Chamando a função para limpar os dados

  useFocusEffect(
    useCallback(() => {
      //quando vai executar? sempre depois da renderização do componente
      fetchGroups()
    }, [])
  )

  return (
    <Container>
      <Header showBackButton={false} isGroupsScreen={false} />
      <Highlight title="Turmas" subtitle="jogue com sua turma" />

      <Content>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={groups}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <GroupCard onPress={() => handleOpenGroup(item)} title={item} />
            )}
            contentContainerStyle={
              groups.length === 0 && { flex: 1, width: '100%' }
            }
            ListEmptyComponent={() => (
              <ListEmpty message="Cadastre sua primeira turma" />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </Content>
      <Button
        title="Criar nova turma"
        type="PRIMARY"
        style={{ width: '90%', margin: 20 }}
        onPress={handleNewGroup}
      />
    </Container>
  )
}
