<template>
  <div
    class="notifications-container transition-all transition-medium z-50"
    style="z-index: 99;"
    v-click-outside="closeNotifications"
    :class="{ hide: !showNotifications }"
  >
    <div class="actions flex justify-between items-center">
      <span
        @click="showNotifications = true"
        class="ml-2 cursor-pointer visible"
        :class="{ invisible: showNotifications }"
        ><i class="fas fa-chevron-left"></i
      ></span>
      <span class="text-gray-700 ml-6">
        <span
          @click="$store.commit('TOGGLE_SHOW_ALL_EVENTS')"
          class="cursor-pointer"
          ><i
            class="far"
            :class="{
              'fa-square': $store.state.showAllEvents,
              'fa-check-square': !$store.state.showAllEvents
            }"
          ></i>
          All orders</span
        >
        <span
          @click="$store.commit('TOGGLE_SHOW_ALL_EVENTS')"
          class="ml-3 cursor-pointer"
          ><i
            class="far"
            :class="{
              'fa-square': !$store.state.showAllEvents,
              'fa-check-square': $store.state.showAllEvents
            }"
          ></i>
          New orders only</span
        >
      </span>
      <span
        @click="showNotifications = false"
        class="mr-3 cursor-pointer visible"
        :class="{ invisible: !showNotifications }"
        ><i class="fas fa-chevron-right"></i
      ></span>
    </div>
    <div class="notifications overflow-auto">
      <div v-for="(notification, index) in notifications" :key="index">
        <Notification :notification="notification" />
      </div>
    </div>
  </div>
</template>

<script>
import Notification from "./Notification.vue";

export default {
  components: {
    Notification
  },
  data: () => ({
    showNotifications: true
  }),
  computed: {
    notifications() {
      if (this.$store.state.showAllEvents) {
        return this.$store.getters.orders.filter(
          order => order.currentStatus === "CREATED"
        );
      }

      return this.$store.getters.orders;
    }
  },
  created() {
    // setTimeout(() => {
    //   this.showNotifications = false;
    // }, 5000);
  },
  methods: {
    closeNotifications() {
      if (this.showNotifications) {
        this.showNotifications = false;
      }
    }
  }
};
</script>

<style lang="scss">
.notifications-container {
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  background: rgba(0, 0, 0, 0.15);

  &.hide {
    transform: translateX(100%);
  }

  .actions {
    height: 35px;
    margin-left: -35px;
  }

  .notifications {
    height: calc(100vh - 35px);
  }
}
</style>
