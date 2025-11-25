<template>
  <div class="text-center q-py-md">
    <div class="text-h4 text-weight-bold">
      {{ time }}
    </div>
    <div class="f-12 text-gray-500 -mt-1">
      {{ date }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const time = ref('')
const date = ref('')

function updateClock () {
  const now = new Date()
  const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  time.value = now.toLocaleTimeString('id-ID', { hour12: false })
  date.value = now.toLocaleDateString('id-ID', optionsDate)
}

let timer
onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>
