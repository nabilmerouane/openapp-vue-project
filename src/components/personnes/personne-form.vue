<script setup lang="ts">
type PersonneFormModel = {
  prenom: string
  nom: string
}

const model = defineModel<PersonneFormModel>({
  required: true,
})

defineProps<{
  submitLabel: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  submit: []
}>()
</script>

<template>
  <form @submit.prevent="emit('submit')">
    <div>
      <label for="prenom">Prénom</label>
      <input id="prenom" v-model.trim="model.prenom" type="text" required :disabled="disabled" />
    </div>

    <div>
      <label for="nom">Nom</label>
      <input id="nom" v-model.trim="model.nom" type="text" required :disabled="disabled" />
    </div>

    <button type="submit" :disabled="disabled">
      {{ submitLabel }}
    </button>
  </form>
</template>
