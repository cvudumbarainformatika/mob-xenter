<template>
  <div class="column flex-center fullscreen mellek">
    <!-- <div class="text-white">sadas</div> -->
    <div>
      <div class="bulatan column flex-center">
        <q-spinner
          color="white"
          size="3em"
          :thickness="2"
          class="sinn"
        />
      </div>

    </div>
    <div class="tempat-tulisan column flex-center">
        <div class="f-12">Harap Tunggu</div>
      </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.mellek {
  background-color: rgba(0, 0, 0, 0.712);
}

.bulatan {
  background-color: $primary;
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
  height: 50px;
  background-color: white;
  border-radius: 5px;
  margin-top: -20px;
  opacity: 1;
  // position: absolute;
  // left: 50%;
}
</style>
