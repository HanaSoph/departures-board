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
    <div v-else class="page-group">
      <section>
        <div v-if="loading">Loading...</div>

        <table v-else>
          <caption>
            <h1>Departures</h1>
          </caption>
          <thead>
            <tr>
              <th scope="col">Departure Time</th>
              <th scope="col">City Name</th>
              <th scope="col">Code</th>
              <th scope="col">Airline</th>
              <th scope="col">Gate</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody v-for="flight in flights" :key="flight.flightNumber">
            <tr>
              <td>{{ formattedTime(flight.scheduledDepartureDateTime) }}</td>
              <td class="yellow-text">
                {{ flight.arrivalAirport.cityName }}
              </td>
              <td>{{ flight.arrivalAirport.code }}</td>
              <td>{{ flight.airline.name }}</td>
              <td class="yellow-text">
                {{
                  flight.departureGate?.number
                    ? flight.departureGate.number
                    : "-"
                }}
              </td>
              <td>{{ flight.status }}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section class="form-section">
        <h2>Edit Flight Status</h2>
        <form
          v-on:submit.prevent="
            updateStatus(selectedFlightNumber, selectedStatus)
          "
        >
          <div class="form-group">
            <div class="form-fields-group">
              <label for="flight-select">Select flight:</label>
              <select
                name="flight"
                id="flight-select"
                v-model="selectedFlightNumber"
              >
                <option disabled value="">Select a flight</option>
                <option
                  v-for="flight in flights"
                  :key="flight.flightNumber"
                  :value="flight.flightNumber"
                >
                  {{ formattedTime(flight.scheduledDepartureDateTime) }} -
                  {{ flight.arrivalAirport.cityName }} ({{
                    flight.flightNumber
                  }})
                </option>
              </select>

              <label for="status-select">Flight status:</label>
              <select name="status" id="status-select" v-model="selectedStatus">
                <option disabled value="">Select a new status</option>
                <option value="Departed">Departed</option>
                <option value="Diverted">Diverted</option>
                <option value="Delayed">Delayed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Other">Other</option>
              </select>

              <input
                v-if="selectedStatus === 'Other'"
                id="new-status"
                type="text"
                v-model="otherText"
                placeholder="e.g. Rescheduled"
              />
            </div>
            <button
              :disabled="!selectedStatus || !selectedFlightNumber"
              type="submit"
              class="submit"
            >
              Update Status
            </button>
          </div>
        </form>
      </section>
    </div>
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
      loading: false,
      errored: false,
      selectedFlightNumber: "",
      selectedStatus: "",
      otherText: "",
    };
  },
  methods: {
    fetchFlights() {
      this.loading = true;
      axios
        .get(
          "https://6315ae3e5b85ba9b11e4cb85.mockapi.io/departures/Flightdata"
        )
        .then((response) => {
          this.flights = response.data.allDepartures.slice(0, 10);
          console.log(this.flights);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    formattedTime(dateTime) {
      const date = new Date(dateTime);
      // const time = date.toTimeString().slice(0, 5);
      const time = `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
      return time;
    },
    updateStatus(selectedFlightNumber, selectedStatus) {
      console.log("flights:", this.flights);
      const flight = this.flights.find(
        (f) => f.flightNumber === selectedFlightNumber
      );

      if (flight) {
        if (selectedStatus === "Other") {
          flight.status = this.otherText;
        } else {
          flight.status = selectedStatus;
        }
        this.otherText = "";
        this.selectedFlightNumber = "";
        this.selectedStatus = "";
      } else {
        console.warn("Flight not found", this.selectedFlightNumber);
      }
    },
  },
  watch: {
    // selectedStatus(val) {
    //   console.log("selected status changed:", val);
    // },
    // selectedFlightNumber(val) {
    //   console.log("selectedFlightNumber changed:", val);
    // },
  },
  mounted() {
    this.fetchFlights();
  },
};
</script>

<style lang="scss">
#app {
  text-align: left;
  // font-weight: 600;
  background: linear-gradient(
    90deg,
    rgba(60, 60, 60, 1) 0%,
    rgba(0, 0, 0, 1) 100%
  );
}

table {
  border-collapse: separate;
  border-spacing: 0px 16px;
  overflow: hidden;
  width: 100%;
  table-layout: fixed;
}

caption {
  padding: 5px;
  text-align: left;
  color: #000000;
  background: linear-gradient(
    90deg,
    rgba(237, 201, 83, 1) 0%,
    rgba(225, 186, 58, 1) 100%
  );
}

th {
  padding: 15px;
  text-align: left;
  width: auto;
}

td {
  padding: 25px 20px;
  width: auto;
}

thead {
  color: #000000;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(162, 180, 194, 1) 100%
  );

  th:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  th:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}

tbody {
  background: none;
  color: white;

  td {
    border-top: #acacac solid 2px;
    border-bottom: #acacac solid 2px;
  }

  td:first-child {
    border-left: #acacac solid 2px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  td:last-child {
    border-right: #acacac solid 2px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}

label {
  padding-right: 5px;
}

select {
  margin-right: 10px;
}

.page-group {
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: auto;
  align-items: center;
}

.yellow-text {
  color: #fbcf42;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: auto;
  padding: 30px 45px;
  background: #fff;
  border-radius: 10px;
  color: #000;
  box-sizing: border-box;
  margin-bottom: 20px;

  h2 {
    margin: 0;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 30px;

    .form-fields-group {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      flex-direction: row;
    }
  }

  .submit {
    align-self: flex-end;
  }
}
</style>
