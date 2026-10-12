<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getPersonne } from '@/services/personne-service'
import type { PersonneResponse as Personne } from '@/models/personnes/personne'

const route = useRoute()
const router = useRouter()

const personne = ref<Personne | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const personneId = Number(route.params.id)

onMounted(async () => {
  if (!Number.isInteger(personneId) || personneId <= 0) {
    error.value = 'Identifiant de personne invalide.'
    loading.value = false
    return
  }

  try {
    personne.value = await getPersonne(personneId)
  } catch {
    error.value = 'Erreur lors du chargement de la personne.'
  } finally {
    loading.value = false
  }
})

function modifierPersonne() {
  router.push({
    name: 'personne-modifier',
    params: { id: personneId },
  })
}

function retournerALaListe() {
  router.push({ name: 'personne-list' })
}
</script>

<template>
  <section>
    <h1>Détails de la personne</h1>

    <p v-if="loading">Chargement...</p>

    <p v-else-if="error" role="alert">
      {{ error }}
    </p>

    <div v-else-if="personne">
      <dl>
        <dt>Prénom</dt>
        <dd>{{ personne.prenom }}</dd>

        <dt>Nom</dt>
        <dd>{{ personne.nom }}</dd>
      </dl>

      <button type="button" @click="modifierPersonne">Modifier</button>

      <button type="button" @click="retournerALaListe">Retour à la liste</button>
    </div>
  </section>
</template>
