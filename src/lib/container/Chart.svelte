<script>
	import StackedBarChart from "../charts/StackedBarChart.svelte";

	const charts = {stackedBar:StackedBarChart};

	export let options={
        chartType: 'stackedBar',
        data: [], 
        config: {}
    }       

</script>

<svelte:component this={charts[options.chartType]} {...options}/>