<template>
  <q-dialog
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-dark text-white full-height full-width">
      <q-btn
        class="absolute-top-right"
        color="white"
        size="lg"
        icon="close"
        flat
        round
        @click="backTo()"
      />
      <div v-if="kirimQr" class="column fit flex-center">
        <div v-if="waiting">
          <q-spinner-dots color="white" size="2em" />
          <div>Harap tunggu</div>
        </div>

        <div v-else>
          <div v-if="err === null">Absensi Berhasil</div>
          <div v-else>{{ err }}</div>
          <q-btn label="Kembali" color="primary" size="lg" @click="backTo()" />
        </div>
      </div>
      <ScannerComponent v-else @decode="onDecodeString" />
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import { useAbsenContext } from '../../absenContext';
import ScannerComponent from 'src/components/ScannerComponent.vue';

const { saveStore } = useAbsenContext();
const router = useRouter();

const waiting = ref(false);
const kirimQr = ref(false);
const err = ref(null);

const props = defineProps({
  kondisi: {
    type: String,
    default: null,
  },
  tanggal: {
    type: String,
    default: null,
  },
  jam: {
    type: String,
    default: null,
  },
  kategory: {
    type: [Number, String],
    default: null,
  },
});

function backTo() {
  router.replace({ path: '/absen' });
}

function onDecodeString(val) {
  const formData = {
    qr: val,
    tanggal: props.tanggal,
    jam: props.jam,
    status: props.kondisi,
    kategory_id: props.kategory,
    lokasi: 'ok',
  };

  kirimQr.value = true;
  waiting.value = true;
  sendData(formData);
}

async function sendData(data) {
  try {
    await api.post('/v2/absensi/scan/qr', data);
    props.kondisi === 'masuk' ? saveStore('checkIn') : saveStore('checkOut');
  } catch (error) {
    err.value = 'Ada Kesalahan Harap Ulangi';
  } finally {
    waiting.value = false;
  }
}
</script>