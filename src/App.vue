<template>
  <router-view />
</template>

<script setup>
import { useAppStore } from 'src/stores/app/index'
import { useQuasar } from 'quasar'
import { computed } from 'vue'

// INI DARI HEIGHT 800px
const store = useAppStore()
const $q = useQuasar()
$q.dark.set(false)

const txt140 = computed(() => store.txt140 + 'px')
const txt100 = computed(() => store.txt100 + 'px')
const txt80 = computed(() => store.txt80 + 'px')
const txt70 = computed(() => store.txt70 + 'px')
const txt50 = computed(() => store.txt50 + 'px')
const txt48 = computed(() => store.txt48 + 'px')
const txt32 = computed(() => store.txt32 + 'px')
const txt28 = computed(() => store.txt28 + 'px')
const txtH5 = computed(() => store.txtH5 + 'px')
const txtXl = computed(() => store.txtXl + 'px')
const txtLg = computed(() => store.txtLg + 'px')
const txtMd = computed(() => store.txtMd + 'px')
const txtSm = computed(() => store.txtSm + 'px')
const txtXs = computed(() => store.txtXs + 'px')

console.log('app:', store.width)
</script>

<style lang="scss">
$sizes: (
  "140":v-bind(txt140),
  "100":v-bind(txt100),
  "80":v-bind(txt80),
  "70":v-bind(txt70),
  "50":v-bind(txt50),
  "48":v-bind(txt48),
  "32":v-bind(txt32),
  "28":v-bind(txt28),
  "h5": v-bind(txtH5),
  "xl": v-bind(txtXl),
  "lg": v-bind(txtLg),
  "md": v-bind(txtMd),
  "sm": v-bind(txtSm),
  "xs": v-bind(txtXs)
);

@each $name,
$size in $sizes {
  .txt-#{$name} {
    font-size: #{$size} !important;
  }

  .pb-#{$name} {
    padding-bottom: #{$size};
  }

  .pt-#{$name} {
    padding-top: #{$size};
  }

  .pa-#{$name} {
    padding: #{$size};
  }

  .px-#{$name} {
    padding-left: #{$size};
    padding-right: #{$size};
  }

  .pl-#{$name} {
    padding-left: #{$size};
  }

  .pr-#{$name} {
    padding-right: #{$size};
  }

  .py-#{$name} {
    padding-top: #{$size};
    padding-bottom: #{$size};
  }

  .mb-#{$name} {
    margin-bottom: #{$size} !important;
  }

  .mt-#{$name} {
    margin-top: #{$size} !important;
  }

  .ma-#{$name} {
    margin-top: #{$size};
    margin-bottom: #{$size};
    margin-left: #{$size};
    margin-right: #{$size};
  }

  .mx-#{$name} {
    margin-left: #{$size} !important;
    margin-right: #{$size} !important;
  }

  .ml-#{$name} {
    margin-left: #{$size} !important;
  }

  .mr-#{$name} {
    margin-right: #{$size} !important;
  }

  .my-#{$name} {
    margin-top: #{$size} !important;
    margin-bottom: #{$size} !important;
  }

  .w-#{$name} {
    width: #{$size} !important;
  }

  .h-#{$name} {
    height: #{$size} !important;
  }

  .b-a-#{$name} {
    border-radius: #{$size};
  }
}

.container {
  padding-left: 5%;
  padding-right: 10%;
}
</style>
