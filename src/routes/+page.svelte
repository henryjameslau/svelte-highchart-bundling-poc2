<script>
    import StackedBarChart from "../lib/charts/StackedBarChart.svelte";
    import Chart from "../lib/container/Chart.svelte";
    import { areaData, barData, barGroupData, barStackedData, scatterData, lineData } from '../lib/utils/exampleData.js';

    const stackedBarChartconfig = {
    title: "Chart title",
    subtitle: "Subtitle",
    source: "Source: UN",
    xAxisLabel: "Population (millions)",
    valueSuffix: " million",
    yKey:"name",
    xKey:"value",
    zKey:"category"
    
  };

    const options = {
        chartType: "stackedBar",
        data: barStackedData,
        config: stackedBarChartconfig
    }
</script>

<main>
    <!-- <StackedBarChart data={barStackedData} config={stackedBarChartconfig}/> -->
    <Chart {options}/>
</main>

