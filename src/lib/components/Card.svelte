<script lang="ts">
  const { data } = $props();

  // console.log($state.snapshot(data));

  let totalMade: number = $derived(data.reduce(
    (acc: number, curr: any) => acc + curr.Made, 0));


  let totalPlanned: number = $derived(data.reduce(
    (acc: number, curr: any) => acc + curr.Planned, 0));


  let conformance: number = $derived((totalMade / totalPlanned) * 100);

  let averageMade: number = $derived(totalMade / data.length || 0);

</script>


<div class="metrics-container">
  <div class="metric-card">
    <div class="metric-icon planned">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 11l3 3L22 4"></path>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
      </svg>
    </div>
    <div class="metric-content">
      <span class="metric-label">Planned</span>
      <span class="metric-value">{totalPlanned.toLocaleString()}</span>
    </div>
  </div>

  <div class="metric-card">
    <div class="metric-icon made">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path>
      </svg>
    </div>
    <div class="metric-content">
      <span class="metric-label">Made</span>
      <span class="metric-value">{totalMade.toLocaleString()}</span>
    </div>
  </div>

  <div class="metric-card {conformance > 100 ? 'success' : 'warning'}">
    <div class="metric-icon performance">
      <span class="performance-emoji">{conformance > 100 ? '🔥' : '🥺'}</span>
    </div>
    <div class="metric-content">
      <span class="metric-label">CTP</span>
      <span class="metric-value">{conformance.toFixed(1)}%</span>
    </div>
  </div>

  <div class="metric-card">
    <div class="metric-icon average">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="20" x2="12" y2="10"></line>
        <line x1="18" y1="20" x2="18" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="16"></line>
      </svg>
    </div>
    <div class="metric-content">
      <span class="metric-label">Average Made</span>
      <span class="metric-value">{averageMade.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
    </div>
  </div>
</div>

<style>
  .metrics-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    width: 100%;
    margin: 0 auto;
  }

  .metric-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 1.5rem;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .metric-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .metric-card:hover::before {
    opacity: 1;
  }

  .metric-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  .metric-card.success {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(16, 185, 129, 0.1) 100%);
  }

  .metric-card.warning {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(251, 191, 36, 0.1) 100%);
  }

  .metric-icon {
    width: 48px;
    height: 48px;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .metric-icon.planned {
    background: rgba(99, 102, 241, 0.1);
    color: #6366f1;
  }

  .metric-icon.made {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
  }

  .metric-icon.performance {
    background: transparent;
  }

  .metric-icon.average {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
  }

  .performance-emoji {
    font-size: 2rem;
  }

  .metric-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .metric-label {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .metric-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1e293b;
    line-height: 1;
  }

  @media (max-width: 768px) {
    .metrics-container {
      grid-template-columns: 1fr;
    }
    
    .metric-value {
      font-size: 1.5rem;
    }
  }
</style>