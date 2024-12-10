<svelte:options accessors={true} />

<script>
    import Highcharts from "highcharts";
    import {wideToTidy, transformToSeriesFormat,DateParser } from "../utils/helpers.js"
  
    export let data;
    export let config = {};
  
    let container, chart, categories, series, colors;
  
    function refresh(data, config) {
      data = wideToTidy(data,'json');

      const barHeight = config.barHeight || 30;
      const xAxisLabel = config.xAxisLabel || null;
      const valueSuffix = config.valueSuffix || null;
      const xKey = config.xKey || "x";
      const yKey = config.yKey || "y";
      const zKey = config.zKey || "z";
  
      colors = config.colors || ["#206095", "#27A0CC", "#871A5B", "#A8BD3A", "#F66068"];
      categories = config.categories || Array.from(new Set(data.map(d => d[yKey])));
  
      series = (() => {
        const index = {};
        for (const d of data) {
          if (!index[d[zKey]]) index[d[zKey]] = {name: d[zKey], data: []};
          index[d[zKey]].data.push(d[xKey]);
        }
        return Object.values(index);
      })();
  
      const height = categories.length * (barHeight + 10 ) + 60;
  
      const options = {
          chart: {
              type: 'bar',
              height
          },
          title: false,
          colors,
          xAxis: {
              categories,
              title: false,
              lineWidth: 0
          },
          yAxis: {
              min: 0,
              reversedStacks: false,
              title: {
                  text: xAxisLabel,
                  align: 'high'
              },
              labels: {
                  overflow: 'justify'
              },
              gridLineWidth: 1
          },
          tooltip: {
              valueSuffix,
              enabled:false
          },
          plotOptions: {
              series: {
                  animation:false,
                  stacking: 'normal',
                  pointWidth: barHeight,
                  borderRadius: 0,
                  borderWidth: 0,
                  groupPadding: 0,
                  dataLabels: {
                      enabled: false,
                      inside: true,
                      allowOverlap: true,
                      align: 'right',
                      style: {textOutline: 'none'},
                      formatter: function() {
                        const height = this.point.shapeArgs.height;
                        return height > 30 ? this.y.toLocaleString("en-GB") : null;
                      }
                  },
                  enableMouseTracking:false
              }
          },
          legend: false,
          credits: {
              enabled: false
          },
          series
      };
  
      if (!chart) chart = Highcharts.chart(container, options);
      else chart.update(options, true, true, true);
    }
  
    $: container && refresh(data, config);
  </script>
  
  {#if config.title}<h3>{config.title}</h3>{/if}
  {#if config.subtitle}<p>{config.subtitle}</p>{/if}
  {#if series?.[1]}
  <ul class="chart-legend">
      {#each series as ser, i}
          <li><span class="chart-bullet" style:background="{colors[i]}"></span> {ser.name}</li>
      {/each}
  </ul>
  {/if}
  <div class="chart-container" bind:this={container}></div>
  {#if config.footnote}<p>{config.footnote}</p>{/if}
  
  <style>
      :global(.highcharts-legend) {
          position: relative;
      }
      .chart-legend {
          margin: 0;
          padding: 0;
      }
      .chart-legend > li {
          display: inline-block;
          margin: 0 18px 0 0;
      }
      .chart-bullet {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
      }
  </style>