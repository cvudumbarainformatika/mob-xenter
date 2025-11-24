<template>
  <q-field
    filled
    label="Percobaan"
  >
    <template v-slot:control="{ id, floatingLabel, modelValue, emitValue }">
      <input :id="id"
      ref="inp"
      class="q-field__input js-kioskboard-input"
      data-kioskboard-type="all" data-kioskboard-placement="bottom" data-kioskboard-specialcharacters="false"
      :value="modelValue" @change="e => emitValue(e.target.value)"
      v-show="floatingLabel" />
    </template>
  </q-field>
</template>

<script setup>
import KioskBoard from 'kioskboard'
import { onMounted, ref } from 'vue'
import engKiosk from 'src/assets/kiosk/english-default.json'

const options = {
  keysArrayOfObjects: engKiosk,
  keysJsonUrl: null,
  keysSpecialCharsArrayOfStrings: null,
  keysNumpadArrayOfNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  language: 'en',
  theme: 'dark',
  autoScroll: true,
  capsLockActive: true,
  allowRealKeyboard: false,
  allowMobileKeyboard: false,
  cssAnimations: true,
  cssAnimationsDuration: 360,
  cssAnimationsStyle: 'slide',
  keysAllowSpacebar: true,
  keysSpacebarText: 'Space',
  keysFontFamily: 'sans-serif',
  keysFontSize: '22px',
  keysFontWeight: 'normal',
  keysIconSize: '25px',
  keysEnterText: 'Enter',
  keysEnterCallback: undefined,
  keysEnterCanClose: true
}
// const kiosk = ref(

// )

const inp = ref(null)

onMounted(() => {
  console.log('anjungan', KioskBoard)
  KioskBoard.run(inp.value, KioskBoard.init(options))
})
</script>

<style lang="scss" scoped>
#KioskBoard-VirtualKeyboard.kioskboard-with-animation.kioskboard-placement-bottom.kioskboard-slide{
  position: absolute;
}
</style>
