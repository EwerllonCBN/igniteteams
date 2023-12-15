import { useNavigation, useRoute } from '@react-navigation/native'
import { Header } from '@components/Header'
import { Container, Form } from './styles'
import { Highlight } from '@components/Highlight'

import { HeaderList, NumberOfPlayers } from '@components/Filter/styles'

import { Input } from '@components/Input'

import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { Alert, FlatList, TextInput } from 'react-native'
import { useEffect, useState, useRef } from 'react'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { AppError } from '@utils/AppError'
import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'
import { groupRemoveByName } from '@storage/group/groupRemoveByName'
import { isLoading } from 'expo-font'
import { Loading } from '@components/Loading'
import { Content } from '@screens/Groups/styles'

type RouteParams = {
  group: string
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]) //Do tipo de lista da coleção PlayerStorageDTO

  const route = useRoute()
  const { group } = route.params as RouteParams
  const navigation = useNavigation()
  //Controlando o comportamento do input
  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function groupRemove() {
    try {
      await groupRemoveByName(group)

      navigation.navigate('groups')
    } catch (error) {
      console.log(error)
      Alert.alert('Remover grupo', 'Não foi possível remover grupo')
    }
  }

  //Primeiro parametro do alerto é Tutlo, segundo parametro: mensagem
  //Terceiro parametro é o objeto com opções ao usuário

  async function handleGroupRemove() {
    Alert.alert('Remover', 'Deseja remover o grupo?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        onPress: () => groupRemove()
      }
    ])
  }

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        'Nova pessoa',
        'Informe o nome da pessoa para adicionar'
      )
    }

    //Variavel de objeto para adicionar novo jogador
    const newPlayer = {
      name: newPlayerName,
      team
    }

    try {
      //Precisa de dois parametros, novo jogador e o nome do grupo
      await playerAddByGroup(newPlayer, group)

      //Tirando o foco do input
      newPlayerNameInputRef.current?.blur()

      //Assim que adicionar uma nova pessoa, recarregamos a listagem.
      fetchPlayersByTeam()

      setNewPlayerName('')
    } catch (error) {
      //Se o tipo da classe error for AppError manda o alert, se não só o error
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message)
      } else {
        console.log(error)
        Alert.alert('Nova pessoa', 'Não foi possível adicionar.')
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team)

      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Pessoas',
        'Não foi possível carregar as pessoas do time selecionado.'
      )
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      await fetchPlayersByTeam()
    } catch (error) {
      console.log(error)
      Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.')
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])
  return (
    <Container>
      <Header showBackButton isGroupsScreen />

      <Highlight title={group} subtitle="Adicione a galera e separe os times" />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon onPress={handleAddPlayer} icon="add" />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => {
            switch (item) {
              case 'Time A':
                return 'keyTimeA'
              case 'Time B':
                return 'keyTimeB'
              default:
                return ''
            }
          }}
          renderItem={({ item, index }) => (
            <Filter
              title={item}
              key={index}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <Content>
        {!isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={players}
            keyExtractor={item => item.name}
            renderItem={({ item, index }) => (
              <PlayerCard
                onRemove={() => handlePlayerRemove(item.name)}
                name={item.name}
                key={index}
              />
            )}
            ListEmptyComponent={() => (
              <ListEmpty message="Não há pessoas nesse time" />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              players.length === 0 && { flex: 1, width: '100%' }
            ]}
          />
        )}
      </Content>
      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={() => handleGroupRemove()}
      />
    </Container>
  )
}
