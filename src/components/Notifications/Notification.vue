<template>
  <div>
    <transition
      enter-active-class="transition-all transition-fast ease-out-quad"
      leave-active-class="transition-all transition-slow ease-in-quad"
      enter-class="opacity-0 scale-70"
      enter-to-class="opacity-100 scale-100"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-70"
      appear
    >
      <template v-if="showNotification">
        <!-- EVENT NOTIFICATION -->
        <div
          class="card relative cursor-pointer"
          v-if="notification.sent_at_second"
          @click="onClickNotification"
        >
          <div
            class="flex items-center justify-center"
            v-if="notification.currentStatus"
          >
            <span
              class="flex rounded-full text-white uppercase text-xs w-8 h-8 flex items-center justify-center"
              :class="{
                'bg-red-500': notification.currentStatus === 'CREATED',
                'bg-indigo-500': notification.currentStatus === 'COOKED',
                'bg-orange-500':
                  notification.currentStatus === 'DRIVER_RECEIVED',
                'bg-green-500': notification.currentStatus === 'DELIVERED',
                'bg-gray-500': notification.currentStatus === 'CANCELLED'
              }"
              ><i
                class="fas"
                :class="{
                  'fa-receipt': notification.currentStatus === 'CREATED',
                  'fa-utensils': notification.currentStatus === 'COOKED',
                  'fa-car-side':
                    notification.currentStatus === 'DRIVER_RECEIVED',
                  'fa-home': notification.currentStatus === 'DELIVERED',
                  'fa-times': notification.currentStatus === 'CANCELLED'
                }"
              ></i>
            </span>
          </div>
          <div class="ml-6 pt-1">
            <h4 class="text-xl text-gray-900 leading-tight">
              {{ notification.name }}
            </h4>
            <p class="text-base text-gray-600 leading-normal">
              {{ status[notification.currentStatus] }}
            </p>
          </div>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <i
              class="fas fa-times text-lg text-red-500"
              @click="onClickNotification"
            ></i>
          </span>
        </div>
        <!-- OTHER NOTIFICATION -->
        <div class="card relative" v-else>
          <div class="ml-6 pt-1">
            <h4 class="text-xl text-gray-900 leading-tight">
              {{ notification.message }}
            </h4>
            <p class="text-base text-gray-600 leading-normal">
              {{ notification.subtext }}
            </p>
          </div>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <i
              class="fas fa-times text-lg text-red-500"
              @click="onClickNotification"
            ></i>
          </span>
        </div>
      </template>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    status: {
      CREATED: "Cooking Now",
      COOKED: "Order cooked",
      DRIVER_RECEIVED: "Driver en route",
      DELIVERED: "Order delivered",
      CANCELLED: "Order cancelled"
    }
  }),
  computed: {
    showNotification() {
      return this.notification.showNotification;
    }
  },
  methods: {
    onClickNotification(event) {
      if (event.target.tagName.toLowerCase() === "i") {
        this.$store.commit("HIDE_NOTIFICATION", this.notification.id);
      } else {
        this.$router.push(`/orders/${this.notification.id}`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  @apply max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl;
  margin: 10px;
}
</style>
