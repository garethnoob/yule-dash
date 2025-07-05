  <script>
    import { readExcel } from '$lib/utils/readExcel';
    import Hearder from '$lib/components/Hearder.svelte';
    import FileUpload from '$lib/components/FileUpload.svelte';
    import Card from '$lib/components/Card.svelte';
    import Chart from '$lib/components/Chart.svelte';
    
    /**@type {Array<any>}*/
    let data= $state([]);

    /**@param {Event} event */
    async function handleFileUpload(event) {
      if (!event.target || !(event.target instanceof HTMLInputElement)) return;
      const file = event.target.files?.[0];
      if (!file) return;
      
      try {
        const excelData = await readExcel(file);
        data = excelData;
        console.log('Data loaded successfully:', excelData.length, 'rows');
      } catch (error) {
        console.error('Failed to load Excel file:', error);
        alert('Failed to load Excel file. Please check the file format.');
      }
    }
  </script>

<Hearder/>

{#if data.length === 0}
  <FileUpload handleFileUpload={handleFileUpload} />
{/if}

{#if data.length > 0}
  <div class="card-container">
    <Card data={data} />
  </div>
{/if}

<Chart data={data} />

<style>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-left: 20px;
    margin-right: 20px;
  }
</style>