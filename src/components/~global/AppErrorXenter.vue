<template>
  <div class="column flex-center fullscreen mellek">
    <!-- <div class="text-white">sadas</div> -->
    <div>
      <div class="bulatan column flex-center z-top" :class="status==='error'? 'bg-negative': 'bg-primary'" @click="logout">
       <q-icon :name="status==='error'? 'close': 'verified'" size="md" class="text-white"></q-icon>
      </div>

    </div>
    <div class="tempat-tulisan column flex-center relative-position">
      <div class="f-12 text-center q-pa-lg q-mb-lg"
        :class="status==='error'? 'text-negative': 'text-primary'"
      >{{msg}}</div>
      <div class="absolute-bottom">
        <div class="row">
          <q-btn class="col full-width" square
          :color="status==='error'? 'negative': 'primary'"
          @click="ok"
          >Ok</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLoginXenterStore } from 'src/stores/xenter/auth/login'
import { useRouter } from 'vue-router'

const auth = useLoginXenterStore()
const router = useRouter()
const props = defineProps({
  msg: {
    type: String,
    default: 'Error'
  },
  status: {
    type: String,
    default: 'error'
  }
})

const emits = defineEmits(['ok'])

function ok () {
  emits('ok')
}

function logout () {
  if (props.status === 'error') {
    auth.logout().then(() => {
      router.replace({ path: '/auth' })
    })
  }
}
</script>

<style lang="scss" scoped>
.mellek {
  background-color: rgba(0, 0, 0, 0.712);
}

.bulatan {
  opacity: 1;
  width:50px;
  height:50px;
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
  width: 50vw;
  min-height: 50px;
  background-color: white;
  border-radius: 5px;
  margin-top: -20px;
  opacity: 1;
  // position: absolute;
  // left: 50%;
}
</style>
