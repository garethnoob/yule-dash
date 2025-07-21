<script lang="ts">
  // Import Chart.js for rendering charts
  import { Chart } from 'chart.js/auto';
  
  import { excelDateToJsDate } from '$lib/utils/excelDateToJsDate';

  // Receive the 'data' prop from the parent component
  let {data} = $props();

  // Reference to the canvas element for Chart.js
  let chartCanvas: HTMLCanvasElement | null = $state(null);


  const plannedArray: number[] = $derived(data.map((item: any) => item.Planned || 0));
  const madeArray: number[] = $derived(data.map((item: any) => item.Made || 0));
  const datesArray: string[] = $derived(data.map((item: any) => excelDateToJsDate(item.Date).toLocaleDateString('en-GB') || ''));
  // Create a color array for 'Made' values based on their comparison with 'Planned'
  const madeColor: string[] = $derived(madeArray.map((value, i) => {
    return value >= plannedArray[i] ? 'rgba(144, 238, 144, 0.8)' : 'rgba(255, 99, 132, 0.8)'; // Use light green for 'Made' if it meets or exceeds 'Planned', otherwise light red
  }));

  

  // Compute the total 'Made' value from the data array
  const totalMade: number[] = $derived(data.reduce((sum: number, item: any) => sum + (item.Made || 0), 0));
  // Compute the total 'Planned' value from the data array
  const totalPlanned: number[] = $derived(data.reduce((sum: number, item: any) => sum + (item.Planned || 0), 0));

  // Create or update the chart when the canvas or data changes
  $effect(() => {
    // Only run if the canvas is ready and data is available
    if (chartCanvas && data && data.length > 0) {
      // Get the 2D drawing context from the canvas
      const ctx = chartCanvas.getContext('2d');
      if (!ctx) return; // Ensure ctx is not null
      // Create a new Chart.js bar chart
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          // Chart labels for the x-axis
          labels: datesArray,
          // Chart dataset with totals
          datasets: [{
            label: 'Planned',
            data: plannedArray,
            backgroundColor: 'rgba(200, 200, 200, 0.8)',  // Red for 'Planned',
            borderColor: 'rgba(200, 200, 200, 0.8)', // Red for 'Planned',
            borderWidth: 2,
            borderRadius: 8
          },
          {
            label: 'Made',
            data: madeArray,
            backgroundColor: madeColor, // Blue for 'Made'
            borderColor: madeColor,
            borderWidth: 2,
            borderRadius: 8
          }]
        },
        options: {
          responsive: true, // Make chart responsive
          maintainAspectRatio: false, // Allow custom height
          plugins: {
            title: {
              display: true,
              text: 'Daily Planned vs Actual', // Chart title
              font: {
                size: 18,
                weight: 'bold'
              },
              padding: 20
            },
            legend: {
              display: true // Hide legend
            }
          },
          scales: {
            y: {
              beginAtZero: true, // y-axis starts at 0
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              },
              ticks: {
                font: {
                  size: 12
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  size: 12
                }
              }
            }
          },
          animation: {
            duration: 1000, // Animation duration in ms
            easing: 'easeInOutQuart' // Animation easing
          }
        }
      });

      // Cleanup: destroy the chart when the effect is re-run or component is destroyed
      return () => {
        chart.destroy();
      };
    }
  });
</script>

{#if data && data.length > 0}
<!-- Chart container only renders if data is available -->
<div class="chart-wrapper">
  <div class="chart-header">
    <h3 class="chart-title">Daily Production Overview</h3>
    <p class="chart-subtitle">Planned vs Actual Production</p>
  </div>
  <div class="chart-container">
    <canvas bind:this={chartCanvas}></canvas>
  </div>
</div>
{/if}


<style>
  .chart-wrapper {
    width: 100%;
  }

  .chart-header {
    margin-bottom: 1rem;
  }

  .chart-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 0.25rem 0;
  }

  .chart-subtitle {
    font-size: 0.875rem;
    color: #64748b;
    margin: 0;
  }

  /* Container for the chart with styling */
  .chart-container {
    display: flex; 
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 400px;
    position: relative;
    padding: 20px;
  }
  
  /* Make the canvas fill the container */
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
</style>