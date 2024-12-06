import React from 'react';
import styled from 'styled-components';

const About = () => (
  <AboutSection>
    <h2>About Me</h2>
    <p>
      Certified AI professional with 21 years of experience in Generative AI, Cloud Architecture, and Automation Consulting. Expert in delivering scalable AI-driven solutions for healthcare, retail, and enterprise applications.
    </p>
    <h3>Certifications</h3>
    <ul>
      <li>GSDC Generative AI Professional</li>
      <li>AWS Certified Solutions Architect - Professional</li>
    </ul>
  </AboutSection>
);

const AboutSection = styled.section`
  padding: 3rem 2rem;
  text-align: center;
  background: #f9f9f9;
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.2rem;
    color: #555;
  }
  h3 {
    margin-top: 2rem;
  }
  ul {
    list-style: none;
    padding: 0;
    li {
      margin: 0.5rem 0;
      font-size: 1.1rem;
    }
  }
`;

export default About;
