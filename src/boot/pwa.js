import { usePwaStore } from 'src/stores/pwa-store'
import { register } from 'register-service-worker'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default async ({ store }) => {
  console.log('[pwa.js] Boot file is running.')

  const pwa = usePwaStore(store)

  if (pwa) {
    console.log('[pwa.js] PWA Store successfully initialized in boot file.')
  } else {
    console.error('[pwa.js] FAILED to initialize PWA Store in boot file.')
    return
  }

  // PWA Install Prompt Logic
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('[pwa.js] ==> `beforeinstallprompt` event DITANGKAP!')
    console.log('[pwa.js] Mencegah prompt default browser.')
    e.preventDefault()
    console.log('[pwa.js] Memanggil pwa.setInstallPrompt()...')
    pwa.setInstallPrompt(e)
    console.log('[pwa.js] pwa.setInstallPrompt() selesai dipanggil. Status showInstallPrompt:', pwa.showInstallPrompt)
  })

  window.addEventListener('appinstalled', () => {
    console.log('[pwa.js] Aplikasi PWA berhasil diinstal.')
    if (pwa.deferredPrompt) {
      pwa.closeInstallPrompt()
    }
  })

  // PWA Update Prompt Logic
  register(process.env.SERVICE_WORKER_FILE, {
    ready () {
      console.log('[pwa.js] Aplikasi siap digunakan secara offline.')
    },
    registered (registration) {
      console.log('[pwa.js] Service worker berhasil didaftarkan.')
    },
    cached (registration) {
      console.log('[pwa.js] Konten telah di-cache untuk penggunaan offline.')
    },
    error (error) {
      console.error('[pwa.js] Error saat registrasi service worker:', error)
    },
    updated (registration) {
      console.log('[pwa.js] Konten baru tersedia, silakan refresh.')
      pwa.setUpdate(registration)
    },
    offline () {
      console.log('[pwa.js] Tidak ada koneksi internet. Aplikasi berjalan dalam mode offline.')
    }
  })

  // When the new service worker takes control, reload the page
  let refreshing = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return
    refreshing = true
    window.location.reload()
  })
}
