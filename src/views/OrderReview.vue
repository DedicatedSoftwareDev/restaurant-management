<template>
  <div class="flex flex-1 items-center justify-center relative">
    <div
      class="absolute top-0 left-0 my-8 mx-8 cursor-pointer"
      @click="$router.push('/')"
    >
      <i class="fas fa-home"></i> Dashboard
    </div>

    <!-- ERROR STATE -->
    <div
      class="bg-white rounded-lg shadow-md px-6 py-6 sm:w-full md:w-1/2"
      v-if="!order"
    >
      <h2
        class="font-semibold text-gray-900 text-2xl leading-tight border-b-2 border-gray-200 pb-4"
      >
        INVALID ORDER
      </h2>
      <p class="mt-4">This order does not exist</p>
    </div>

    <!-- EXISTING ORDER -->
    <div
      class="bg-white rounded-lg shadow-md px-6 py-6 sm:w-full md:w-2/3"
      v-else
    >
      <OrderDetail :order="order" />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import OrderDetail from "../components/OrderDetail.vue";

export default {
  components: {
    OrderDetail
  },
  computed: {
    order() {
      const id = this.$route.params.id || this.orderId;

      return _.find(this.$store.getters.orders, { id });
    }
  },
  props: {
    orderId: {
      type: String
    }
  }
};
</script>

<style></style>
