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
      default: null,
    },
    styles: {
      type: Object,
      default: () => ({
        maxWidth: "380px",
        display: "flex",
      }),
    },
  },
  mounted() {
    const options = this.options;
    this.renderChart(this.data, {
      ...options,
      legendCallback: function (chart) {
        var legendHtml = [];
        legendHtml.push("<ul>");
        var item = chart.data.datasets[0];
        for (var i = 0; i < item.data.length; i++) {
          legendHtml.push("<li>");
          legendHtml.push(
            '<span class="chart-legend" style="background-color:' +
              item.backgroundColor[i] +
              '"></span>'
          );
          legendHtml.push(
            '<span class="chart-legend-label-text">' +
              chart.data.labels[i] +
              "</span>"
          );
          legendHtml.push("</li>");
        }

        legendHtml.push("</ul>");
        return legendHtml.join("");
      },
    });

    const HTML = this.$data._chart.generateLegend();
    this.$emit("generated", HTML);
  },
};
