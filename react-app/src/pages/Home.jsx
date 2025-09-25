import React from "react";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <div className="top-line"></div>

      <Header />

      <main>
        {/* Hero Section */}
        <section id="hero">
          <div className="hero-overlay"></div>
          <div className="hero-church-name">
            <img src="/Images/another_logo.png" alt="" />
          </div>
          <div className="container">
            <div className="hero-content">
              <p className="hero-scripture">Hebrews 4:12</p>
              <h1 className="hero-title">
                For The Word Of God Is Living And Active,
              </h1>
              <p className="hero-subtitle">
                sharper than any two-edged sword, piercing to the division of soul
                and of spirit...
              </p>
              <div className="hero-buttons">
                <a href="#" className="btn btn-primary">Join Us Now</a>
                <a href="#" className="btn btn-secondary">Read More</a>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="content-section fade-in-section">
          <div className="container about-container">
            <div className="about-image">
              <img src="../Images/congregation.jpg" alt="Church interior" />
            </div>
            <div className="about-content">
              <h2 className="section-title">Welcome to New Jerusalem of All Nations</h2>
              <p className="section-subtitle">A place of faith, hope, and community.</p>
              <p>
                We are a vibrant community dedicated to sharing the love of Christ
                and the teachings of the Bible. Our mission is to create a welcoming
                environment where people can grow in their faith, connect with
                others, and make a positive impact in the world.
              </p>
              <p>
                Whether you are new to the area or searching for a spiritual home, we
                invite you to join us for our services and events.
              </p>
              <a href="#" className="btn btn-tertiary">
                Our Beliefs <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>

        {/* Sermons */}
        {/* (your sermons section goes here, unchanged except for JSX rules) */}

        {/* Events */}
        {/* (same here – just JSX version) */}

        {/* Contact */}
        {/* (same here – just JSX version) */}
      </main>

      {/* Footer */}
      <footer id="footer">
        {/* (Footer code unchanged, just JSX rules applied) */}
      </footer>
    </>
  );
};

export default Home;
