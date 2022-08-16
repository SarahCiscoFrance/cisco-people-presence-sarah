<template>
  <div
    class="container flex-grow direction-column position-relative"
    v-if="codec"
  >
    <transition
      name="fade"
      appear
    >
      <div
        v-if="loading"
        class="loading-bg"
      >
        <svg
          class="logo"
          x="0px"
          y="0px"
          width="200.1px"
          height="105.4px"
          viewBox="-305 291.9 200.1 105.4"
        >
          <g class="logo__mark">
            <path d="M-296.2,324.6c0-2.4-2-4.3-4.4-4.3s-4.4,1.9-4.4,4.3v9.1c0,2.4,2,4.4,4.4,4.4s4.4-1.9,4.4-4.4V324.6z" />
            <path
              transform="translate(97.7633,748.5409)"
              d="M-370.1-435.9c0-2.4-2-4.3-4.4-4.3c-2.4,0-4.4,1.9-4.4,4.3v21.1c0,2.4,2,4.3,4.4,4.3c2.4,0,4.4-1.9,4.4-4.3V-435.9z"
            />
            <path
              transform="translate(106.3727,754.4384)"
              d="M-354.8-458.2c0-2.4-2-4.3-4.4-4.3s-4.4,1.9-4.4,4.3v46.1c0,2.4,2,4.4,4.4,4.4s4.4-1.9,4.4-4.4V-458.2z"
            />
            <path
              transform="translate(114.9821,748.5409)"
              d="M-339.5-435.9c0-2.4-2-4.3-4.4-4.3c-2.4,0-4.4,1.9-4.4,4.3v21.1c0,2.4,2,4.3,4.4,4.3c2.4,0,4.4-1.9,4.4-4.3V-435.9z"
            />
            <path
              transform="translate(123.5817,744.2304)"
              d="M-324.2-419.6c0-2.4-1.9-4.3-4.3-4.3c-2.4,0-4.4,1.9-4.4,4.3v9.1c0,2.4,2,4.4,4.4,4.4c2.4,0,4.3-1.9,4.3-4.4V-419.6z"
            />
            <path
              transform="translate(132.195,748.5409)"
              d="M-308.9-435.9c0-2.4-1.9-4.3-4.3-4.3s-4.3,1.9-4.3,4.3v21.1c0,2.4,1.9,4.3,4.3,4.3s4.3-1.9,4.3-4.3 C-308.9-414.8-308.9-435.9-308.9-435.9z"
            />
            <path
              transform="translate(140.8102,754.4384)"
              d="M-293.6-458.2c0-2.4-1.9-4.3-4.3-4.3s-4.3,1.9-4.3,4.3v46.1c0,2.4,1.9,4.4,4.3,4.4s4.3-1.9,4.3-4.4V-458.2z"
            />
            <path
              transform="translate(149.4235,748.5409)"
              d="M-278.3-435.9c0-2.4-1.9-4.3-4.4-4.3c-2.4,0-4.3,1.9-4.3,4.3v21.1c0,2.4,1.9,4.3,4.3,4.3c2.5,0,4.4-1.9,4.4-4.3 C-278.3-414.8-278.3-435.9-278.3-435.9z"
            />
            <path
              transform="translate(158.0192,744.2304)"
              d="M-263-419.6c0-2.4-1.9-4.3-4.3-4.3s-4.3,1.9-4.3,4.3v9.1c0,2.4,1.9,4.4,4.3,4.4s4.3-1.9,4.3-4.4V-419.6z"
            />
          </g>
          <g class="logo__type">
            <path
              transform="translate(102.0426,727.2001)"
              d="M-362.5-355.3c-0.4-0.2-3.2-1.9-7.4-1.9c-5.7,0-9.6,3.9-9.6,9.3c0,5.2,3.8,9.3,9.6,9.3c4.1,0,7-1.6,7.4-1.8v9.3 c-1.1,0.3-4.1,1.2-8,1.2c-9.9,0-18.5-6.8-18.5-18c0-10.4,7.8-18,18.5-18c4.1,0,7.2,1,8,1.2V-355.3z"
            />
            <path d="M-239.7,396.7h-8.8v-34.8h8.8V396.7z" />
            <path
              transform="translate(121.5124,727.9413)"
              d="M-327.9-358.1c-0.1,0-3.8-1.1-6.9-1.1c-3.5,0-5.4,1.2-5.4,2.8c0,2.1,2.6,2.9,4,3.3l2.4,0.8c5.7,1.8,8.3,5.7,8.3,9.9 c0,8.7-7.7,11.7-14.4,11.7c-4.7,0-9-0.9-9.5-1v-8c0.8,0.2,4.4,1.3,8.3,1.3c4.4,0,6.4-1.3,6.4-3.2c0-1.8-1.7-2.8-3.9-3.5 c-0.5-0.2-1.3-0.4-1.9-0.6c-4.9-1.5-9-4.4-9-10.2c0-6.5,4.9-10.9,12.9-10.9c4.3,0,8.3,1,8.5,1.1v7.6H-327.9z"
            />
            <path
              transform="translate(134.9958,727.2001)"
              d="M-303.9-355.3c-0.4-0.2-3.2-1.9-7.4-1.9c-5.7,0-9.6,3.9-9.6,9.3c0,5.2,3.8,9.3,9.6,9.3c4.1,0,7-1.6,7.4-1.8v9.3 c-1.1,0.3-4.1,1.2-8,1.2c-9.9,0-18.5-6.8-18.5-18c0-10.4,7.8-18,18.5-18c4.1,0,7.2,1,8,1.2V-355.3z"
            />
            <path
              transform="translate(144.9274,727.8212)"
              d="M-286.3-357.7c-5.2,0-9.1,4.1-9.1,9.1c0,5.1,3.9,9.1,9.1,9.1s9.1-4.1,9.1-9.1S-281.1-357.7-286.3-357.7 M-267.9-348.5 c0,9.9-7.7,18-18.4,18s-18.4-8.1-18.4-18s7.7-18,18.4-18S-267.9-358.4-267.9-348.5"
            />
          </g>
        </svg>
      </div>
    </transition>

    <div class="container">
      <div
        class="container-half codec-details"
        :class="[(codec.peoplePresence === 'Yes' || codec.peopleCount > 0 ? 'codec-details-red' : 'codec-details-green'),(codec.peopleCount <=0 && codec.bookings.length > 0 ? 'codec-details-orange':'')]"
      >
        <div class="right-corner"><span class="blink"><i class="far fa-dot-circle"></i></span>&nbsp;LIVE</div>
        <div style="width: 50%;">
          <h1>{{ codec.name }}</h1>
          <h3
            v-if="codec.bookings.length > 0"
            style="border-top-left-radius: 10px;border-bottom-left-radius: 10px;border-top-right-radius: 10px;border-bottom-right-radius: 10px;"
          >
            <i class="fas fa-map-marker-alt"></i>
            booked until
            {{ codec.bookings[0].endTime }}
          </h3>
          <div
            class="subContainer"
            style="display: flex;justify-content: space-between;"
          >
            <h3 style="border-top-left-radius: 10px;border-bottom-left-radius: 10px;">
              <i class="fas fa-chair"></i>
              {{ codec.chairs }}
            </h3>
            <h3>
              <i
                class="fas"
                :class="[codec.peoplePresence === 'Yes' || codec.peopleCount > 0 ? 'fa-door-closed' : 'fa-door-open']"
              ></i>
              {{ codec.peoplePresence === 'Yes' || codec.peopleCount > 0 ? "Busy" : "Free" }}
            </h3>
            <h3>
              <i class="fas fa-users"></i>
              {{ codec.peopleCount > 0 ? codec.peopleCount : 0 }}
            </h3>
            <h3>
              <i class="fas fa-volume-up"></i>
              {{ codec.ambientNoise }}
            </h3>
            <h3 style="border-top-right-radius: 10px;border-bottom-right-radius: 10px;">
              <i class="fas fa-assistive-listening-systems"></i>
              {{ codec.drynessScore }}
            </h3>
          </div>
        </div>
        <div
          v-if="codec.navigators.length > 0"
          style="display:flex; justify-content: center; width: 50%;"
        >
          <div
            style="text-align:center;margin-right: 5%;margin-left: 5%; width: 25%;"
            v-for="navigator in codec.navigators"
            :key="navigator.ID"
          >
            <h2>{{ navigator.Type === "TouchPanel" ? "Indoor" : "Outdoor"}}</h2>
            <h3 style="border-top-left-radius: 10px;border-top-right-radius: 10px;">
              <i class="fas fa-temperature-high"></i>
              {{ navigator.RoomAnalytics.AmbientTemperature }}°C
            </h3>
            <h3>
              <i class="fas fa-tint"></i>
              {{ navigator.RoomAnalytics.RelativeHumidity }}%
            </h3>
            <h3 style="border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;">
              <i class="fas fa-wind"></i>
              {{ navigator.RoomAnalytics.AirQuality.Index }}
            </h3>
          </div>
        </div>
      </div>
      <div class="container-half default-bg date-container">
        <h1 style="text-align: end;margin-right: 4%;"><a href="/"><i class="far fa-arrow-alt-circle-left"></i> Return to Map</a></h1>
        <div style="display: flex;
    justify-content: space-around;">
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
    </div>
    <div class="container flex-grow">
      <div class="container-half-left">
        <p class="chart-per-hour-title">{{getTitleDate()}}</p>
        <div class="subcontainer chart-container default-bg flex-grow">
          <people-per-hour-chart
            :styles="chartStyle2"
            :peopleCountDayHistory="peopleCountDayHistory"
            :bookingDayHistory="bookingDayHistory"
          />
        </div>
        <div class="subcontainer chart-container default-bg flex-grow">
          <!--<temperature-per-hour-chart
            :styles="chartStyle2"
            :temperatureDayHistory="temperatureDayHistory"
            :humidityDayHistory="humidityDayHistory"
          />-->
          <select v-model="type">
            <option value="temperature-per-hour-chart">Indoor</option>
            <option value="temperature-per-hour-chart-out">Outdoor</option>
          </select>
          <component
            :is="type"
            v-bind:styles="chartStyle2"
            v-bind="{temperatureDayHistory : temperatureDayHistory, humidityDayHistory:humidityDayHistory}"
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
import TemperaturePerHourChart from "./charts/TemperaturePerHourChart";
import TemperaturePerHourChartOut from "./charts/TemperaturePerHourChartOut";
import PeoplePerDayChart from "./charts/PeoplePerDayChart";
import Datepicker from "vuejs-datepicker";
import moment from "moment";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      type: "temperature-per-hour-chart",
      loading: false,
      chartStyle: {
        height: "100%",
        position: "relative"
      },
      chartStyle2: {
        height: "85%",
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
    TemperaturePerHourChart,
    TemperaturePerHourChartOut,
    PeoplePerDayChart,
    Datepicker
  },
  name: "Codec",
  props: ["mac"],
  computed: {
    codec() {
      return this.$store.getters.codec(this.mac);
    },
    temperatureDayHistory() {
      if (this.history.length > 0) {
        if (this.type === "temperature-per-hour-chart") {
          return this.history.filter(element => {
            const dateElementIsValid = moment(element.date).isSame(
              this.date,
              "day"
            );
            return element.name === "AmbianteTemperature" && dateElementIsValid;
          });
        } else {
          // is the chart temperature-per-hour-chart-out
          return this.history.filter(element => {
            const dateElementIsValid = moment(element.date).isSame(
              this.date,
              "day"
            );
            return (
              element.name === "AmbianteTemperatureOutdoor" &&
              dateElementIsValid
            );
          });
        }
      } else {
        return [];
      }
    },
    bookingDayHistory() {
      if (this.history.length > 0) {
        return this.history.filter(element => {
          const dateElementIsValid = moment(element.date).isSame(
            this.date,
            "day"
          );
          return element.name === "IsBooked" && dateElementIsValid;
        });
      } else {
        return [];
      }
    },
    humidityDayHistory() {
      if (this.history.length > 0) {
        if (this.type === "temperature-per-hour-chart") {
          return this.history.filter(element => {
            const dateElementIsValid = moment(element.date).isSame(
              this.date,
              "day"
            );
            return element.name === "RelativeHumidity" && dateElementIsValid;
          });
        } else {
          return this.history.filter(element => {
            const dateElementIsValid = moment(element.date).isSame(
              this.date,
              "day"
            );
            return (
              element.name === "RelativeHumidityOutdoor" && dateElementIsValid
            );
          });
        }
      } else {
        return [];
      }
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
      if (moment(date).isSame(this.date, "week")) {
        this.date = date;
      } else {
        this.date = date;
        this.getCodecHistory();
      }
    },
    getCodecHistory() {
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

      this.loading = true;

      this.$store.dispatch("getCodecHistory", data).then(response => {
        this.history = response.data.history;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    },
    getTitleDate() {
      return moment(this.date).format("DD MMMM YYYY");
    }
  },
  mounted() {
    this.getCodecHistory();
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

.container-half-left {
  display: flex;
  flex-direction: column;
  flex-basis: 50%;

  margin: 0.75rem;

  padding: 0.75rem;

  border-radius: 1rem;
  background-color: white;
}

.codec-details {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  font-size: 1.4rem;

  padding: 1.5rem 3rem;

  transition: all 0.3s ease-in;
}

h3 {
  /*text-align: center;
  padding: 1%;
  margin: 1%;
  border: 1px solid white;
  border-radius: 20px;*/
  flex-basis: 100%;
  text-align: center;
  border: 1px solid white;
}

a {
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}

a:hover {
  color: #d8d8d5;
}

.right-corner {
  display: flex;
  align-items: baseline;
  position: absolute;
  top: 1%;
  right: 51%;
}

.chart-per-hour-title {
  color: rgb(102 102 102);
  margin-left: 2%;
  text-align: start;
  font-weight: 700;
  font-size: 1.5rem;
}
/**Blink animation */
.blink {
  animation: blink-animation 3s infinite;
  -webkit-animation: blink-animation 3s infinite;
}
@keyframes blink-animation {
  from {
    color: white;
    /*visibility: hidden;*/
  }
  to {
    color: #f5473e;
  }
}
@-webkit-keyframes blink-animation {
  from {
    color: white;
    /*visibility: hidden;*/
  }
  to {
    color: #f5473e;
  }
}
/**end animation */

.codec-details-red {
  background-color: #f5473e;

  /*transform: scale(1.005);*/

  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
}

.codec-details-green {
  background-color: #43a942;
}

.codec-details-orange {
  background-color: #ec9007;
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
  flex-direction: column;
  justify-content: space-between;
  /*align-items: center;*/

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

.position-relative {
  position: relative;
}

.loading-bg {
  position: absolute;
  z-index: 99;
  background-color: rgba(232, 235, 241, 0.95);
  height: 100%;
  width: 100%;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-bg-text {
  font-size: 4rem;
}

@keyframes loading {
  25% {
    fill: #c6c7ca;
  }
  50% {
    fill: #049fd9;
  }
  75% {
    fill: #c6c7ca;
  }
}

.logo {
  width: 180px;
  fill: #c6c7ca;
}

.logo__mark > path {
  animation: loading 2s ease-in-out infinite reverse;
}

.logo__mark > path:nth-child(1) {
  animation-delay: 0.1s;
}

.logo__mark > path:nth-child(2) {
  animation-delay: 0.2s;
}

.logo__mark > path:nth-child(3) {
  animation-delay: 0.3s;
}

.logo__mark > path:nth-child(4) {
  animation-delay: 0.4s;
}

.logo__mark > path:nth-child(5) {
  animation-delay: 0.5s;
}

.logo__mark > path:nth-child(6) {
  animation-delay: 0.6s;
}

.logo__mark > path:nth-child(7) {
  animation-delay: 0.7s;
}

.logo__mark > path:nth-child(8) {
  animation-delay: 0.8s;
}

.logo__mark > path:nth-child(9) {
  animation-delay: 0.9s;
}

fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
