<template>
  <q-card rounded class="card__w" :style="`cursor:${pointer}`">
    <slot />
  </q-card>
</template>

<script setup>

defineProps({
  pointer: {
    type: String,
    default: 'pointer'
  }
})

</script>

<style lang="scss" scoped>
.card__w {
  min-width: 200px;
}
</style>
