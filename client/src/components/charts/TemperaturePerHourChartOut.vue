<script>
import { Bar } from "vue-chartjs";
import chartjsPluginAnnotation from "chartjs-plugin-annotation";
import moment from "moment";

export default {
  extends: Bar,
  props: ["temperatureDayHistory", "humidityDayHistory"],
  data: () => ({
    chartdata: {
      datacollection: {
        labels: [],
        datasets: [
          {
            type: "line",
            label: "Temperature",
            yAxisID: "temperature",
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: "#f5473e",
            data: [],
            fill: true,
            pointRadius: 5
          },
          {
            type: "bar",
            label: "Humidity",
            yAxisID: "humidity",
            backgroundColor: "#3e83f5",
            borderColor: "#3e83f5",
            data: [],
            fill: false,
            pointRadius: 5
          }
        ]
      }
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Outdoor Temperature (°C) & Humidity (%) per hour",
        fontSize: 16,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
      },
      animation: {},
      scales: {
        yAxes: [
          {
            id: "temperature",
            position: "left",
            ticks: {
              stepSize: 5,
              fontColor: "#f5473e"
            }
          },
          {
            type: "linear",
            id: "humidity",
            position: "right",
            gridLines: {
              display: false
            },
            ticks: {
              min: 0,
              max: 100,
              stepSize: 10,
              fontColor: "#3e83f5"
            }
          }
        ]
      }
    }
  }),
  watch: {
    temperatureDayHistory(val) {
      this.render();
    },
    humidityDayHistory(val) {
      this.render();
    }
  },
  mounted() {
    this.render();
  },
  methods: {
    render() {
      this.chartdata.datacollection.labels = [];
      this.chartdata.datacollection.datasets[0].data = [];
      this.chartdata.datacollection.datasets[1].data = [];

      if (this.temperatureDayHistory.length > 0) {
        for (let i = 0; i < 24; ++i) {
          this.chartdata.datacollection.labels.push(`${i}h`);
          this.chartdata.datacollection.datasets[0].data.push(0);
          this.chartdata.datacollection.datasets[1].data.push(0);
        }

        this.temperatureDayHistory.map(element => {
          const hour = moment(element.date)
            .startOf("hour")
            .hour();
          const elementValue = element.value;

          if (elementValue >= 0) {
            const currentValueForHour = this.chartdata.datacollection
              .datasets[0].data[hour];

            if (currentValueForHour) {
              if (currentValueForHour < elementValue) {
                this.chartdata.datacollection.datasets[0].data[
                  hour
                ] = elementValue;
              }
            } else {
              this.chartdata.datacollection.datasets[0].data[
                hour
              ] = elementValue;
            }
          }
        });
      }

      if (this.humidityDayHistory.length > 0) {
        this.humidityDayHistory.map(element => {
          const hour = moment(element.date)
            .startOf("hour")
            .hour();
          const elementValue = element.value;

          if (elementValue >= 0) {
            const currentValueForHour = this.chartdata.datacollection
              .datasets[1].data[hour];

            if (currentValueForHour) {
              if (currentValueForHour < elementValue) {
                this.chartdata.datacollection.datasets[1].data[
                  hour
                ] = elementValue;
              }
            } else {
              this.chartdata.datacollection.datasets[1].data[
                hour
              ] = elementValue;
            }
          }
        });
      }

      this.renderChart(this.chartdata.datacollection, this.options);
    }
  }
};
</script>
