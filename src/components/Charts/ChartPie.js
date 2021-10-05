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
        maxHeight: "400px",
        maxWidth: "400px",
        margin: "0 auto",
      }),
    },
  },
  mounted() {
    this.renderChart(this.data, this.options);
  },
};
