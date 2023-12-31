<template>
  <div
    id="app"
    class="antialiased text-gray-900 flex flex-col min-h-screen bg-gray-200"
  >
    <router-view />

    <portal-target name="modals"></portal-target>

    <Notifications></Notifications>
  </div>
</template>

<script>
import Notifications from "./components/Notifications/Notifications.vue";

export default {
  components: {
    Notifications
  }
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.origin-top-right {
  transform-origin: top right;
}
.transition-all {
  transition-property: all;
}
.transition-fastest {
  transition-duration: 50ms;
}
.transition-faster {
  transition-duration: 100ms;
}
.transition-fast {
  transition-duration: 150ms;
}
.transition-medium {
  transition-duration: 200ms;
}
.transition-slow {
  transition-duration: 300ms;
}
.ease-out-quad {
  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.ease-in-quad {
  transition-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
}
.scale-70 {
  transform: scale(0.7);
}
.scale-100 {
  transform: scale(1);
}
</style>
