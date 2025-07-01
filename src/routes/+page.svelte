  <script>
    import { readExcel } from '$lib/utils/readExcel';
    import Hearder from '$lib/components/Hearder.svelte';
    import FileUpload from '$lib/components/FileUpload.svelte';
    import Card from '$lib/components/Card.svelte';
    /**
     * @type {Array<any>}
     */
    let data= $state([]);


    

    /**
     * @param {Event} event 
     */
    async function handleFileUpload(event) {
      if (!event.target || !(event.target instanceof HTMLInputElement)) return;
      const file = event.target.files?.[0];
      if (!file) return;
      const excelData = await readExcel(file);
      data=excelData;
    }
  </script>

<Hearder/>

<FileUpload handleFileUpload={handleFileUpload} />

{#if data.length > 0}
  <div class="card-container">
    <Card data={data[0].Description} />
  </div>
{/if}

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