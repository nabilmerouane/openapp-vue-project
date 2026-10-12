<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { PersonneResponse as Personne } from '@/models/personnes/personne'
import { getPersonnes } from '@/services/personne-service'

const router = useRouter()

const personnes = ref<Personne[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    loading.value = true
    error.value = null

    personnes.value = await getPersonnes()
  } catch {
    error.value = 'Erreur lors du chargement des personnes.'
  } finally {
    loading.value = false
  }
})

function consulterPersonne(id: number) {
  router.push({
    name: 'personne-detail',
    params: { id },
  })
}

function ajouterPersonne() {
  router.push({ name: 'personne-create' })
}
</script>

<template>
  <section>
    <h1>Liste des personnes</h1>

    <p v-if="loading">Chargement...</p>

    <p v-else-if="error" role="alert">
      {{ error }}
    </p>

    <template v-else>
      <p v-if="personnes.length === 0">Aucune personne enregistrée.</p>

      <ul v-else>
        <li v-for="personne in personnes" :key="personne.id">
          <button type="button" class="personne-item" @click="consulterPersonne(personne.id)">
            {{ personne.prenom }} {{ personne.nom }}
          </button>
        </li>
      </ul>
    </template>

    <button type="button" @click="ajouterPersonne" :disabled="loading">Ajouter une personne</button>
  </section>
</template>

<style scoped>
.personne-item {
  cursor: pointer;
  border: none;
  background: none;
  padding: 0.5rem 0;
  font: inherit;
  text-align: left;
}

.personne-item:hover {
  text-decoration: underline;
}
</style>
