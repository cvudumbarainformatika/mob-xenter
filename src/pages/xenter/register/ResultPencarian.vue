<template>
  <div class="column flex-center fullscreen mellek">
    <!-- <div class="text-white">sadas</div> -->
    <div>
      <div class="bulatan column flex-center z-top">
       <img
          :src="getImage()"
          style="width: 75%;" />
      </div>

    </div>
    <div class="tempat-tulisan column text-center relative-position">
        <div class="f-12" style="margin-top:70px">

          <div class="text-weight-bold">{{ resp?.nama }}</div>
          <div class="f-12 q-py-sm">NIK : {{ resp?.nik }}</div>
          <div :class="resp?.account_pass === ''? 'text-negative': 'text-primary'">{{resp?.account_pass === ''? 'ANDA BELUM REGISTRASI' : 'ANDA SUDAH TER REGISTRASI'}}</div>
        </div>
        <div class="absolute-bottom">
          <div class="row">
            <q-btn color="dark" class="col full-width" square @click="keluar">Keluar</q-btn>
            <q-btn color="primary" class="col full-width" square @click="lanjutkan">Lanjut</q-btn>
          </div>
        </div>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  resp: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['keluar'])

function getImage () {
  return new URL('../../../assets/images/user-man.svg', import.meta.url).href
}

function lanjutkan () {
  // console.log(router)
  router.push({ path: '/auth/input-password' })
}

function keluar () {
  emits('keluar')
}
</script>

<style lang="scss" scoped>
.mellek {
  background-color: rgba(0, 0, 0, 0.712);
}

.bulatan {
  background-color: $grey;
  opacity: 1;
  width:120px;
  height:120px;
  border-radius: 50%;
  border: 4px solid white;
  position: relative;
  .spinn {
    position: absolute;
    left: 50%;
    top: 50%;
  }
}

.tempat-tulisan {
  width: 70vw;
  min-height: 250px;
  background-color: white;
  border-radius: 5px;
  margin-top: -50px;
  opacity: 1;
  // position: absolute;
  // left: 50%;
}
</style>
