<template>
  <q-banner
    inline-actions
    dense
    :class="[$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2', 'app-update-banner']"
    v-if="modelValue"
  >
    <template v-slot:avatar>
      <q-icon name="cloud_sync" color="primary" />
    </template>

    <span class="text-weight-medium">Pembaruan Tersedia</span>

    <template v-slot:action>
      <q-btn flat color="primary" label="Update Sekarang" @click="emit('update')" />
      <q-btn flat color="grey-7" label="Nanti" @click="emit('update:modelValue', false)" />
    </template>
  </q-banner>
</template>

<script setup>
import { useQuasar } from 'quasar'

defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'update'])
const $q = useQuasar()

</script>

<style scoped>
.app-update-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  border-top: 1px solid rgba(0,0,0,0.1);
  animation: slide-up-banner 0.5s ease-out;
}

@keyframes slide-up-banner {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
