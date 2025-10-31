<template>
  <div class="status-tag color">{{ status }}</div>
</template>

<script>
import { statusColours } from "@/constants/statusColours";

export default {
  name: "StatusTag",
  props: {
    status: String,
  },
  data() {
    return {
      color: "green",
    };
  },
  methods: {
    statusColour(status) {
      const lowerCaseStatus = status.toLowerCase();
      if (
        ["scheduled", "departing", "wait in lounge"].some((keyword) =>
          lowerCaseStatus.includes(keyword)
        )
      ) {
        this.color = statusColours.yellow;
      } else if (lowerCaseStatus.includes("go to gate")) {
        this.color = statusColours.blue;
      } else if (lowerCaseStatus.includes("final call")) {
        this.color = statusColours.red;
      } else if (lowerCaseStatus.includes("departed")) {
        this.color = statusColours.orange;
      } else {
        this.color = statusColours.green;
      }
    },
  },
  mounted() {
    this.statusColour(this.status);
  },
};
</script>

<style scoped lang="scss">
.status-tag {
  background-color: #fff;
  color: #000;
  border-radius: 5px 30px 30px 5px;
  border-left: solid 10px #0070ee;
  padding: 10px 20px 10px 10px;
  width: max-content;
}

.color {
  border-left: solid 10px v-bind(color);
}
</style>
