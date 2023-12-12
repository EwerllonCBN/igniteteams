import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppError } from '@utils/AppError'

import { PLAYER_COLLECTION } from '@storage/storageConfig'
import { playersGetByGroup } from './playersGetByGroup'
import { PlayerStorageDTO } from './PlayerStorageDTO'

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayers = await playersGetByGroup(group)

    //Verificar se a pessoa que esta sendo cadastrada ja faz parte de um time diferente
    //newPlayer tem a nova pessoa a ser cadastrada
    //o filter percorre o storedPlayers procurando por jogadores iguais ao newPlayer
    //que é a nova pessoa a ser cadastrada, caso seja verdadeiro
    //vai existir alguém no playerAlreadyExists, onde usaremos no if
    const playerAlreadyExists = storedPlayers.filter(
      player => player.name === newPlayer.name
    )

    //Se a largura do playerAlreadyExists for maior que 0, já existe um jogador cadastrado
    //Mensagem de erro deve ser exibida

    if (playerAlreadyExists.length > 0) {
      throw new AppError('Essa pessoa já está adicionada em um time aqui.')
    }

    //Esse é o storage que vamos passar para ser armazenado no asyncstorage
    const storage = JSON.stringify([...storedPlayers, newPlayer])
    /**
     @ignite-teams: players-rocket
     @ignite-teams: players-circuito
     @ignite-teams: players-machineLearning
     */
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw error
  }
}
