<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import PersonneForm from '../../components/personnes/personne-form.vue'
import { getPersonne, updatePersonne } from '@/services/personne-service'
import type { UpdatePersonneRequest } from '@/models/personnes/personne'

const route = useRoute()
const router = useRouter()

const personneId = Number(route.params.id)
const personneChargee = ref(false)
const personne = ref<UpdatePersonneRequest>({
  prenom: '',
  nom: '',
})

const loading = ref(false)
const chargementInitial = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  if (!Number.isInteger(personneId) || personneId <= 0) {
    error.value = 'Identifiant de personne invalide.'
    chargementInitial.value = false
    return
  }

  try {
    loading.value = true
    error.value = null

    const response = await getPersonne(personneId)

    personne.value = {
      prenom: response.prenom,
      nom: response.nom,
    }

    personneChargee.value = true
  } catch {
    error.value = 'Erreur lors du chargement de la personne.'
  } finally {
    loading.value = false
    chargementInitial.value = false
  }
})

async function enregistrerModification() {
  if (!personne.value.prenom.trim() || !personne.value.nom.trim()) {
    error.value = 'Le prénom et le nom sont obligatoires.'
    return
  }

  try {
    loading.value = true
    error.value = null

    const response = await updatePersonne(personneId, personne.value)

    await router.push({
      name: 'personne-detail',
      params: { id: response.id },
    })
  } catch {
    error.value = 'Erreur lors de la modification de la personne.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section>
    <h1>Modifier une personne</h1>

    <p v-if="error" role="alert">{{ error }}</p>

    <p v-if="chargementInitial">Chargement...</p>

    <PersonneForm
      v-else-if="personneChargee"
      v-model="personne"
      submit-label="Modifier"
      :disabled="loading"
      @submit="enregistrerModification"
    />
  </section>
</template>
