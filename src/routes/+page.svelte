  <script>
    import { readExcel } from '$lib/utils/readExcel';
    import Hearder from '$lib/components/Hearder.svelte';
    import FileUpload from '$lib/components/FileUpload.svelte';

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
      console.log(data);
    }
  </script>

<Hearder/>

<FileUpload handleFileUpload={handleFileUpload} />

<pre>{JSON.stringify(data, null, 2)}</pre>