<script>
  const { handleFileUpload, isLoading = false } = $props();
  
  let isDragging = $state(false);
  
  function handleDragOver(e) {
    e.preventDefault();
    isDragging = true;
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    isDragging = false;
  }
  
  function handleDrop(e) {
    e.preventDefault();
    isDragging = false;
    
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.xlsx')) {
      const event = { target: { files: [file] } };
      handleFileUpload(event);
    }
  }
</script>

<div class="upload-wrapper">
  <label 
    for="file-upload" 
    class="file-upload-label {isDragging ? 'dragging' : ''} {isLoading ? 'loading' : ''}"
    ondragover={handleDragOver}
    ondragleave={handleDragLeave}
    ondrop={handleDrop}
  >
    <div class="upload-icon">
      {#if isLoading}
        <div class="spinner"></div>
      {:else}
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      {/if}
    </div>
    <span class="upload-text">
      {#if isLoading}
        Processing...
      {:else if isDragging}
        Drop your Excel file here
      {:else}
        Drag & drop your Excel file here
      {/if}
    </span>
    <span class="upload-subtext">or click to browse</span>
  </label>
  <input id="file-upload" type="file" onchange={handleFileUpload} accept=".xlsx" disabled={isLoading} />
</div>

<style>
  .upload-wrapper {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  .file-upload-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem 2rem;
    border: 2px dashed #cbd5e1;
    border-radius: 1.5rem;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .file-upload-label::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .file-upload-label:hover::before {
    opacity: 1;
  }
  
  .file-upload-label:hover {
    border-color: #10b981;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .file-upload-label.dragging {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.1);
  }
  
  .file-upload-label.loading {
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  .upload-icon {
    color: #10b981;
    transition: transform 0.3s ease;
  }
  
  .file-upload-label:hover .upload-icon {
    transform: translateY(-5px);
  }
  
  .upload-text {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
  }
  
  .upload-subtext {
    font-size: 0.875rem;
    color: #64748b;
  }
  
  input[type="file"] {
    display: none;
  }
  
  .spinner {
    width: 48px;
    height: 48px;
    border: 3px solid #e5e7eb;
    border-top-color: #10b981;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>