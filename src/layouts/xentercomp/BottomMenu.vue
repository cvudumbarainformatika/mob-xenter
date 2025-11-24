<template>
  <ul class="navigation">
      <li v-for="(item, i) in menus" :key="i" :class="route.name===item.nama?'active':''" @click="goTo(item.path)">
          <div >
              <q-icon class="icon" :name="item.icon" v-ripple />
              <span class="text">{{ item.nama }}</span>
          </div>
      </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  route: {
    type: Object,
    default: null
  }
})

const router = useRouter()
console.log('bottom', props.route.name)

// const active = ref('Home')
const menus = ref([
  { nama: 'Home', icon: 'dashboard', path: '/home' },
  { nama: 'Jadwal', icon: 'pending_actions', path: '/jadwal' },
  { nama: 'Absen', icon: 'qr_code_scanner', path: '/absen' },
  { nama: 'History', icon: 'event_note', path: '/history' },
  { nama: 'Account', icon: 'manage_accounts', path: '/account' }
])

function goTo (path) {
  // const path = val?.toLowerCase()
  router.push({ path })
}
</script>

<style lang="scss" scoped>
ul.navigation{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 100%;
    list-style: none;
    // box-shadow: 25px 25px 75px rgba(0,0,0,0.25),
    // 10px 10px 70px rgba(0,0,0,0.25),
    // inset 5px 5px 10px rgba(0,0,0,0.5),
    // inset 5px 5px 10px rgba(255,255, 255,0.2),
    // inset -5px -5px 15px rgba(0,0,0,0.7);
    // // padding: 0 20px;
    // border-radius: 20px;
    margin:0 !important;
    padding:0 !important;
}

ul.navigation li{
    width: 20%;
}

ul.navigation li div{
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

}

ul.navigation li div .icon{
    color: rgba(255,255, 255,0.8);
    padding: 5px;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    position: absolute;
    font-size: 1.5rem;
    transition: 0.5s;
}

ul.navigation li.active div .icon{
    transform: translateY(-29px);
    background-color: #2d2d2d;
    color: white;
    box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.25), inset -3px -3px 5px rgba(0, 0, 0, 0.5), inset 3px 3px 15px rgba(255, 255, 255, 0.2);
    border: 2px solid #c7dd00;
}

ul.navigation li div .text{
    color: white;
    // font-family: 'Poppins', sans-serif;
    transition: 0.5s;
    display: none;
}

ul.navigation li.active div .text{
    display: block;
    background-color: $dark;
    color: #fff;
    font-size: 0.6rem;
    padding: 2px 10px;
    border-radius: 5px;
    margin-top: 10px;
    transition: 0.5s;
    // box-shadow: 4px 4px 5px rgba(0,0,0,0.25),
    // inset -2px -2px 3px rgba(0,0,0,0.5),
    // inset 3px 3px 15px rgba(255,255,255,0.2);
}
</style>
