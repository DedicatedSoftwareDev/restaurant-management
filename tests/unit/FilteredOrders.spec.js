import { shallowMount, createLocalVue } from "@vue/test-utils";
import FilteredOrders from "@/components/FilteredOrders.vue";
import DropDown from "@/components/DropDown.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("FilteredOrders.vue", () => {
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
      }
    };

    store = new Vuex.Store({
      state: {},
      getters
    });
  });

  it("renders title", () => {
    const wrapper = shallowMount(FilteredOrders, { store, localVue });
    const title = wrapper.find("h1");
    expect(title.text()).toMatch("Orders");
  });

  it("renders Dropdown when user clicks on filter options", () => {
    const wrapper = shallowMount(FilteredOrders, { store, localVue });
    wrapper.find("#current-status").trigger("click");
    expect(wrapper.findAll(DropDown).length).toEqual(1);
  });
});
