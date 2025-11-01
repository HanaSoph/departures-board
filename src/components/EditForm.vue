<template>
  <section class="form-section">
    <div class="form-card">
      <h2>Edit Flight Status</h2>
      <form
        v-on:submit.prevent="updateStatus(selectedFlightNumber, selectedStatus)"
      >
        <div class="form-group">
          <div class="form-fields-group">
            <div class="form-field">
              <label for="flight-select">Select flight:</label>
              <select
                name="flight"
                id="flight-select"
                v-model="selectedFlightNumber"
              >
                <option disabled value="">Select a flight</option>
                <option
                  v-for="flight in flightData"
                  :key="flight.flightNumber"
                  :value="flight.flightNumber"
                >
                  {{ formattedTime(flight.scheduledDepartureDateTime) }} -
                  {{ flight.arrivalAirport.cityName }} ({{
                    flight.flightNumber
                  }})
                </option>
              </select>
            </div>

            <div class="form-field">
              <label for="status-select">Flight status:</label>
              <select name="status" id="status-select" v-model="selectedStatus">
                <option disabled value="">Select a new status</option>
                <option value="Departed">Departed</option>
                <option value="Diverted">Diverted</option>
                <option value="Delayed">Delayed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="form-field" v-if="selectedStatus === 'Other'">
              <label for="new-status">Other status:</label>
              <input
                id="new-status"
                type="text"
                v-model="otherText"
                placeholder="e.g. Rescheduled"
              />
            </div>
          </div>
          <button
            :disabled="
              !selectedStatus ||
              !selectedFlightNumber ||
              (selectedStatus === 'Other' && !otherText)
            "
            type="submit"
            class="submit"
          >
            Update Status
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import formattedTime from "../helpers/timeHelper";

export default {
  name: "EditForm",
  props: {
    flightData: Array,
  },
  data() {
    return {
      selectedFlightNumber: "",
      selectedStatus: "",
      otherText: "",
    };
  },
  methods: {
    formattedTime,
    updateStatus(selectedFlightNumber, selectedStatus) {
      const flight = this.flightData.find(
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
};
</script>

<style scoped lang="scss">
label {
  padding-right: 5px;
}

select {
  margin-right: 10px;
}

input[type="text"],
input[type="number"],
input[type="email"],
select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px 12px;
  line-height: 1.4;
  color: #333;
  box-sizing: border-box;
  height: 38px;
}

input:focus,
select:focus {
  outline: none;
  border-color: #007bff;
}

select {
  background-image: url("data:image/svg+xml;utf8,<svg fill='%23333' height='12' viewBox='0 0 24 24' width='12' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
  padding-right: 32px;
}

button {
  background-color: #fbcf42;
  color: #000;
  border: none;
  border-radius: 6px;
  padding: 10px 18px;
  letter-spacing: 0.5px;
  cursor: pointer;
}

button:hover {
  background-color: #ffd633;
}

button:focus {
  outline-color: #007bff;
}

button:active {
  background-color: #dfb81e;
}

button:disabled {
  background-color: #e6d57e;
  color: #7c7c7c;
  cursor: not-allowed;
  box-shadow: none;
}

.form-section {
  margin-bottom: 70px;
  width: 100%;
  padding: 16px;

  .form-card {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: auto;
    padding: 30px 45px;
    background: #fff;
    border-radius: 10px;
    color: #000;
    box-sizing: border-box;

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
        flex-wrap: wrap;

        @media (max-width: 400px) {
          flex-direction: column;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      }
    }

    .submit {
      align-self: flex-end;
    }
  }
}
</style>
