<template>
  <div class="absolute bg-loading" style="width:100%; height:100%; z-index: 100;">
     <div class="full-width full-height column justify-center items-center content-center">
       <div class="absolute-top text-center" style="margin-top:150px">
        <!-- <app-lottie url="123652-financial.json" :height="450" :width="350"  /> -->
        <Vue3Lottie
          ref="anim"
          :animationData="fileLink"
          :height="450"
          :width="450"
          :playOnHover="false"
          :autoPlay="true"
          direction="alternate"
        />
        <div class="f-14 text-grey-7">Harap Tunggu ...</div>
       </div>
     </div>
    </div>
</template>
<script setup>
// import { computed } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

import fileLink from 'src/assets/lottie/123652-financial.json'

// const nFile = computed(() => {
//   return new URL(fileLink, import.meta.url).href
// })

</script>
<style lang="scss" scoped>
.bg-loading {
  background-color: #ffffffea;
}
</style>
