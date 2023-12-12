import AsyncStorage from '@react-native-async-storage/async-storage'

import { GROUP_COLLECTION } from '@storage/storageConfig'

export async function groupsGetAll() {
  try {
    //Pegando as informações do dispositivo, o conteudo de group_collection
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION)
    //Verificamos se existe conteudo, então transformamos em objeto, caso contrario, um array vazio.
    const groups: string[] = storage ? JSON.parse(storage) : []

    return groups
  } catch (error) {
    throw error
  }
}
