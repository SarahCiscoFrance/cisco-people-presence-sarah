<script>
import { Radar } from "vue-chartjs";
import moment from "moment";

export default {
  extends: Radar,
  props: ["peopleCountWeekHistory"],
  data: () => ({
    chartdata: {
      datacollection: {
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        datasets: [
          {
            label: "People Count",
            backgroundColor: "rgba(0, 173, 11, 0.5)",
            data: []
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
        text: "", //le titre est set plus bas
        fontSize: 16,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || "";

            if (label) {
              label += ": ";
            }
            label += Math.round(tooltipItem.yLabel * 100) / 100;
            return label;
          }
        }
      },
      animation: {}
    }
  }),
  watch: {
    peopleCountWeekHistory(val) {
      this.render();
    }
  },
  methods: {
    render() {
      this.chartdata.datacollection.datasets[0].data = [];

      if (this.peopleCountWeekHistory.length > 0) {
        for (let i = 0; i < 6; ++i) {
          this.chartdata.datacollection.datasets[0].data.push(0);
        }

        this.peopleCountWeekHistory.map(element => {
          const day = moment(element.date).day();
          const elementValue = element.value;

          if (elementValue >= 0) {
            const currentValueForDay = this.chartdata.datacollection.datasets[0]
              .data[day];

            if (!currentValueForDay) {
              this.chartdata.datacollection.datasets[0].data[
                day
              ] = elementValue;
            } else if (currentValueForDay < elementValue) {
              this.chartdata.datacollection.datasets[0].data[
                day
              ] = elementValue;
            }
          }
        });
      }
      this.options.title.text =
        "Max number of people per day for the week of " +
        moment(this.$parent.date)
          .startOf("week")
          .format("DD/MM/YYYY");
      this.renderChart(this.chartdata.datacollection, this.options);
    }
  }
};
</script>
