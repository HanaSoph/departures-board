import { shallowMount } from "@vue/test-utils";
import StatusTag from "@/components/StatusTag.vue";

describe("StatusTag.vue", () => {
  it("renders props.status when passed", () => {
    const status = "New status";
    const wrapper = shallowMount(StatusTag, {
      propsData: { status },
    });
    expect(wrapper.text()).toMatch(status);
  });
});

