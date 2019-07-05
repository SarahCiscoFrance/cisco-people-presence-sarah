<script>
import { Line } from "vue-chartjs";
import chartjsPluginAnnotation from "chartjs-plugin-annotation";
import moment from "moment";

export default {
  extends: Line,
  props: ["peopleCountDayHistory"],
  data: () => ({
    chartdata: {
      datacollection: {
        labels: [],
        datasets: [
          {
            label: "People Count",
            backgroundColor: "#00AD0B",
            borderColor: "#00AD0B",
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
        text: "The maximum number of people per hour",
        fontSize: 16,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
      },
      animation: {},
      scales: {
        yAxes: [
          {
            ticks: {
              stepSize: 1
            }
          }
        ]
      }
      /* annotation: {
        drawTime: "afterDatasetsDraw",
        annotations: [
          {
            type: "line",
            mode: "horizontal",
            scaleID: "y-axis-0",
            value: "8",
            borderColor: "tomato",
            borderWidth: 3
          }
        ]
      } */
    }
  }),
  watch: {
    peopleCountDayHistory(val) {
      this.render();
    }
  },
  methods: {
    render() {
      this.chartdata.datacollection.labels = [];
      this.chartdata.datacollection.datasets[0].data = [];

      if (this.peopleCountDayHistory.length > 0) {
        for (let i = 0; i < 24; ++i) {
          this.chartdata.datacollection.labels.push(`${i}h`);
          this.chartdata.datacollection.datasets[0].data.push(0);
        }

        this.peopleCountDayHistory.map(element => {
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

      this.renderChart(this.chartdata.datacollection, this.options);
    }
  }
};
</script>
