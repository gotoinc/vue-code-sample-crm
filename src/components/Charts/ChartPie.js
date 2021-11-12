import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: {
    data: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: () => ({
        legend: {
          display: false,
        },
        responsive: true,
      }),
    },
    styles: {
      type: Object,
      default: () => ({
        maxWidth: "300px",
        display: "flex",
        margin: "auto",
        padding: "0px 30px 40px",
      }),
    },
  },

  methods: {
    updateChartDataset(e, datasetIndex) {
      const meta = this.$data._chart.getDatasetMeta(0);
      const labelEl = e.querySelector(".chart-legend-label-text");
      const result = meta.data[datasetIndex].hidden === true ? false : true;

      meta.data[datasetIndex].hidden = result;
      labelEl.style.textDecoration = result ? "line-through" : "none";
      this.$data._chart.update();
    },
    createChart() {
      const options = this.options;
      this.renderChart(this.data, {
        ...options,
        legendCallback: function (chart) {
          const legendHtml = [];
          legendHtml.push("<div class='custom-legend-wrapper'>");
          const item = chart.data.datasets[0];
          for (let i = 0; i < item.data.length; i++) {
            legendHtml.push("<div class='custom-legend-item'>");
            legendHtml.push(
              `<div class="custom-legend-dot" style="background-color: ${item.backgroundColor[i]}"></div>`
            );
            legendHtml.push(
              `<span class="chart-legend-label-text">
                ${chart.data.labels[i]}
                </span>`
            );
            legendHtml.push("</div>");
          }
          legendHtml.push("</div>");
          return legendHtml.join("");
        },
      });

      const HTML = this.$data._chart.generateLegend();
      this.$emit("generated", HTML);
    },
  },
  mounted() {
    this.createChart();
  },
};
