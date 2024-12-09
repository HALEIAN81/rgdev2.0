import styles from '../styles/style.module.css';
import initThreeJsWithModels from '../public/scripts.js'; // Updated import
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    initThreeJsWithModels(); // Initialize the updated Three.js scene
  }, []);

  return (
    <div>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <ul className={styles.navLinks}>
          <li>
            <a href="#hero">Home</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <a href="#resume">Resume</a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header id="hero" className={`${styles.section} ${styles.hero}`}>
        <h1>Welcome to My Portfolio</h1>
        <p>Discover my projects and get in touch!</p>
      </header>

      {/* Three.js Canvas */}
      <canvas className="webgl"></canvas>

      {/* Other Sections */}
      <section id="projects" className={styles.section}>
        <h2>My Projects</h2>
        <p>Explore my work and creative endeavors.</p>
      </section>
      <section id="contact" className={styles.section}>
        <h2>Contact Me</h2>
        <p>Feel free to reach out for collaborations or inquiries.</p>
      </section>
    </div>
  );
}
