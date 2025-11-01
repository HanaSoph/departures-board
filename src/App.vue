<template>
  <div id="app">
    <div class="heading">
      <img src="./assets/plane-take-off.png" />
      <h1>Departures</h1>
    </div>
    <section v-if="errored" class="error">
      <p>We're not able to retrieve this information. Please try again later</p>
    </section>
    <div v-else class="body">
      <div class="loading" v-if="loading">Loading...</div>
      <div v-else>
        <FlightsTable :flight-data="this.flights" />
        <EditForm :flight-data="this.flights" />
      </div>
    </div>
  </div>
</template>

<script>
import { fetchFlights } from "./helpers/flightsApi";
import FlightsTable from "./components/FlightsTable.vue";
import EditForm from "./components/EditForm.vue";

export default {
  name: "App",
  components: {
    FlightsTable,
    EditForm,
  },
  data() {
    return {
      flights: null,
      loading: false,
      errored: false,
    };
  },
  methods: {
    getData() {
      this.loading = true;
      fetchFlights()
        .then((response) => {
          this.flights = response.sort(
            (a, b) =>
              new Date(a.scheduledDepartureDateTime) -
              new Date(b.scheduledDepartureDateTime)
          );
        })
        .catch((error) => {
          console.warn(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss">
#app {
  text-align: left;
  font-weight: 600;
}

.heading {
  width: 100%;
  padding: 5px 5px 5px 40px;
  text-align: left;
  color: #000000;
  background: linear-gradient(
    90deg,
    rgba(237, 201, 83, 1) 0%,
    rgba(225, 186, 58, 1) 100%
  );
  display: flex;
  align-items: center;
  gap: 30px;

  img {
    max-height: 50px;
  }
}

.loading,
.error {
  text-align: center;
  padding: 40px;
}

.body {
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: auto;
  align-items: center;
}
</style>

