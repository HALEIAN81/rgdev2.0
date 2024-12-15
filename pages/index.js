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

  const handleNavClick = (e) => {
    e.preventDefault();
    const targetSection = document.getElementById(e.target.getAttribute('href').slice(1));
    targetSection.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <ul className={styles.navLinks}>
          <li>
            <a href="#hero" onClick={handleNavClick}>Home</a>
          </li>
          <li>
            <a href="#projects" onClick={handleNavClick}>Projects</a>
          </li>
          <li>
            <a href="#contact" onClick={handleNavClick}>Contact</a>
          </li>
          <li>
            <a href="#resume" onClick={handleNavClick}>Resume</a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header id="hero" className={`${styles.section} ${styles.hero}`}>
      <h1>Full-Stack Mastery</h1>
<h2>Elevating Digital Experiences</h2>
<h3>A skilled developer specializing in React, Vue, Angular, ThreeJs.</h3>
<h3>and backend technologies like Node.js, Python (Django, Flask), and PHP (Laravel).</h3>
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
          <Image 
        src="/images/Gemini_Generated_Image_eztkbyeztk.jpeg" 
        alt="Project 1 Image" 
        width={500} 
        height={300} 
        className="project-img" 
      />
            <h5>Project 1</h5>
            <p>Arsenal Sales Training</p>
            <a href="#">View Project</a>
          </div>
          <div className={styles.projectCard}>
          <Image 
        src="/images/Gemini_Generated_Image_eztkbyeztk.jpeg" 
        alt="Project 1 Image" 
        width={500} 
        height={300} 
        className="project-img" 
      />
            <h5>Project 2</h5>
            <p>Labsender</p>
            <a href="#">View Project</a>
          </div>
          <div className={styles.projectCard}>
          <Image 
        src="/images/Gemini_Generated_Image_eztkbyeztk.jpeg" 
        alt="Project 1 Image" 
        width={500} 
        height={300} 
        className="project-img" 
      />
            <h5>Project 3</h5>
            <p>Delta Phoenix</p>
            <a href="#">View Project</a>
          </div>
          <div className={styles.projectCard}>
          <Image 
        src="/images/Gemini_Generated_Image_eztkbyeztk.jpeg" 
        alt="Project 1 Image" 
        width={500} 
        height={300} 
        className="project-img" 
      />
            <h5>Project 4</h5>
            <p>Love On a Leash</p>
            <a href="#">View Project</a>
          </div>
          <div className={styles.projectCard}>
          <Image 
        src="/images/Gemini_Generated_Image_eztkbyeztk.jpeg" 
        alt="Project 1 Image" 
        width={500} 
        height={300} 
        className="project-img" 
      />
            <h5>Project 5</h5>
            <p>TS Reports</p>
            <a href="#">View Project</a>
          </div>
          <div className={styles.projectCard}>
          <Image 
        src="/images/Gemini_Generated_Image_eztkbyeztk.jpeg" 
        alt="Project 1 Image" 
        width={500} 
        height={300} 
        className="project-img" 
      />
            <h5>Project 6</h5>
            <p>Frontier.Clinic</p>
            <a href="#">View Project</a>
          </div>
          <div className={styles.projectCard}>
          <Image 
        src="/images/Gemini_Generated_Image_eztkbyeztk.jpeg" 
        alt="Project 1 Image" 
        width={500} 
        height={300} 
        className="project-img" 
      />
            <h5>Project 7</h5>
            <p>Hale Verde.com</p>
            <a href="#">View Project</a>
          </div>
          <div className={styles.projectCard}>
          <Image 
        src="/images/Gemini_Generated_Image_eztkbyeztk.jpeg" 
        alt="Project 1 Image" 
        width={500} 
        height={300} 
        className="project-img" 
      />
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
      <input  type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="form-input"/>
    </div>
    <div className="form-group">
      <label  htmlFor="email">Email:</label>
      <input  type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email address"/>
    </div>
    <div className="form-group">
      <label  htmlFor="message">Message:</label>
      <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Write your message here"></textarea>
    </div>
    <button className="send-btn" type="submit"><span>🛸</span> SEND</button>
  </form>
</section>
{/* <section id="projects" className={styles.section5}>
        <h2>My Projects</h2>
        <p>Explore my work and creative endeavors.</p>
      </section> */}
    </div>
  );
}
