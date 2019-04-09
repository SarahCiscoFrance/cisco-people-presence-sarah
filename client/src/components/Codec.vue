<template>
  <div class="container flex-grow direction-column" v-if="codec">
    <div class="container">
      <div
        class="container-half codec-details"
        :class="[codec.peoplePresence === 'Yes' || codec.peopleCount > 0 ? 'codec-details-red' : 'codec-details-green']"
      >
        <h1>{{ codec.name }}</h1>
        <h2>
          <i
            class="fas"
            :class="[codec.peoplePresence === 'Yes' || codec.peopleCount > 0 ? 'fa-door-closed' : 'fa-door-open']"
          ></i>
          {{ codec.peoplePresence === 'Yes' || codec.peopleCount > 0 ? "Busy" : "Free" }}
        </h2>
        <h2>
          <i class="fas fa-users"></i>
          {{ codec.peopleCount > 0 ? codec.peopleCount : 0 }}
        </h2>
        <h2>
          <i class="fas fa-volume-up"></i>
          {{ codec.ambientNoise }} dBA
        </h2>
      </div>
      <div class="container-half default-bg date-container">
        <h1>Click on the input to choose a date for the graphs</h1>
        <datepicker
          class="date-picker"
          :input-class="inputDatePickerStyle"
          :calendar-class="calendarDatePickerStyle"
          :value="date"
          :format="formatDate"
          @selected="daySelected"
        ></datepicker>
      </div>
    </div>
    <div class="container flex-grow">
      <div class="container-half">
        <div class="subcontainer chart-container default-bg flex-grow">
          <people-per-hour-chart
            :styles="chartStyle"
            :peopleCountDayHistory="peopleCountDayHistory"
          />
        </div>
      </div>
      <div class="container-half">
        <div class="subcontainer chart-container default-bg flex-grow">
          <people-per-day-chart
            :styles="chartStyle"
            :peopleCountWeekHistory="peopleCountWeekHistory"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PeoplePerHourChart from "./charts/PeoplePerHourChart";
import PeoplePerDayChart from "./charts/PeoplePerDayChart";
import Datepicker from "vuejs-datepicker";
import moment from "moment";

export default {
  data() {
    return {
      chartStyle: {
        height: "100%",
        position: "relative"
      },
      inputDatePickerStyle: ["date-picker-input"],
      calendarDatePickerStyle: ["date-picker-calendar"],
      date: moment()
        .startOf("day")
        .toDate(),
      formatDate: "dd MMMM yyyy",
      history: []
    };
  },
  components: {
    PeoplePerHourChart,
    PeoplePerDayChart,
    Datepicker
  },
  name: "Codec",
  props: ["mac"],
  computed: {
    codec() {
      return this.$store.getters.codec(this.mac);
    },
    peopleCountDayHistory() {
      if (this.history.length > 0) {
        return this.history.filter(element => {
          const dateElementIsValid = moment(element.date).isSame(
            this.date,
            "day"
          );
          return element.name === "PeopleCount" && dateElementIsValid;
        });
      } else {
        return [];
      }
    },
    peopleCountWeekHistory() {
      if (this.history.length > 0) {
        return this.history.filter(element => {
          const dateElementIsValid = moment(element.date).isSame(
            this.date,
            "week"
          );
          return element.name === "PeopleCount" && dateElementIsValid;
        });
      } else {
        return [];
      }
    }
  },
  methods: {
    daySelected(date) {
      this.date = date;
    }
  },
  mounted() {
    const data = {
      codecMacAddress: this.mac,
      startDate: moment
        .utc(this.date)
        .startOf("week")
        .toDate(),
      endDate: moment
        .utc(this.date)
        .endOf("week")
        .toDate()
    };

    this.$store.dispatch("getCodecHistory", data).then(response => {
      this.history = response.data.history;
    });
  }
};
</script>

<style>
.container {
  display: flex;
}

.container-half {
  display: flex;
  flex-basis: 50%;

  margin: 0.75rem;

  padding: 0.75rem;

  border-radius: 1rem;
  background-color: white;
}

.codec-details {
  display: flex;
  align-items: center;

  justify-content: space-between;

  font-size: 1.4rem;

  padding: 1.5rem 3rem;

  transition: all 0.3s ease-in;
}

.codec-details-red {
  background-color: #f5473e;

  transform: scale(1.005);

  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
}

.codec-details-green {
  background-color: #43a942;
}

.subcontainer {
  border-radius: 1rem;

  margin: 0.75rem;
}

.date-container {
  background-image: linear-gradient(to right, #097dbc, #049fd9);
  background-size: cover;
  background-repeat: no-repeat;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.5rem 3rem;

  position: relative;
}

.date-picker {
  color: black;
  font-size: 1.4rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.date-picker-calendar {
  border-radius: 1rem;

  margin-top: 0.5rem;

  position: absolute;
  right: 0;

  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
}

.date-picker-input {
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;

  padding: 1rem;

  border: 0;
  border-radius: 1rem;

  outline: none;

  background-color: white;

  cursor: pointer;

  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
}

.vdp-datepicker__calendar .cell.selected {
  background-color: #049fd9;
  color: white;
}

.vdp-datepicker__calendar .cell.selected:hover {
  background-color: #097dbc;
}

.vdp-datepicker__calendar header .prev {
  border-top-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.vdp-datepicker__calendar header .next {
  border-top-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
}

.vdp-datepicker__calendar header .day__month_btn,
.vdp-datepicker__calendar header .month__year_btn {
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year {
  border-radius: 1rem;
}

.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
  border: 1px solid #097dbc;
}

.default-bg {
  background-color: white;
}

.flex-grow {
  flex: 1;
}

.direction-column {
  flex-direction: column;
}

.fas {
  margin-right: 0.5rem;
}
</style>
