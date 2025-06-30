  <script>
    import { readExcel } from '$lib/utils/readExcel';
    import Hearder from '$lib/components/Hearder.svelte';
    import FileUpload from '$lib/components/FileUpload.svelte';
    /**
     * 
     * @param {Event} event 
     */

    async function handleFileUpload(event) {
      if (!event.target || !(event.target instanceof HTMLInputElement)) return;
      const file = event.target.files?.[0];
      if (!file) return;
      const data = await readExcel(file);
      console.log(data);
    }
  </script>

<Hearder/>

<FileUpload handleFileUpload={handleFileUpload} />

