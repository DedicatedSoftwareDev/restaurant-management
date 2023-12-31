import { shallowMount, createLocalVue } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Home.vue", () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      orders() {
        return [];
      },
      getOrdersByFilter() {
        return () => {
          return [];
        };
      },
      deliveredOrders() {
        return [];
      }
    };

    store = new Vuex.Store({
      state: {},
      getters
    });
  });

  it("renders title", () => {
    const wrapper = shallowMount(Home, { store, localVue });
    const title = wrapper.find("h1");
    expect(title.text()).toMatch("Restaurant Overview");
  });
});
