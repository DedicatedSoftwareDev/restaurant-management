<template>
  <div class="flex items-center justify-center z-10">
    <div class="relative">
      <div v-if="open" @click="$emit('close')" class="fixed inset-0"></div>
      <button
        @click="toggleOpen"
        class="relative flex items-center focus:outline-none"
      >
        <slot name="title"></slot>
      </button>
      <transition
        enter-active-class="transition-all transition-fastest ease-out-quad"
        leave-active-class="transition-all transition-faster ease-in-quad"
        enter-class="opacity-0 scale-70"
        enter-to-class="opacity-100 scale-100"
        leave-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-70"
      >
        <div
          v-if="open"
          class="origin-top-right absolute right-0 mt-2 w-64 bg-white rounded-lg border shadow-md py-2"
        >
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: ["open"],
  methods: {
    toggleOpen() {
      if (this.open) {
        this.$emit("close");
      } else {
        this.$emit("open");
      }
    }
  }
};
</script>
