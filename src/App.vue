<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <section v-if="errored">
      <p>
        Woops! We're not able to retrieve this information. Please try again
        later
      </p>
    </section>
    <section v-else>
      <div v-if="loading">Loading...</div>
      <div v-else>
        {{ flights }}

        <section>
          <h2>Edit Flight Status</h2>
          <form>
            <label>Select flight:</label>
            <select name="flight" id="flight">
              <option v-for="flight in flights" :key="flight.flightNumber">
                {{ formattedTime(flight.scheduledDepartureDateTime) }} -
                {{ flight.arrivalAirport.cityName }}
              </option>
            </select>
            <label for="flight-status">Flight status:</label>
            <select name="status" id="flight-status" v-model="selectedOption">
              <option value="">Select a status</option>
              <option value="departed">Departed</option>
              <option value="diverted">Diverted</option>
              <option value="delayed">Delayed</option>
              <option value="cancelled">Cancelled</option>
              <option value="other">Other</option>
            </select>
            <div v-if="selectedOption === 'other'">
              <input
                type="text"
                v-model="otherText"
                placeholder="e.g. Rescheduled"
              />
            </div>
            <button>Update Status</button>
          </form>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "App",
  // components: {
  //   HelloWorld,
  // },
  data() {
    return {
      flights: null,
      loading: true,
      errored: false,
      selectedOption: "",
    };
  },
  methods: {
    formattedTime(dateTime) {
      return dateTime.slice(11, 16);
    },
  },
  computed: {},
  mounted() {
    axios
      .get("https://6315ae3e5b85ba9b11e4cb85.mockapi.io/departures/Flightdata")
      .then((response) => {
        this.flights = response.data.allDepartures;
        console.log(this.flights);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
