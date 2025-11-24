<template>
  <q-btn no-caps dense
    padding="5px 5px 6px 8px"
    class="btn-dark"
    >
    <q-icon v-if="icon!==null" left :size="`${app.txtLg + 2}px`" :name="icon" :color="`${dark?'grey-2':''}`" />
    <div :class="`txt-lg px-md ${dark?'text-grey-2':''}`">
      {{label}}
    </div>
  </q-btn>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useAppStore } from 'src/stores/app'
import { computed } from 'vue'

const $q = useQuasar()
const dark = computed(() => $q.dark.isActive)
const app = useAppStore()
defineProps({
  label: {
    type: String,
    default: 'Label'
  },
  icon: {
    type: String,
    default: null
  }
})
</script>
