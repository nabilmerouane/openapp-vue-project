export interface PersonneResponse {
  id: number
  nom: string
  prenom: string
}

export type CreatePersonneRequest = Omit<PersonneResponse, 'id'>
export type UpdatePersonneRequest = Omit<PersonneResponse, 'id'>
