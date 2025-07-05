<script>
  const { data } = $props();

  // console.log($state.snapshot(data));

  /** @type {number} */
  let totalMade = $derived(data.reduce(
    /** @param {number} acc 
     * @param {any} curr */
    (acc, curr) => acc + curr.Made, 0));

  /** @type {number} */
  let totalPlanned = $derived(data.reduce(
    /** @param {number} acc 
     * @param {any} curr */
    (acc, curr) => acc + curr.Planned, 0));

  /** @type {number} */
  let conformance = $derived((totalMade / totalPlanned) * 100);

</script>


<div class="card">
  <h2>Planned: {totalPlanned.toLocaleString()}</h2>
  <h2>Made: {totalMade.toLocaleString()}</h2>
  <h2>CTP: {conformance.toFixed(1)}%  {conformance > 100 ? '🔥' : '🥺'}</h2>
</div>

<style>
  .card {
    display: flex;
    justify-content: space-around;
    background-color: #f1f3f6;
    padding: 20px;
    border-radius: 10px;
    width: 45%;
    margin: 20px auto;
    align-items: center;
    min-height: 75px;
    flex-wrap: wrap;
    min-width: 75% ;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .card h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>