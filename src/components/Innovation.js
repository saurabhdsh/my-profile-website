import React from 'react';
import styled, { keyframes } from 'styled-components';
import { breakpoints } from '../styles/breakpoints';

const colors = {
  primary: '#2E2E2E',
  secondary: '#86868B',
  accent: '#06C',
  text: '#1D1D1F',
  light: '#FBFBFD',
  muted: '#86868B'
};

const expandLine = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const innovations = [
  {
    category: "AI & Machine Learning",
    projects: [
      {
        title: "GenAI-Powered Code Analysis",
        description: "Developed an AI system that analyzes code quality and suggests improvements using advanced language models.",
        impact: "40% reduction in code review time",
        tech: ["OpenAI", "Python", "NLP"]
      },
      {
        title: "Automated Documentation Generator",
        description: "Created an AI tool that generates technical documentation from code and comments.",
        impact: "60% faster documentation process",
        tech: ["LangChain", "GPT-4", "Node.js"]
      }
    ]
  },
  {
    category: "Cloud Architecture",
    projects: [
      {
        title: "Serverless Microservices Framework",
        description: "Designed a framework for rapid deployment of serverless applications with built-in monitoring.",
        impact: "75% reduction in deployment time",
        tech: ["AWS Lambda", "Terraform", "CloudWatch"]
      },
      {
        title: "Multi-Cloud Orchestration Platform",
        description: "Built a platform for managing applications across multiple cloud providers.",
        impact: "30% cost optimization",
        tech: ["Kubernetes", "Docker", "AWS/Azure"]
      }
    ]
  },
  {
    category: "DevOps Automation",
    projects: [
      {
        title: "Intelligent CI/CD Pipeline",
        description: "Implemented ML-powered pipeline that predicts build failures and optimizes test execution.",
        impact: "50% faster build times",
        tech: ["Jenkins", "Python ML", "Docker"]
      },
      {
        title: "Infrastructure as Code Generator",
        description: "Developed tool that generates IaC templates based on application requirements.",
        impact: "80% faster infrastructure setup",
        tech: ["Terraform", "AWS CDK", "Python"]
      }
    ]
  }
];

const Innovation = () => {
  return (
    <InnovationSection>
      <Title>Innovation</Title>
      <InnovationGrid>
        {innovations.map((category, idx) => (
          <CategoryCard key={idx} index={idx}>
            <CategoryTitle>{category.category}</CategoryTitle>
            <ProjectsContainer>
              {category.projects.map((project, projectIdx) => (
                <ProjectCard key={projectIdx} delay={projectIdx * 0.2}>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ImpactBadge>{project.impact}</ImpactBadge>
                  <TechStack>
                    {project.tech.map((tech, techIdx) => (
                      <TechBadge key={techIdx}>{tech}</TechBadge>
                    ))}
                  </TechStack>
                </ProjectCard>
              ))}
            </ProjectsContainer>
          </CategoryCard>
        ))}
      </InnovationGrid>
    </InnovationSection>
  );
};

const InnovationSection = styled.section`
  padding: 0;
  background: ${colors.light};
  min-height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: ${colors.text};
  text-align: left;
  margin: 0;
  padding: 2rem 4rem;
  letter-spacing: -0.02em;
  position: sticky;
  top: 0;
  background: ${colors.light};
  z-index: 2;
  backdrop-filter: blur(10px);
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 4rem;
    width: 60px;
    height: 3px;
    background: ${colors.accent};
    transform-origin: left;
    animation: ${expandLine} 0.8s ease-out forwards;
  }
`;

const InnovationGrid = styled.div`
  padding: 2rem 4rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1rem;
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: ${props => props.index * 0.2}s;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.8rem;
  color: ${colors.text};
  margin-bottom: 1.5rem;
  border-bottom: 2px solid ${colors.accent};
  padding-bottom: 0.5rem;
`;

const ProjectsContainer = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const ProjectCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.5s ease-out forwards;
  animation-delay: ${props => props.delay}s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ProjectTitle = styled.h4`
  font-size: 1.2rem;
  color: ${colors.text};
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: ${colors.secondary};
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ImpactBadge = styled.div`
  display: inline-block;
  background: ${colors.accent}15;
  color: ${colors.accent};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechBadge = styled.span`
  background: rgba(0, 0, 0, 0.05);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  color: ${colors.secondary};
`;

export default Innovation; 