<template>
  <div>
    <Empty1 ref="empty1" v-if="randomIndex === 1"></Empty1>
    <Empty2 ref="empty2" v-if="randomIndex === 2"></Empty2>
    <Empty3 ref="empty3" v-if="randomIndex === 3"></Empty3>
    <Empty4 ref="empty4" v-if="randomIndex === 4"></Empty4>
    <p class="text-center text-gray-700 py-3">{{ text }}</p>
  </div>
</template>

<script>
import Empty1 from "./Empty1.vue";
import Empty2 from "./Empty2.vue";
import Empty3 from "./Empty3.vue";
import Empty4 from "./Empty4.vue";

export default {
  components: {
    Empty1,
    Empty2,
    Empty3,
    Empty4
  },
  data: () => ({
    randomIndex: Math.ceil(Math.random() * 4)
  }),
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<style></style>
