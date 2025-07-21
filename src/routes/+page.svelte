  <script>
    import { readExcel } from '$lib/utils/readExcel';
    import Hearder from '$lib/components/Hearder.svelte';
    import FileUpload from '$lib/components/FileUpload.svelte';
    import Card from '$lib/components/Card.svelte';
    import Chart from '$lib/components/Chart.svelte';
    import WeeklyChart from '$lib/components/WeeklyChart.svelte';
    import { fade, fly } from 'svelte/transition';
    
    /**@type {Array<any>}*/
    let data= $state([]);
    let isLoading = $state(false);

    /**@param {Event} event */
    async function handleFileUpload(event) {
      if (!event.target || !(event.target instanceof HTMLInputElement)) return;
      const file = event.target.files?.[0];
      if (!file) return;
      
      isLoading = true;
      try {
        const excelData = await readExcel(file);
        data = excelData;
        console.log('Data loaded successfully:', excelData.length, 'rows');
      } catch (error) {
        console.error('Failed to load Excel file:', error);
        alert('Failed to load Excel file. Please check the file format.');
      } finally {
        isLoading = false;
      }
    }
  </script>

<div class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-red-50">
  <Hearder/>
  
  <main class="container mx-auto px-4 pb-12">
    {#if data.length === 0}
      <div class="hero-section" in:fade={{ duration: 500 }}>
        <div class="hero-content">
          <h2 class="hero-title">Welcome to Yule Dash</h2>
          <p class="hero-subtitle">Track your Yule Log production with real-time insights and beautiful visualizations</p>
          <div class="hero-upload">
            <FileUpload handleFileUpload={handleFileUpload} {isLoading} />
          </div>
        </div>
      </div>
    {/if}

    {#if data.length > 0}
      <div class="dashboard-container" in:fade={{ duration: 300 }}>
        <div class="metrics-section" in:fly={{ y: 20, duration: 500, delay: 100 }}>
          <Card data={data} />
        </div>
        
        <div class="charts-grid">
          <div class="chart-container" in:fly={{ y: 20, duration: 500, delay: 200 }}>
            <Chart data={data} />
          </div>
          
          <div class="chart-container" in:fly={{ y: 20, duration: 500, delay: 300 }}>
            <WeeklyChart data={data} />
          </div>
        </div>
      </div>
    {/if}
  </main>
</div>

<style>
  .hero-section {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .hero-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #10b981 0%, #dc2626 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: #64748b;
    margin-bottom: 3rem;
    line-height: 1.6;
  }

  .hero-upload {
    display: flex;
    justify-content: center;
  }

  .dashboard-container {
    padding-top: 2rem;
  }

  .metrics-section {
    margin-bottom: 3rem;
  }

  .charts-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .chart-container {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 1.5rem;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.5);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .chart-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: 1024px) {
    .charts-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
    }
    
    .hero-subtitle {
      font-size: 1rem;
    }
  }
</style>