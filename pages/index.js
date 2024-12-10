import styles from '../styles/style.module.css';
import initThreeJsWithModels from '../public/scripts.js'; // Updated import
import { useEffect, useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send email or trigger API call
    console.log(formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

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
      <section id="projects" className={styles.section2}>
        <h2>My Projects</h2>
        <p>Explore my work and creative endeavors.</p>
      </section>
      <section id="newSection2" className={styles.section3}>
        <div className={styles.projectCards}>
          <div className={styles.projectCard}>
          <img className="project-img" src="../images/Gemini_Generated_Image_eztkbyeztkbyeztk.jpeg" alt="Project 1 Image" />
            <h5>Project 1</h5>
            <p>Description of Project 1</p>
            <a href="#">View Project</a>
          </div>
          <div className={styles.projectCard}>
          <img className="project-img" src="../images/Gemini_Generated_Image_eztkbyeztkbyeztk.jpeg" alt="Project 1 Image" />
            <h5>Project 2</h5>
            <p>Description of Project 2</p>
            <a href="#">View Project</a>
          </div>
          <div className={styles.projectCard}>
          <img className="project-img" src="../images/Gemini_Generated_Image_eztkbyeztkbyeztk.jpeg" alt="Project 1 Image" />
            <h5>Project 3</h5>
            <p>Description of Project 3</p>
            <a href="#">View Project</a>
          </div>
          <div className={styles.projectCard}>
          <img className="project-img" src="../images/Gemini_Generated_Image_eztkbyeztkbyeztk.jpeg" alt="Project 1 Image" />
            <h5>Project 4</h5>
            <p>Description of Project 4</p>
            <a href="#">View Project</a>
          </div>
          <div className={styles.projectCard}>
          <img className="project-img" src="../images/Gemini_Generated_Image_eztkbyeztkbyeztk.jpeg" alt="Project 1 Image" />
            <h5>Project 5</h5>
            <p>Description of Project 5</p>
            <a href="#">View Project</a>
          </div>
          <div className={styles.projectCard}>
          <img className="project-img" src="../images/Gemini_Generated_Image_eztkbyeztkbyeztk.jpeg" alt="Project 1 Image" />
            <h5>Project 6</h5>
            <p>Description of Project 6</p>
            <a href="#">View Project</a>
          </div>
          <div className={styles.projectCard}>
          <img className="project-img" src="../images/Gemini_Generated_Image_eztkbyeztkbyeztk.jpeg" alt="Project 1 Image" />
            <h5>Project 7</h5>
            <p>Description of Project 7</p>
            <a href="#">View Project</a>
          </div>
          <div className={styles.projectCard}>
          <img className="project-img" src="../images/Gemini_Generated_Image_eztkbyeztkbyeztk.jpeg" alt="Project 1 Image" />
            <h5>Project 8</h5>
            <p>Description of Project 8</p>
            <a href="#">View Project</a>
          </div>
          {/* Add more project cards as needed */}
        </div>
      </section>
      <section id="contact" className={styles.section4}>
        <h2>Contact Me</h2>
        
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label  htmlFor="name">Name:</label>
      <input  type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label  htmlFor="email">Email:</label>
      <input  type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label  htmlFor="message">Message:</label>
      <textarea id="message" name="message" value={formData.message} onChange={handleChange}></textarea>
    </div>
    <button className="send-btn" type="submit">Send Message</button>
  </form>
</section>
{/* <section id="projects" className={styles.section5}>
        <h2>My Projects</h2>
        <p>Explore my work and creative endeavors.</p>
      </section> */}
    </div>
  );
}
