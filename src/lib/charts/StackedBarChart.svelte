<svelte:options accessors={true} />

<script>
    import Highcharts from "highcharts";
    import {wideToTidy, transformToSeriesFormat,DateParser } from "../utils/helpers.js"
  
    export let data = [
            {
            name: 'Admin',
            'Category 1': 20.85373832,
            'Category 2': 17.6949027,
            'Category 3': 84.86276061,
            'Category 4 with a long name': 31.5783842,
            'Category 5': 48.20562268,
            },
            {
            name: 'Arts',
            'Category 1': 75.10385606,
            'Category 2': 92.78801932,
            'Category 3': 98.42939789,
            'Category 4 with a long name': 95.19411478,
            'Category 5': 38.58584155,
            },
            {
            name: 'Retail',
            'Category 1': 64.12511024,
            'Category 2': 36.80002708,
            'Category 3': 38.20913822,
            'Category 4 with a long name': 4.832285581,
            'Category 5': 31.60393462,
            },
            {
            name: 'Manufacturing',
            'Category 1': 58.04407128,
            'Category 2': 91.82819229,
            'Category 3': 44.15710484,
            'Category 4 with a long name': 93.53981204,
            'Category 5': 32.06639495,
            },
            {
            name: 'Construction',
            'Category 1': 49.29571885,
            'Category 2': 61.7405718,
            'Category 3': 2.633201818,
            'Category 4 with a long name': 12.00880742,
            'Category 5': 86.95296893,
            },
            {
            name: 'Health and social work',
            'Category 1': 26.42919394,
            'Category 2': 68.3881695,
            'Category 3': 38.34804204,
            'Category 4 with a long name': 45.46625342,
            'Category 5': 24.65361361,
            },
            {
            name: 'Transportation and storage',
            'Category 1': 66.02170789,
            'Category 2': 25.88544503,
            'Category 3': 67.54775376,
            'Category 4 with a long name': 45.4008622,
            'Category 5': 68.65015727,
            },
            {
            name: 'Accommodation and food',
            'Category 1': 24.56805884,
            'Category 2': 89.47462279,
            'Category 3': 49.36685439,
            'Category 4 with a long name': 50.05168647,
            'Category 5': 65.708543,
            },
            {
            name: 'Other',
            'Category 1': 27.48215082,
            'Category 2': 14.64375439,
            'Category 3': 66.97898751,
            'Category 4 with a long name': 58.11839376,
            'Category 5': 9.358939682,
            },
            {
            name: 'All businesses',
            'Category 1': 48.97683167,
            'Category 2': 80.16796002,
            'Category 3': 18.79872569,
            'Category 4 with a long name': 90.21841354,
            'Category 5': 57.08565289,
            },
        ];
    export let config = {
            title: "Chart title",
            subtitle: "Subtitle",
            source: "Source: UN",
            xAxisLabel: "Population (millions)",
            valueSuffix: " million",
            yKey:"name",
            xKey:"value",
            zKey:"category"
        };
  

    // console.log('inside component',data,config)
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