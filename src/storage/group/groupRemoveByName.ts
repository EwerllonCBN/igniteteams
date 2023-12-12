import AsyncStorage from '@react-native-async-storage/async-storage'
import { groupsGetAll } from './groupsGetAll'
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig'

export async function groupRemoveByName(groupDeleted: string) {
  try {
    //Filtrando todos os grupos menos o que queremos deletar
    const storedGroups = await groupsGetAll()

    //Traga todos os grupos menos o que queremos deletar
    const groups = storedGroups.filter(group => group !== groupDeleted)

    //Vamos sobrescrever a coleção de grupos, sem o grupo a ser deletado e guardar no formato json stringy
    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups))

    //Pela coleção de jogadores vamos remover o grupo a ser deletado,
    //Por não haver mais um meio de acessar ao grupo, apos atualizar a lista com todos os grupos

    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`)
  } catch (error) {
    throw error
  }
}
