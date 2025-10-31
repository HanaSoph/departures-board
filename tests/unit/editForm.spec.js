import { shallowMount } from "@vue/test-utils";
import EditForm from "../../src/components/EditForm.vue";

const wrapper = shallowMount(EditForm);

describe("Edit Flight Status Form", () => {
  it("calls updateStatus on form submit", async () => {
    const updateStatus = jest.fn();
    const wrapper = shallowMount(EditForm, {
      methods: { updateStatus },
    });

    await wrapper.find("form").trigger("submit.prevent");
    expect(updateStatus).toHaveBeenCalled();
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
