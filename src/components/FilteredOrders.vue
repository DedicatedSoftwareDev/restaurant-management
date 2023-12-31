<template>
  <div>
    <!-- HEADER -->
    <div class="flex justify-between mb-5">
      <h1 class="font-bold text-xl mb-2">Orders</h1>
      <Dropdown
        :open="openDropDown"
        @close="openDropDown = false"
        @open="openDropDown = true"
      >
        <template v-slot:title>
          <button
            v-if="sentWithin"
            @click="sentWithin = null"
            class="bg-red-500 hover:bg-red-600 text-xs text-white font-bold py-1 px-2 mr-8 rounded-full"
          >
            <span>sent within {{ sentWithin }} seconds</span>
            <i class="fas fa-times ml-3"></i>
          </button>
          <p class="text-gray-600 text-sm mr-8">
            count: {{ filteredOrders.length }}
          </p>
          <p id="current-status">
            {{ statusMap[currentFilter] }}
          </p>
          <i class="fas fa-angle-down text-sm pl-3 px-2"></i>
        </template>
        <div>
          <div class="px-4 py-2">
            <span class="text-gray-700">Sent within (seconds)</span>
            <div>
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="number"
                v-model.number="sentWithin"
                placeholder="seconds"
                @keyup.enter="openDropDown = false"
              />
            </div>
          </div>
          <ul>
            <li
              v-for="(option, index) in $store.state.filters"
              :key="index"
              @click="optionSelected(option.value)"
            >
              <a
                href="#"
                class="text-lg block px-4 py-2 hover:bg-indigo-500 hover:text-white"
                >Filter by {{ option.text }}</a
              >
            </li>
          </ul>
        </div>
      </Dropdown>
    </div>

    <!-- ORDERS -->
    <div v-if="filteredOrders.length" class="orders-container overflow-auto">
      <div class="flex">
        <div class="flex-1 text-center bg-gray-400 h-12 font-bold">
          Order name
        </div>
        <div class="flex-1 text-center bg-gray-400 h-12 font-bold">
          Order status
        </div>
        <div class="flex-1 text-center bg-gray-400 h-12 font-bold">
          Destination
        </div>
        <div class="flex-1 text-center bg-gray-400 h-12 font-bold">
          Order created at
        </div>
      </div>
      <div
        class="flex cursor-pointer md:hover:text-blue-700"
        v-for="(order, index) in filteredOrders"
        :key="index"
        @click="
          openModal = true;
          selectedOrder = order;
        "
      >
        <div class="flex-1 text-center bg-gray-400 h-12">{{ order.name }}</div>
        <div class="flex-1 text-center bg-gray-400 h-12">
          {{ order.currentStatus }}
        </div>
        <div class="flex-1 text-center bg-gray-400 h-12">
          {{ order.destination }}
        </div>
        <div class="flex-1 text-center bg-gray-400 h-12">
          {{ order.sent_at_second }} seconds
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center" v-else>
      <EmptyState text="No orders for this filter" class="w-1/2" />
    </div>

    <Modal v-if="openModal" :open="openModal" @close="openModal = false">
      <div
        class="bg-white rounded-lg shadow-2xl px-6 py-6"
        style="width: 50vw;"
      >
        <OrderDetail :order="selectedOrder" />

        <div class="mt-6 flex justify-end">
          <button
            @click="openModal = false"
            class="p-4 py-2 text-gray-800 font-semibold bg-white hover:bg-gray-100 border rounded focus:outline-none focus:shadow-outline"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Dropdown from "./Dropdown.vue";
import EmptyState from "../icons/EmptyState.vue";
import Modal from "./Modal.vue";
import OrderDetail from "./OrderDetail.vue";

export default {
  components: {
    Dropdown,
    EmptyState,
    Modal,
    OrderDetail
  },
  data() {
    return {
      sentWithin: null,
      openDropDown: false,
      currentFilter: this.filter || "CREATED",
      openModal: false,
      selectedOrder: null,
      statusMap: {
        CREATED: "Cooking Now",
        COOKED: "Cooked Orders",
        DRIVER_RECEIVED: "Driver En Route",
        DELIVERED: "Delivered Orders",
        CANCELLED: "Cancelled Orders"
      }
    };
  },
  computed: {
    filteredOrders() {
      if (!this.currentFilter) {
        return this.$store.getters.orders.filter(event => event.currentStatus);
      }

      // pass through two filters:
      // 1. status event_name filter
      // 2. sent_at_second filter

      let orders = this.$store.getters.getOrdersByFilter(this.currentFilter);

      if (this.sentWithin) {
        let event_name = this.currentFilter;
        let sentWithin = this.sentWithin;

        orders = orders.filter(order => {
          if (!order.events[event_name]) {
            return true;
          }

          // PERFORMANCE WIN: because events is an Object and not an Array, we get O(1) access to to the exact event
          const eventSentAt = order.events[event_name].sent_at_second;

          return eventSentAt <= sentWithin;
        });
      }

      return orders;
    }
  },
  methods: {
    optionSelected(value) {
      this.openDropDown = false;
      this.currentFilter = value;
    }
  },
  props: {
    filter: {
      type: String
    }
  },
  watch: {
    filter(newVal) {
      this.currentFilter = newVal;
    }
  }
};
</script>

<style scoped>
.orders-container {
  height: 300px;
}
</style>
