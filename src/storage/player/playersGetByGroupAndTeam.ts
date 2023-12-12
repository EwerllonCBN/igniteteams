import { playersGetByGroup } from './playersGetByGroup'

export async function playersGetByGroupAndTeam(group: string, team: string) {
  try {
    //A função precisa de duas informaçõesQ
    //No storage a gente faz o primeiro filtro, que é os jogadores pelo grupo
    const storage = await playersGetByGroup(group)

    //No segundo filtro, quem é do time que eu quero filtrar, no caso
    //Ou time A ou time B. e Retorno
    const players = storage.filter(player => player.team === team)

    return players
  } catch (error) {
    throw error
  }
}
