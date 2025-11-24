<template>
  <q-img
    :src="foto"
    :ratio="1"
    :width="width"
    style="max-width: 100%; background-color: gray; border-radius: 50%; border:1px solid white;"
    rounded
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  width: { type: String, default: '60px' },
  user: { type: Object, default: null }
})

const foto = computed(() => {
  // const foto = props?.user?.foto
  // if (foto !== '' || foto !== null) {
  //   return 'http://36.89.103.114:4542/simpeg/foto/' + foto
  // }
  const perempuan = props.user ? props.user?.kelamin === 'Perempuan' || props.user?.kelamin === 'perempuan' : false
  // const usia = props.user?.usia
  // const usiath = usia ? parseInt(usia.substring(0, 2)) : 25
  if (perempuan) {
    return new URL('../../assets/images/user-girl.svg', import.meta.url).href
    // if (usiath <= 99 && usiath > 59) {
    //   return new URL('../../assets/images/grandma.png', import.meta.url).href
    // } else if (usiath <= 59 && usiath > 25) {
    //   return new URL('../../assets/images/user-girl.svg', import.meta.url).href
    // } else if (usiath <= 25 && usiath > 15) {
    //   return new URL('../../assets/images/user-girl2.svg', import.meta.url).href
    // } else if (usiath <= 15) {
    //   return new URL('../../assets/images/young-girl.svg', import.meta.url).href
    // } else {
    //   return new URL('../../assets/images/user-girl3.svg', import.meta.url).href
    // }
  } else {
    return new URL('../../assets/images/user-man.svg', import.meta.url).href
    // if (usiath <= 99 && usiath > 59) {
    //   return new URL('../../assets/images/grandpa.svg', import.meta.url).href
    // } else if (usiath <= 59 && usiath > 25) {
    //   return new URL('../../assets/images/user-man2.svg', import.meta.url).href
    // } else if (usiath <= 25 && usiath > 15) {
    //   return new URL('../../assets/images/user-man.svg', import.meta.url).href
    // } else if (usiath <= 15) {
    //   return new URL('../../assets/images/young-man.svg', import.meta.url).href
    // } else {
    //   return new URL('../../assets/images/actor.svg', import.meta.url).href
    // }
  }
})
</script>
