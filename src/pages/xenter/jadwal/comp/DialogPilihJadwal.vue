<template>
  <q-dialog
      position="bottom"
      transition-show="slide-up"
      transition-hide="slide-down"
      @before-hide="select=null"
    >
    <q-card class="full-width" style="height: 100vh; border-top-right-radius: 20px; border-top-left-radius: 20px;">
      <div class="column fit">
        <div class="col-auto">
          <div class="row justify-between items-center q-pa-sm bg-teal text-white">
            <div class="text-weight-bold">Pilih Shift (HARI : {{ hari?.hari }})</div>
            <q-btn flat round icon="close" class="q-pa-xs" v-close-popup />
          </div>
          <q-separator></q-separator>
        </div>
        <div class="col full-height bg-grey-4 scroll">
          <div class="q-mb-xs"></div>
          <div v-for="(item,n) in items" :key="n">
            <q-card v-if="item?.id > 2" flat square
              class="q-mb-xs" v-ripple.early
              :class="select===item? 'bg-dark text-white ':''"
              @click="pilih(item)">
              <q-card-section class="q-px-md q-py-sm">
                <div :style="`color:${item?.warna??'grey'}`">{{ item?.nama }}</div>
                <div class="f-10">{{ item?.masuk }} - {{ item?.pulang }}</div>
              </q-card-section>
            </q-card>
          </div>
          <div style="margin-bottom: 120px;"></div>
        </div>
        <div class="absolute-bottom full-width">
          <div class="row">
            <div class="col-6">
              <q-btn square class="full-width" color="negative" size="lg" @click="pilihLibur">Pilih Libur</q-btn>
            </div>
            <div class="col-6">
              <q-btn square class="full-width" color="dark" size="lg" @click="pilihShift">Pilih Shift</q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-card>

    </q-dialog>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { useJadwal } from 'src/stores/xenter/absensi/jadwal'

// eslint-disable-next-line no-unused-vars
const $q = useQuasar()
const jadwal = useJadwal()

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  hari: {
    type: Object,
    default: null
  }
})

const emits = defineEmits('pilihJadwal', 'close')

const select = ref(null)

function pilih (item) {
  select.value = item
  // emits('pilihJadwal', item)
}

function pilihLibur () {
  // console.log('anda memilih libur', props.hari)
  // console.log('select kategory', select.value)
  const form = {
    kategory_id: 0,
    id: props?.hari?.id,
    status: '1' // MASUK 2 LIBUR 1
  }
  console.log(form)
  sendUpdateJadwal(form)
}
function pilihShift () {
  // console.log(select.value)
  if (select.value === null) {
    return notifMuncul('PERINGATAN !', 'Maaf Pilih Kategory Shift Terlebih Dahulu !!!')
  }
  const form = {
    kategory_id: select?.value?.id,
    id: props?.hari?.id,
    status: '2' // MASUK 2 LIBUR 1
  }
  console.log(form)
  sendUpdateJadwal(form)
}

function sendUpdateJadwal (form) {
  if (props?.hari?.status === '1' && form?.status === '1') {
    return
  }

  if (dayjs().locale('id').format('dddd') === props?.hari?.hari || dayjs().locale('id').format('dddd') === props.hari?.day) {
    if (props.hari.status === '2' && dayjs().locale('id').format('HH:mm:ss') < props.hari?.pulang) {
      return notifMuncul('PERINGATAN !', 'Maaf, Anda Ada jadwal dihari ini dan Belum Absen Pulang!, Boleh Mengganti jadwal setelah Absen Pulang')
    } else {
      jadwal.updateJadwal(form)
        .then(() => emits('close'))
    }
  } else {
    jadwal.updateJadwal(form)
      .then(() => emits('close'))
  }
}

function notifMuncul (head, msg) {
  $q.dialog({
    dark: true,
    title: head,
    message: msg
  }).onOk(() => {
    // console.log('OK')
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

</script>
