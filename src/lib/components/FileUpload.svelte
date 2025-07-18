<script>
  const { handleFileUpload } = $props();
</script>


<label for="file-upload" class="file-upload-label">
  Choose Excel file
</label>
<input id="file-upload" type="file" onchange={handleFileUpload} accept=".xlsx" />

<style>
  .file-upload-label {
    display: block;
    margin: 0 auto;
    padding: 20px;
    border: 1px dashed #993b3b;
    text-align: center;
    cursor: pointer;
    max-width: 300px;
    border-radius: 1rem;
    background-color: #f0f0f0;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: #e0e0e0;
      transform: scale(1.05);
    }
  }
  
  input[type="file"] {
    display: none;
  }
</style>