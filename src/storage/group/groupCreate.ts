import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storageConfig'
import { groupsGetAll } from './groupsGetAll'
import { AppError } from '@utils/AppError'

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await groupsGetAll()

    //Verifica se o novo grupo que quero cadastrar esta incluso com o metodo de array includes()
    //Teremos um booleano
    const groupAlreadyExists = storedGroups.includes(newGroup)

    if (groupAlreadyExists) {
      //Se for verdade, adicionamos uma nova excessão
      throw new AppError('Já existe um grupo cadastrado com esse nome!')
    }
    //De objeto passamos para texto
    const storage = JSON.stringify([...storedGroups, newGroup])

    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  } catch (error) {
    throw error
  }
}
