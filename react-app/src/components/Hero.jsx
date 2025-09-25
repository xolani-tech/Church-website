function Hero() {
  return (
    <section id="hero" style={{ backgroundImage: "url('hero-bg.jpg')" }}>
      <div className="hero-overlay"></div>
      <div className="hero-church-name">
        <img src="logo.png" alt="Church Logo" />
      </div>
      <div className="hero-content">
        <p className="hero-scripture">John 3:16</p>
        <h1 className="hero-title">Welcome to Our Church</h1>
        <p className="hero-subtitle">We’re glad you’re here.</p>
        <a href="#about" className="btn btn-primary">Get Started</a>
        <a href="#sermons" className="btn btn-secondary">Watch Sermons</a>
      </div>
    </section>
  );
}

export default Hero;
