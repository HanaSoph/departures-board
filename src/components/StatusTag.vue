<template>
  <div class="status-tag colour">{{ status }}</div>
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
      colour: "",
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
        this.colour = statusColours.yellow;
      } else if (lowerCaseStatus.includes("go to gate")) {
        this.colour = statusColours.blue;
      } else if (lowerCaseStatus.includes("final call")) {
        this.colour = statusColours.red;
      } else if (lowerCaseStatus.includes("departed")) {
        this.colour = statusColours.orange;
      } else {
        this.colour = statusColours.green;
      }
    },
  },
  mounted() {
    this.statusColour(this.status);
  },
  updated() {
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
  min-width: 130px;
}

.colour {
  border-left: solid 10px v-bind(colour);
}
</style>
