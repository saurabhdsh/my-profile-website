import React, { useRef, useEffect, useState, Suspense, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Colors
const colors = {
  primary: '#2E2E2E',     
  secondary: '#86868B',   
  accent: '#06C',         
  text: '#1D1D1F',       
  light: '#FBFBFD',      
  muted: '#86868B'       
};

// Animations
const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

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

const pulseScale = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
    color: ${colors.accent};
  }
  100% {
    transform: scale(1);
  }
`;

const highlightPulse = keyframes`
  0% { 
    background-size: 100% 0;
    color: ${colors.text};
  }
  50% { 
    background-size: 100% 100%;
    color: #06C;
  }
  100% { 
    background-size: 100% 0;
    color: ${colors.text};
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const glowPulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(6, 204, 255, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(6, 204, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(6, 204, 255, 0); }
`;

// Styled Components for Text Highlights
const HighlightedText = styled.span`
  display: inline-block;
  background: linear-gradient(to bottom, transparent 50%, rgba(6, 204, 255, 0.15) 50%);
  background-size: 100% 0;
  background-repeat: no-repeat;
  transition: all 0.4s ease;
  padding: 0 4px;
  margin: 0 -4px;
  animation: ${highlightPulse} 4s infinite;
  animation-delay: ${props => props.delay || '0s'};
  font-weight: 500;
  
  &:hover {
    background-size: 100% 100%;
    color: #06C;
    transform: scale(1.05);
  }
`;

const HighlightedNumber = styled(HighlightedText)`
  font-weight: 700;
  color: ${colors.accent};
  animation: ${pulseScale} 3s infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

// Scroll Progress Indicator
const ScrollProgress = styled.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 100px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: ${props => props.progress}%;
    background: ${colors.accent};
    border-radius: 3px;
    transition: height 0.3s ease;
  }
`;

// Basic Layout Components
const ExperienceSection = styled.section`
  padding: 0;
  background: ${colors.light};
  min-height: 100vh;
  width: 100vw;
  position: relative;
  z-index: 1;
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
  transform-origin: left center;
  animation: ${slideInLeft} 0.8s ease-out;
  width: 100%;
  
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

// Highlights Section
const ExperienceHighlights = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 4rem;
  margin-bottom: 2rem;
  animation: ${fadeInUp} 0.8s ease-out;
  width: 100%;
`;

const HighlightItem = styled.div`
  font-size: 1.2rem;
  color: ${colors.secondary};
  line-height: 1.6;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Timeline Components
const TimelineContainer = styled.div`
  padding: 2rem 4rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
`;

const CompanyCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: ${props => props.index * 0.2}s;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, ${colors.accent}, transparent);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectsContainer = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
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
    transform: translateY(-3px);
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
  line-height: 1.5;
`;

const Year = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.accent};
  margin-bottom: 0.5rem;
`;

const Company = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${colors.text};
  margin-bottom: 0.5rem;
`;

const Location = styled.div`
  font-size: 1rem;
  color: ${colors.secondary};
`;

const Role = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${colors.text};
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: ${colors.secondary};
  line-height: 1.8;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
`;

// Update the timeline data
const timelineData = [
  {
    period: {
      year: "2010 – Present",
      company: "TATA CONSULTANCY SERVICES",
      location: "Bengaluru, India"
    },
    role: "Consultant",
    description: "Generative AI and Automation Consultant with extensive experience designing and implementing AI-driven solutions across healthcare, life sciences, retail, and enterprise applications. Expertise in leveraging Generative AI tools (OpenAI, LangChain) and automation frameworks to optimize workflows, drive innovation, and reduce costs.",
    useCases: [
      {
        heading: "Productivity Analytics",
        text: "Developed a Generative AI-based tool to capture and analyze Copilot metrics usage, providing insights into productivity improvement across teams."
      },
      {
        heading: "SLLMs for Architecture Modernization",
        text: "Designed GenAI-powered SLLMs to eliminate MSA (Microservices Architecture) dependencies for a legacy application, improving scalability and maintainability."
      },
      {
        heading: "Healthcare Automation",
        text: "Deployed an AI-powered document analysis system for clinical data, reducing processing time by 40% and enhancing data accuracy."
      },
      {
        heading: "Retail Optimization",
        text: "Built predictive analytics models for inventory management, reducing wastage by 20% and saving millions in operational costs."
      },
      {
        heading: "Customer Engagement",
        text: "Implemented AI-driven chatbots for patient support and retail customer queries, improving response time and user satisfaction by over 30%."
      },
      {
        heading: "AI for DevOps",
        text: "Developed end-to-end automation frameworks, integrating CI/CD pipelines with AI capabilities to accelerate software delivery by 60%."
      }
    ],
    skills: "Skilled in cloud-native architectures (AWS, Azure), cross-functional collaboration, and delivering scalable, impactful solutions that align with strategic business goals."
  },
  {
    period: {
      year: "2008 – 2010",
      company: "Infosys Technologies",
      location: "Bengaluru, India"
    },
    role: "Programmer Analyst",
    useCases: [
      {
        heading: "Cloud Automation Strategy",
        text: "Designed and implemented test automation strategies tailored to cloud-native applications on AWS, ensuring alignment with project goals and comprehensive validation of functional and non-functional requirements, including performance and scalability."
      },
      {
        heading: "Scripting and Framework Development",
        text: "Developed and maintained automation scripts using Python, Java, and cloud-based testing tools, contributing to the enhancement of automation frameworks for improved scalability, maintainability, and seamless integration with AWS services (e.g., Lambda, S3, RDS)."
      },
      {
        heading: "Functional Automation",
        text: "Collaborated with cross-functional teams to develop test plans for cloud-based solutions, identifying automation opportunities and ensuring thorough validation of AWS deployments. Automated test execution for CI/CD pipelines, analyzing results and generating actionable insights for stakeholders."
      },
      {
        heading: "Tool Selection and Integration",
        text: "Assessed and integrated industry-standard tools (e.g., Terraform, Selenium, Appium) and AWS-native services into testing workflows to enhance automation efficiency and ensure the reliability of results. Optimized AWS architecture testing to validate security, compliance, and scalability."
      },
      {
        heading: "AWS Functional Validation",
        text: "Conducted detailed validation of cloud-based functionalities, including API integrations, serverless architectures, and storage solutions, ensuring resilient and robust application performance in a cloud environment."
      }
    ]
  },
  {
    period: {
      year: "2006 – 2008",
      company: "Cognizant Technologies",
      location: "Bengaluru, India"
    },
    role: "Automation Consultant",
    useCases: [
      {
        heading: "Client Engagement",
        text: "Engaged with clients worldwide to understand their unique business needs, challenges, and testing requirements. Provided tailored test automation consultancy services to enhance their testing processes."
      },
      {
        heading: "Technology Expertise",
        text: "Demonstrated proficiency in working with diverse technologies, platforms, and application architectures. Adapted quickly to new technologies and provided strategic guidance on the selection of appropriate automation tools and frameworks."
      },
      {
        heading: "Global Project Leadership",
        text: "Led international teams in implementing test automation solutions for clients in various industries. Collaborated with on-site and remote teams to ensure seamless communication, project delivery, and client satisfaction."
      },
      {
        heading: "Automation Strategy Development",
        text: "Developed comprehensive test automation strategies aligned with clients' business goals. Conducted feasibility studies, risk assessments."
      }
    ]
  },
  {
    period: {
      year: "2003 – 2006",
      company: "Sway Technologies",
      location: "Bengaluru, India"
    },
    role: "Analyst - Automation (Embedded)",
    description: "Define and execute the automation strategy, including selecting appropriate tools and frameworks. Identify opportunities for test automation and assess the feasibility of automation for different components.",
    useCases: [
      {
        heading: "Script Development & Maintenance",
        text: "Write, review, and maintain automated test scripts using scripting or programming languages (e.g., Selenium, Java, Python). Ensure that automated scripts are efficient, maintainable, and reusable."
      },
      {
        heading: "Test Execution & Analysis",
        text: "Execute automated test scripts and analyze test results. Investigate and troubleshoot test failures, identifying root causes and providing feedback to development teams."
      },
      {
        heading: "Collaboration & Quality",
        text: "Collaborate with developers, business analysts, and other team members to understand product functionality and identify automation opportunities. Participate in code reviews and contribute to overall product quality."
      },
      {
        heading: "Infrastructure Management",
        text: "Evaluate and recommend automation tools and frameworks based on project requirements. Implement and maintain automated testing tools and infrastructure."
      }
    ]
  }
];

// Update the Experience component render method
const Experience = () => {
  return (
    <ExperienceSection>
      <Title>Experience</Title>
      <ExperienceHighlights>
        <HighlightItem>
          <span>Leading teams of</span>
          <HighlightedNumber delay="0.3s">100+ engineers</HighlightedNumber>
        </HighlightItem>
        <HighlightItem>
          <span>Delivery experience of</span>
          <HighlightedNumber delay="0.6s">150+ team members</HighlightedNumber>
          <span>for Fortune 500 clients</span>
        </HighlightItem>
        <HighlightItem>
          Delivery experience across{' '}
          <HighlightedText delay="0.9s">Health & Life Sciences</HighlightedText>,{' '}
          <HighlightedText delay="1.2s">Retail</HighlightedText>,{' '}
          <HighlightedText delay="1.5s">Manufacturing</HighlightedText>, and{' '}
          <HighlightedText delay="1.8s">Insurance</HighlightedText>
        </HighlightItem>
      </ExperienceHighlights>
      <TimelineContainer>
        {timelineData.map((company, idx) => (
          <CompanyCard key={idx} index={idx}>
            <CompanyHeader>
              <Year>{company.period.year}</Year>
              <Company>{company.period.company}</Company>
              <Location>{company.period.location}</Location>
            </CompanyHeader>
            <Role>
              <HighlightedText delay="0s">{company.role}</HighlightedText>
            </Role>
            {company.description && (
              <Description>{company.description}</Description>
            )}
            <ProjectsContainer>
              {company.useCases.map((useCase, useCaseIdx) => (
                <ProjectCard key={useCaseIdx} delay={useCaseIdx * 0.2}>
                  <ProjectTitle>
                    <HighlightedText delay={`${useCaseIdx * 0.2}s`}>
                      {useCase.heading}
                    </HighlightedText>
                  </ProjectTitle>
                  <ProjectDescription>{useCase.text}</ProjectDescription>
                </ProjectCard>
              ))}
            </ProjectsContainer>
          </CompanyCard>
        ))}
      </TimelineContainer>
    </ExperienceSection>
  );
};

// Add loading spinner
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: ${colors.accent};
  animation: ${spin} 1s ease-in-out infinite;
  margin: 20px auto;
`;

// Add new styled components
const CompanyHeader = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${colors.accent}20;
`;

export default Experience; 