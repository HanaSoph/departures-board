import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import { mockFlights } from "../mocks/mockFlights";

jest.mock("../../src/helpers/flightsApi", () => ({
  fetchFlights: jest.fn(async () => mockFlights.allDepartures),
}));

const wrapper = shallowMount(App);

describe("App.vue", () => {
  it("renders successfully", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
