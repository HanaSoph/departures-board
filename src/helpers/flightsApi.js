import axios from "axios";

export const fetchFlights = async () => {
  return await axios
    .get("https://6315ae3e5b85ba9b11e4cb85.mockapi.io/departures/Flightdata")
    .then((response) => {
      return response.data.allDepartures;
    });
};
