<header class="header">
  <div class="header-content">
    <div class="logo-section">
      <span class="logo">🎄</span>
      <h1 class="site-title">Yule Dash</h1>
    </div>
    <nav class="nav-links">
      <span class="nav-item">Production Tracker</span>
    </nav>
  </div>
</header>

<style>
  .header {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 50;
    transition: all 0.3s ease;
  }

  .header-content {
    max-width: 1280px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .logo {
    font-size: 2rem;
    animation: float 3s ease-in-out infinite;
  }

  .site-title {
    font-size: 1.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #10b981 0%, #dc2626 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
  }

  .nav-item {
    color: #64748b;
    font-weight: 500;
    transition: color 0.3s ease;
    cursor: pointer;
  }

  .nav-item:hover {
    color: #10b981;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  @media (max-width: 640px) {
    .header-content {
      padding: 1rem;
    }
    
    .site-title {
      font-size: 1.25rem;
    }
    
    .nav-links {
      display: none;
    }
  }
</style>
