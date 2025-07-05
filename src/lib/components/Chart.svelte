<script>
  import { Chart } from 'chart.js/auto';

  let {data} = $props();

  let chartCanvas;
  let chartInstance = null;

  const totalMade = $derived(data.reduce((sum, item) => sum + (item.Made || 0), 0));
  const totalPlanned = $derived(data.reduce((sum, item) => sum + (item.Planned || 0), 0));

  // Create or update chart when canvas is ready and data changes
  $effect(() => {
    if (chartCanvas && data && data.length > 0) {
      const ctx = chartCanvas.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Made', 'Planned'],
          datasets: [{
            label: 'Total',
            data: [totalMade, totalPlanned],
            backgroundColor: [
              'rgba(66, 133, 244, 0.8)',
              'rgba(234, 67, 53, 0.8)'
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
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Sales Comparison',
              font: {
                size: 18,
                weight: 'bold'
              },
              padding: 20
            },
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
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
            duration: 1000,
            easing: 'easeInOutQuart'
          }
        }
      });

      return () => {
        chart.destroy();
      };
    }
  });
</script>

{#if data && data.length > 0}
<div class="chart-container">
  <canvas bind:this={chartCanvas}></canvas>
</div>
{/if}

<style>
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
  
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
</style>