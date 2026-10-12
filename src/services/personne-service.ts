import type {
  PersonneResponse,
  CreatePersonneRequest,
  UpdatePersonneRequest,
} from '@/models/personnes/personne'

export async function getPersonnes(): Promise<PersonneResponse[]> {
  const response = await fetch('/api/personnes')

  if (!response.ok) {
    throw new Error('Erreur lors du chargement des personnes')
  }

  return response.json()
}

export async function getPersonne(id: number): Promise<PersonneResponse> {
  const response = await fetch(`/api/personnes/${id}`)

  if (!response.ok) {
    throw new Error('Erreur lors du chargement de la personne')
  }

  return response.json()
}

export async function addPersonne(request: CreatePersonneRequest): Promise<PersonneResponse> {
  const response = await fetch('/api/personnes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error('Erreur lors de la création')
  }

  return response.json()
}

export async function updatePersonne(
  id: number,
  request: UpdatePersonneRequest,
): Promise<PersonneResponse> {
  const response = await fetch(`/api/personnes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error('Erreur lors de la modification')
  }

  return response.json()
}

export async function deletePersonne(id: number): Promise<void> {
  const response = await fetch(`/api/personnes/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Erreur lors de la suppression de la personne')
  }
}
