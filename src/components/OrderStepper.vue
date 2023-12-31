<template>
  <div class="mt-5 flex justify-between items-center">
    <!-- STEP 1: CREATED -->
    <div
      class="text-center m-3 flex flex-col items-center"
      :class="{ completed: order.event_name === 'CREATED' }"
    >
      <div
        class="rounded-full h-12 w-12 flex items-center justify-center bg-blue-400 text-white"
      >
        <i class="fas fa-receipt"></i>
      </div>
      <p class="mt-2 text-xs">Created</p>
    </div>
    <div class="divider"></div>
    <!-- STEP 2: COOKED -->
    <div
      class="text-center m-3 flex flex-col items-center"
      :class="{ completed: order.events['COOKED'] }"
    >
      <div
        class="rounded-full h-12 w-12 flex items-center justify-center bg-blue-400 text-white"
      >
        <i class="fas fa-check" v-if="order.events['COOKED']"></i>
        <i class="fas fa-utensils" v-else></i>
      </div>
      <p class="mt-2 text-xs">Cooked</p>
    </div>
    <div class="divider"></div>
    <!-- STEP 3: DRIVER_RECEIVED -->
    <div
      class="text-center m-3 flex flex-col items-center"
      :class="{ completed: order.events['DRIVER_RECEIVED'] }"
    >
      <div
        class="rounded-full h-12 w-12 flex items-center justify-center bg-blue-400 text-white"
      >
        <i class="fas fa-check" v-if="order.events['DRIVER_RECEIVED']"></i>
        <i class="fas fa-car-side" v-else></i>
      </div>
      <p class="mt-2 text-xs">Driver received</p>
    </div>
    <div class="divider"></div>
    <!-- STEP 4: DELIVERED -->
    <div
      class="text-center m-3 flex flex-col items-center"
      :class="{ completed: order.events['DELIVERED'] }"
    >
      <div
        class="rounded-full h-12 w-12 flex items-center justify-center bg-blue-400 text-white"
      >
        <i class="fas fa-check" v-if="order.events['DELIVERED']"></i>
        <i class="fas fa-home" v-else></i>
      </div>
      <p class="mt-2 text-xs">Delivered</p>
    </div>
    <!-- STEP 0: CANCELLED -->
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.divider {
  display: block;
  flex: 1 1 0px;
  max-width: 100%;
  height: 0px;
  max-height: 0px;
  border: solid;
  border-width: thin 0 0 0;
  transition: inherit;
  border-color: rgba(0, 0, 0, 0.12);
}

.completed {
  @apply text-blue-400;
}
</style>
