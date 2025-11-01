# Departures Board - Overview

This project implements a flight Departures board based on the [Figma design](https://www.figma.com/file/Kr6pYxQbIdbfD5wG3Mo6QP/Tech-Test-FID?node-id=2%3A2) and populated using data from the [flights API](https://6315ae3e5b85ba9b11e4cb85.mockapi.io/departures/Flightdata).

The app is built as a single page Vue 2 application, fully responsive, with a form to update flight statuses and basic test coverage.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run the unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

## External Packages

- Axios — for API requests: Lightweight and easy to integrate with Vue 2.

- Sass (SCSS) — for CSS pre-processing: Enables nested selectors, variables, and better maintainability.

- Jest + Vue Test Utils — for unit testing: Standard testing stack for Vue 2 projects.

## Features Implemented

### Core Features

- Single Page App using Vue 2 (Options API) and vanilla JavaScript.

- Responsive table:

  - The Departures table scrolls horizontally on smaller screens.

- Table ordering:

  - Sorting is applied immediately on data fetch (App.vue) to keep the API module purely responsible for returning data (despite the data returns ordered by scheduledDepartureTime, I added this sort in to cover in case the data comes back unordered.)

- Edit Flight Status Form:

  - Users can select a flight and update its status (Departed, Diverted, Delayed, Cancelled, or Other (free text)).

- Error Handling:

  - Displays an error message if the API call fails.

- Loading State:

  - Shows “Loading…” while fetching flights.

### Optional Enhancements

- Arrival Country Display:

  - arrivalAirport.countryName is available and could be displayed in the table or used for grouping/sorting in future iterations.

- Loading state:

  - On mounted: to improve this in a future iteration it could be made more attractive e.g. blank rows with pulse animation or a blurred out table.
  - If live data is being used to update the data, we could use WebSockets for real time updates. It would be good to isolate the loading state to the new flight, or for the updated flight only.

- Order and sort:

  - Add sorting to the table columns.

- Status Updates:

  - A modal confirmation for successful or unsuccessful status updates would be an excellent enhancement to give the user feedback after submitting the form.

- Diverted Flights:

  - On data change from the API: check if the destination has been updated. If so, a modal should appear to display the destination change then auto close after a few seconds.
  - On data change from the Update Status form: updating the destination would require adding a field to the Edit Status form to update the arrivalAirport.cityName.
  - In the table, visually highlight changes to destination if a flight is diverted, e.g., showing both original destination crossed out and new destination in bold.

### Next steps and Other Potential Enhancements

#### Table

- Add pagination to the table to minimise scroll and to help with load (if loading per page)
- On small screen, update airline column to use airline.code

#### Edit Status & Form

- Could add an edit button next to each flight, which would reveal the Edit Status form in a modal
- Frontend form validation to display errors

#### Other

- In the data, departure time was sometimes different to the status times - could add a check in for this to display something to let users know their flight is earlier or later then the scheduled departure time
- make components more reusable, e.g. button, form & table - by passing in button wording or form title etc.

### Assumptions I've made

- 'status' wording didn't match the design status wording. I made an assumption which colour should go with each status - in the real world I would have raised this when reviewing the data and design to clarify the colours per status.
- Kept status wording black for improved accessibility - I would have asked if this was okay to do with the appropriate person

