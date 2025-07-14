<script lang="ts">
  // Import Chart.js for rendering charts
  import { Chart } from 'chart.js/auto';
  
  import { excelDateToJsDate } from '$lib/utils/excelDateToJsDate';

  // Receive the 'data' prop from the parent component
  let {data} = $props();

  // Reference to the canvas element for Chart.js
  let chartCanvas: HTMLCanvasElement | null = $state(null);

  
</script>
