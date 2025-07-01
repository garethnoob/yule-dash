<script>
  const { data } = $props();
</script>


<div class="card">
  <h1>{data}</h1>
</div>

<style>
  .card {
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 10px;
    width: 45%;
    margin: 20px auto;
  }
</style>