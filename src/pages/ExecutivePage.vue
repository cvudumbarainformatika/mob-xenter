import HeaderPage from './executive/HeaderPage.vue';

<template>
  <q-page>
    <div class="__wrapper frame-dark">
      <!-- <div class="frame-dark"> -->
        <aside class="tempat__menu">
          <menu-draw :width="app.txtLg" @on-selected="handleMenu" />
        </aside>
        <div class="__content">
          <!-- <header-page /> -->
          <PagePanels v-model="menu" :height="panelHeight" />
        </div>
      <!-- </div> -->
    </div>

  </q-page>
</template>

<script setup>
import { useAppStore } from 'src/stores/app'
import { ref, onMounted } from 'vue'
// import HeaderPage from './executive/HeaderPage.vue'
import MenuDraw from './executive/MenuDraw.vue'
import PagePanels from 'src/pages/executive/panels/IndexPage.vue'

const app = useAppStore()
const menu = ref('Keuangan')
const widthDrawer = ref(app.txt140 + 'px')
// const year = ref(date.getFullYear())
function handleMenu (val) {
  menu.value = val
}

const panelHeight = ref(0)
onMounted(() => {
  const hal = document.getElementsByClassName('__content')[0]
  console.log(hal.clientHeight)
  panelHeight.value = hal.clientHeight
})

</script>

<style lang="scss" scoped>
$menu:v-bind(widthDrawer);
.__wrapper {
  display: flex;
  flex-flow: row wrap;
  height: 96vh;
  width: 96vw;
  position: absolute;
  left: 50%;
  top: 50%;
  right:0;
  bottom:0;
  transform:translate(-50%, -50%);
  overflow-y: auto ;
  flex-direction: column;
}
// .__wrapper > * {
//   flex: 1 100%;
// }

aside {
  // flex: 1 0 10%;
  width: 8%;
  .tempat__menu {
    height:100%;
  }
}
.__content {
  height:100%;
  overflow-y: auto;
  width: 92%;

  // margin-left: 0.145%;
}

// .tempat__panel {
//   width: 100%;
//   height: 400px;
//   background-color: $primary;
// }
</style>
