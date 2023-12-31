import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isConnected: false,
    orders: [],
    showAllEvents: false,
    filters: [
      { text: "Cooking Now", value: "CREATED" },
      { text: "Cooked", value: "COOKED" },
      { text: "Driver en route", value: "DRIVER_RECEIVED" },
      { text: "Delivered", value: "DELIVERED" },
      { text: "Cancelled", value: "CANCELLED" }
    ],
    topSellers: {},
    slowItems: {}
  },
  mutations: {
    SOCKET_connect(state) {
      state.isConnected = Date.now();

      state.orders.push({
        message: "Connected",
        subtext: "Simulation started",
        id: Date.now(),
        showNotification: true
      });
    },

    SOCKET_disconnect(state) {
      state.isConnected = false;
    },

    SOCKET_new_event(state, message) {
      const newEvent = JSON.parse(message);
      const eventsCopy = state.orders.slice();
      let existingEvent = _.find(eventsCopy, { id: newEvent.id });

      // CREATE NEW EVENT
      // only show notifications for new orders
      if (newEvent.event_name === "CREATED") {
        newEvent.showNotification = true;
      } else {
        newEvent.showNotification = false;
      }

      // UPDATE EXISTING EVENT
      if (existingEvent) {
        const { event_name } = newEvent;
        Vue.set(existingEvent, "currentStatus", event_name);
        Vue.set(existingEvent.events, event_name, newEvent);

        Vue.set(state, "orders", eventsCopy);
      } else {
        // NEW EVENT
        eventsCopy.push({
          ...newEvent,
          events: {}, // for maximum customer order edit-ability, we'll store all future events in an events property
          currentStatus: "CREATED"
        });

        if (eventsCopy[0].events) {
          // add the CREATED event into events object as well
          eventsCopy[0].events["CREATED"] = newEvent;
        }

        Vue.set(state, "orders", eventsCopy);
      }

      // collect meta data
      const { name } = newEvent;
      const words = name.split(" ");

      words.forEach(word => {
        word = word.toLowerCase();

        if (!state.topSellers[word]) {
          state.topSellers[word] = 1;
          Vue.set(state.topSellers, word, 1);
        } else {
          const newCount = (state.topSellers[word] += 1);
          Vue.set(state.topSellers, word, newCount);
        }
      });
    },

    HIDE_NOTIFICATION(state, id) {
      const notifications = _.filter(state.orders, { id });
      notifications.forEach(notification => {
        notification.showNotification = false;
      });
    },

    UPDATE_ORDER_STATUS(state, { orderId, newStatus }) {
      const existingEvent = _.find(state.orders, { id: orderId });

      Vue.set(existingEvent, "currentStatus", newStatus);
      // add event to order events with sent_at_second calculation
      Vue.set(existingEvent.events, newStatus, {
        event_name: "DELIVERED",
        sent_at_second: (state.isConnected - Date.now()) / 1000
      });
    },

    TOGGLE_SHOW_ALL_EVENTS(state) {
      state.showAllEvents = !state.showAllEvents;
    }
  },
  getters: {
    orders: ({ orders }) => orders,
    getOrdersByFilter: state => filter => {
      return state.orders.filter(order => order.currentStatus === filter);
    },
    topSellers: ({ topSellers }) => topSellers,
    deliveredOrders: ({ orders }) => {
      return orders.filter(order => order.currentStatus === "DELIVERED");
    }
  }
});
