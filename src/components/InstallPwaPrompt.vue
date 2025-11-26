<template>
  <q-dialog :model-value="modelValue" @update:model-value="close" persistent>
    <q-card class="q-pa-md" style="width: 350px; border-radius: 15px;">
      <q-card-section class="text-center">
        <q-avatar size="80px" class="q-mb-md">
          <img src="/app-icon.png" alt="App Icon">
        </q-avatar>
        <div class="text-h6 text-weight-bold">Install Aplikasi Xenter</div>
        <p class="text-grey-8 q-mt-sm">
          Pasang aplikasi di layar utama Anda untuk akses lebih cepat dan pengalaman yang lebih baik.
        </p>
      </q-card-section>

      <q-card-actions align="center" class="column q-gutter-y-sm">
        <q-btn
          label="Install Sekarang"
          color="primary"
          unelevated
          rounded
          class="full-width"
          @click="emit('install')"
          icon="download"
        />
        <q-btn
          label="Nanti Saja"
          color="grey-7"
          flat
          rounded
          class="full-width"
          @click="close"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'install'])

const close = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped>
.q-card {
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.2);
  animation: slide-up 0.5s ease-out;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
