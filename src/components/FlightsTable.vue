<template>
  <section class="table-group">
    <table>
      <caption hidden>
        Departures Board
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
      <tbody v-for="flight in flightData" :key="flight.flightNumber">
        <tr>
          <td>{{ formattedTime(flight.scheduledDepartureDateTime) }}</td>
          <td class="yellow-text">
            {{ flight.arrivalAirport.cityName }}
          </td>
          <td>{{ flight.arrivalAirport.code }}</td>
          <td>{{ flight.airline.name }}</td>
          <td class="yellow-text">
            {{
              flight.departureGate && flight.departureGate.number
                ? flight.departureGate.number
                : "-"
            }}
          </td>
          <td><StatusTag :status="flight.status" /></td>
        </tr>
      </tbody>
    </table>
    <EditForm :flight-data="flightData" />
  </section>
</template>

<script>
import formattedTime from "@/helpers/timeHelper";
import StatusTag from "./StatusTag.vue";
import EditForm from "./EditForm.vue";

export default {
  name: "FlightsTable",
  components: {
    StatusTag,
    EditForm,
  },
  props: {
    flightData: Object,
  },
  methods: {
    formattedTime,
  },
};
</script>

<styles scoped lang="scss">
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

.table-group {
  overflow-y: hidden;
  overflow-x: auto;
  width: 100%;

  table {
    border-collapse: separate;
    border-spacing: 0px 16px;
    padding: 0px 16px;
    width: 100%;
    min-width: 500px;
  }
}

.yellow-text {
  color: #fbcf42;
}
</styles>
