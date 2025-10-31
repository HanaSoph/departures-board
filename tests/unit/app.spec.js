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

describe("formattedTime()", () => {
  it("formats a standard time correctly", () => {
    const result = wrapper.vm.formattedTime("2022-08-22T11:15:00");
    expect(result).toBe("11:15");
  });

  it("formats midnight correctly", () => {
    const result = wrapper.vm.formattedTime("2022-08-22T00:00:00");
    expect(result).toBe("00:00");
  });
});

describe("Edit Flight Status Form", () => {
  it("calls handleSubmit on form submit", async () => {
    const updateStatus = jest.fn();
    const wrapper = shallowMount(App, {
      methods: { updateStatus },
    });

    await wrapper.find("form").trigger("submit.prevent");
    expect(updateStatus).toHaveBeenCalled();
  });
});
