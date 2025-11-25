<template>
  <div class="relative-position full-width full-height">
    <!-- Map container -->
    <div id="map" class="full-width full-height" style="z-index:0"></div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  kantorPos: {
    type: Object,
    required: true,
    default: () => ({ lat: -7.7449802744747185, lng: 113.210602 })
  },
  radiusKantor: {
    type: Number,
    default: 75 // dalam meter
  }
})

const emit = defineEmits(['update:distance', 'update:isFar'])

const map = ref(null)
const userMarker = ref(null)
const accuracyCircle = ref(null)
const watchId = ref(null)

const distance = ref(0)
const isFar = ref(true)

const defaultZoom = 16
const defaultPosition = [props.kantorPos.lat, props.kantorPos.lng]

onMounted(() => {
  map.value = L.map('map', {
    minZoom: 1,
    maxZoom: 19,
    zoomControl: true
  }).setView(defaultPosition, defaultZoom)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map.value)

  // Tandai area kantor di peta (radius biru)
  L.circle(defaultPosition, {
    radius: props.radiusKantor,
    color: 'green',
    fillOpacity: 0.1
  }).addTo(map.value)

  startTracking()
})

const startTracking = () => {
  if (!navigator.geolocation) {
    console.error('Geolocation tidak didukung di perangkat ini.')
    emit('update:isFar', true) // Anggap jauh jika geolocation tidak didukung
    return
  }

  watchId.value = navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords
      updatePosition(latitude, longitude, accuracy)
    },
    (err) => {
      console.error('Geolocation error:', err)
      emit('update:isFar', true)
    },
    {
      enableHighAccuracy: true,
      maximumAge: 5000,
      timeout: 10000
    }
  )
}

const stopTracking = () => {
  if (watchId.value) {
    navigator.geolocation.clearWatch(watchId.value)
    watchId.value = null
  }
}

const updatePosition = (lat, lng, accuracy) => {
  if (!map.value) return

  // Hitung jarak user ke kantor
  distance.value = getDistanceFromLatLonInM(lat, lng, props.kantorPos.lat, props.kantorPos.lng)
  emit('update:distance', distance.value)

  // Buat / update marker user
  if (!userMarker.value) {
    const icon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
      iconSize: [36, 36],
      iconAnchor: [18, 36]
    })
    userMarker.value = L.marker([lat, lng], { icon }).addTo(map.value)
  } else {
    userMarker.value.setLatLng([lat, lng])
  }

  // Buat / update lingkaran akurasi
  if (!accuracyCircle.value) {
    accuracyCircle.value = L.circle([lat, lng], {
      radius: accuracy,
      color: 'blue',
      opacity: 0.2,
      fillOpacity: 0.1
    }).addTo(map.value)
  } else {
    accuracyCircle.value.setLatLng([lat, lng])
    accuracyCircle.value.setRadius(accuracy)
  }

  // Re-center map setiap update
  map.value.setView([lat, lng], map.value.getZoom(), { animate: true })
}

// Fungsi Haversine: menghitung jarak dua koordinat dalam meter
function getDistanceFromLatLonInM (lat1, lon1, lat2, lon2) {
  const R = 6371e3 // jari-jari bumi dalam meter
  const φ1 = lat1 * Math.PI / 180
  const φ2 = lat2 * Math.PI / 180
  const Δφ = (lat2 - lat1) * Math.PI / 180
  const Δλ = (lon2 - lon1) * Math.PI / 180

  const a = Math.sin(Δφ / 2) ** 2 +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // hasil dalam meter
}

watch(distance, (newValue) => {
  isFar.value = newValue > props.radiusKantor
  emit('update:isFar', isFar.value)
},
{
  immediate: true
})

onBeforeUnmount(() => {
  stopTracking()
  if (map.value) map.value.remove()
})
</script>
