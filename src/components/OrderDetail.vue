<template>
  <div>
    <h2
      class="font-semibold text-gray-900 text-2xl leading-tight border-b-2 border-gray-200 pb-4 flex justify-between"
    >
      <span
        >{{ order.name }}
        <span class="text-gray-500">(ID: {{ order.id }})</span></span
      >
      <Dropdown
        :open="openDropDown"
        @close="openDropDown = false"
        @open="openDropDown = true"
      >
        <template v-slot:title>
          <span
            class="flex items-center rounded-full text-white uppercase px-2 py-3 text-xs font-bold"
            :class="{
              'bg-red-500': order.currentStatus === 'CREATED',
              'bg-indigo-500': order.currentStatus === 'COOKED',
              'bg-orange-500': order.currentStatus === 'DRIVER_RECEIVED',
              'bg-green-500': order.currentStatus === 'DELIVERED',
              'bg-gray-500': order.currentStatus === 'CANCELLED'
            }"
            style="max-height: 35px"
          >
            <i
              class="fas px-2"
              :class="{
                'fa-receipt': order.currentStatus === 'CREATED',
                'fa-utensils': order.currentStatus === 'COOKED',
                'fa-car-side': order.currentStatus === 'DRIVER_RECEIVED',
                'fa-home': order.currentStatus === 'DELIVERED',
                'fa-times': order.currentStatus === 'CANCELLED'
              }"
            ></i>
            <span>{{ statusMap[order.currentStatus] }}</span>
            <i class="fas fa-angle-down text-sm pl-3 px-2"></i>
          </span>
        </template>
        <ul>
          <li
            v-for="(option, index) in filterOptions"
            :key="index"
            @click="optionSelected(option.value)"
          >
            <a
              href="#"
              class="text-lg block px-4 py-2 hover:bg-indigo-500 hover:text-white"
              >Move to {{ option.text }}</a
            >
          </li>
        </ul>
      </Dropdown>
    </h2>

    <OrderStepper :order="order" class="mt-3" />

    <OrderMap :order="order" class="mt-3 h-64" />
  </div>
</template>

<script>
import Dropdown from "./Dropdown.vue";
import OrderMap from "./OrderMap.vue";
import OrderStepper from "./OrderStepper.vue";

export default {
  components: {
    Dropdown,
    OrderMap,
    OrderStepper
  },
  props: {
    order: {
      type: Object
    }
  },
  data: () => ({
    openDropDown: false,
    statusMap: {
      CREATED: "Cooking Now",
      COOKED: "Cooked",
      DRIVER_RECEIVED: "Driver en route",
      DELIVERED: "Delivered",
      CANCELLED: "Cancelled"
    }
  }),
  computed: {
    filterOptions() {
      return this.$store.state.filters.filter(
        filter => filter.value !== this.order.currentStatus
      );
    }
  },
  methods: {
    optionSelected(selection) {
      this.openDropDown = false;

      this.$store.commit("UPDATE_ORDER_STATUS", {
        orderId: this.order.id,
        newStatus: selection
      });
    }
  }
};
</script>

<style></style>
