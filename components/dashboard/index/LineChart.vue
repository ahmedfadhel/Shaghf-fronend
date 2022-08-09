<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  props: ["chartData", "options", "height"],
  mounted() {
    this.renderChart(this.chartData, this.options, this.height);
  },
};
</script>