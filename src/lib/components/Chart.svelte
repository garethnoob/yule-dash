<script>
  // Import Chart.js for rendering charts
  import { Chart } from 'chart.js/auto';

  // Receive the 'data' prop from the parent component
  let {data} = $props();

  // Reference to the canvas element for Chart.js
  let chartCanvas = $state();


  // Compute the total 'Made' value from the data array
  const totalMade = $derived(data.reduce((sum, item) => sum + (item.Made || 0), 0));
  // Compute the total 'Planned' value from the data array
  const totalPlanned = $derived(data.reduce((sum, item) => sum + (item.Planned || 0), 0));

  // Create or update the chart when the canvas or data changes
  $effect(() => {
    // Only run if the canvas is ready and data is available
    if (chartCanvas && data && data.length > 0) {
      // Get the 2D drawing context from the canvas
      const ctx = chartCanvas.getContext('2d');
      // Create a new Chart.js bar chart
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          // Chart labels for the x-axis
          labels: ['Made', 'Planned'],
          // Chart dataset with totals
          datasets: [{
            label: 'Total',
            data: [totalMade, totalPlanned],
            backgroundColor: [
              'rgba(66, 133, 244, 0.8)', // Blue for 'Made'
              'rgba(234, 67, 53, 0.8)'   // Red for 'Planned'
            ],
            borderColor: [
              'rgba(66, 133, 244, 1)',
              'rgba(234, 67, 53, 1)'
            ],
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
              text: 'Sales Comparison', // Chart title
              font: {
                size: 18,
                weight: 'bold'
              },
              padding: 20
            },
            legend: {
              display: false // Hide legend
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
<div class="chart-container">
  <canvas bind:this={chartCanvas}></canvas>
</div>
{/if}

<style>
  /* Container for the chart with styling */
  .chart-container {
    width: 100%;
    height: 400px;
    position: relative;
    margin: 20px 0;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  /* Make the canvas fill the container */
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
</style>