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
        maxHeight: "422px",
        maxWidth: "380px",
        display: "flex",
      }),
    },
  },
  mounted() {
    this.renderChart(this.data, this.options);
  },
};
