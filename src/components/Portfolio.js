import React from 'react';
import styled from 'styled-components';

const projects = [
  {
    title: 'AI-powered Conversational Agent',
    description: 'Improved customer query resolution by 45% for a healthcare provider.',
  },
  {
    title: 'Generative AI Models',
    description: 'Created GAN-based models achieving state-of-the-art performance.',
  },
  {
    title: 'Cloud Migration Project',
    description: 'Led a multi-million-dollar migration project to AWS.',
  },
];

const Portfolio = () => (
  <PortfolioSection>
    <h2>Portfolio</h2>
    <ProjectGrid>
      {projects.map((project, index) => (
        <ProjectCard key={index}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </ProjectCard>
      ))}
    </ProjectGrid>
  </PortfolioSection>
);

const PortfolioSection = styled.section`
  padding: 3rem 2rem;
  background: white;
  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ProjectCard = styled.div`
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  h3 {
    margin-bottom: 1rem;
  }
`;

export default Portfolio;
