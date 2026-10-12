<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import PersonneForm from '../../components/personnes/personne-form.vue'
import { addPersonne } from '@/services/personne-service'
import type { CreatePersonneRequest } from '@/models/personnes/personne'

const router = useRouter()

const personne = ref<CreatePersonneRequest>({
  prenom: '',
  nom: '',
})

const loading = ref(false)
const error = ref<string | null>(null)

async function enregistrerNouvellePersonne() {
  if (!personne.value.prenom.trim() || !personne.value.nom.trim()) {
    error.value = 'Le prénom et le nom sont obligatoires.'
    return
  }

  try {
    loading.value = true
    error.value = null

    const personneCreee = await addPersonne(personne.value)

    await router.push({
      name: 'personne-detail',
      params: { id: personneCreee.id },
    })
  } catch {
    error.value = 'Erreur lors de la création de la personne.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section>
    <h1>Ajouter une personne</h1>

    <p v-if="error" role="alert">{{ error }}</p>

    <PersonneForm
      v-model="personne"
      submit-label="Ajouter"
      :disabled="loading"
      @submit="enregistrerNouvellePersonne"
    />
  </section>
</template>
