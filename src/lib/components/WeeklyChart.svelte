<script>
import { Chart } from 'chart.js/auto';
import { excelDateToJsDate } from '$lib/utils/excelDateToJsDate';

// Receive the 'data' prop from the parent component
let { data } = $props();

// Reference to the canvas element for Chart.js
let chartCanvas = $state(null);

const weekTotals = $derived(Object.values(
  data.reduce((acc, item) => {
    const week = item.WeekNumber;

    if (!acc[week]) {
      acc[week] = {
        WeekNumber: week,
        Planned: 0,
        Made: 0
      };
    }

    acc[week].Planned += item.Planned;
    acc[week].Made += item.Made;

    return acc;
  }, {})
));

const weeks = $derived(weekTotals.map(item => item.WeekNumber));
const plannedValues = $derived(weekTotals.map(item => item.Planned));
const madeValues = $derived(weekTotals.map(item => item.Made));

const madeColor = $derived(madeValues.map((value, i) => {
    return value >= plannedValues[i] ? 'rgba(144, 238, 144, 0.8)' : 'rgba(255, 99, 132, 0.8)'; // Use light green for 'Made' if it meets or exceeds 'Planned', otherwise light red
  }));


// console.log('Week Totals:', weekTotals);


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
          labels: weeks,
          // Chart dataset with totals
          datasets: [{
            label: 'Planned',
            data: plannedValues,
            backgroundColor: 'rgba(200, 200, 200, 0.8)',  // Red for 'Planned',
            borderColor: 'rgba(200, 200, 200, 0.8)', // Red for 'Planned',
            borderWidth: 2,
            borderRadius: 8
          },
          {
            label: 'Made',
            data: madeValues,
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
              text: 'Weekly Planned vs Actual', // Chart title
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
<div class="chart-container">
  <canvas bind:this={chartCanvas}></canvas>
</div>
{/if}


<style>
  /* Container for the chart with styling */
  .chart-container {
    margin: 20px auto; /* Center horizontally */
    display: flex; 
    justify-content: center;
    align-items: center;
    width: 95%;
    height: 400px;
    position: relative;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 4px 10px rgba(0, 0, 0, 0.2)
  }
  
  /* Make the canvas fill the container */
  canvas {
    width: 100% !important;
    height: 100% !important;
  }

  
</style>