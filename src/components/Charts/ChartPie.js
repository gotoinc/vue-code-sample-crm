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
        height: "422px",
        width: "380px",
        display: "flex",
      }),
    },
  },
  mounted() {
    this.renderChart(this.data, this.options);
  },
};
