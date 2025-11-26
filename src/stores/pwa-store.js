import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePwaStore = defineStore('pwa', () => {
  // State
  const deferredPrompt = ref(null)
  const showInstallPrompt = ref(false)

  const updateRegistration = ref(null)
  const showUpdatePrompt = ref(false)

  // Actions
  function setInstallPrompt (event) {
    deferredPrompt.value = event
    showInstallPrompt.value = true
  }

  async function handleInstall () {
    if (!deferredPrompt.value) {
      return
    }
    deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice
    if (outcome === 'accepted') {
      deferredPrompt.value = null
    }
    showInstallPrompt.value = false
  }

  function setUpdate (registration) {
    updateRegistration.value = registration
    showUpdatePrompt.value = true
  }

  function handleUpdate () {
    showUpdatePrompt.value = false
    if (updateRegistration.value && updateRegistration.value.waiting) {
      updateRegistration.value.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  }

  function closeInstallPrompt () {
    showInstallPrompt.value = false
  }

  return {
    deferredPrompt,
    showInstallPrompt,
    updateRegistration,
    showUpdatePrompt,
    setInstallPrompt,
    handleInstall,
    setUpdate,
    handleUpdate,
    closeInstallPrompt
  }
})
