import React from 'react';
import styled, { keyframes } from 'styled-components';

const colors = {
  primary: '#2E2E2E',
  secondary: '#86868B',
  accent: '#06C',
  text: '#1D1D1F',
  light: '#FBFBFD',
  muted: '#86868B'
};

const Degree = styled.h3`
  font-size: 1.3rem;
  color: ${colors.text};
  margin-bottom: 0.5rem;
`;

const Institution = styled.p`
  color: ${colors.secondary};
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
`;

const Year = styled.span`
  color: ${colors.accent};
  font-size: 0.9rem;
`;

const EducationSection = styled.section`
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
`;

const EducationGrid = styled.div`
  padding: 2rem 4rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const EducationCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Achievements = styled.div`
  margin-top: 1rem;
`;

const Achievement = styled.div`
  padding: 0.5rem 0;
  color: ${colors.secondary};
`;

const Education = () => {
  const education = [
    {
      degree: "Bachelor of Technology - Electronics",
      institution: "Dr Ram Manohar Lohiya Awadh University",
      year: "1999 - 2003",
      achievements: [
        "Major in Electronics Engineering",
        "Specialized in Electronics and Communication"
      ]
    }
  ];

  return (
    <EducationSection>
      <Title>Education</Title>
      <EducationGrid>
        {education.map((edu, idx) => (
          <EducationCard key={idx} index={idx}>
            <Degree>{edu.degree}</Degree>
            <Institution>{edu.institution}</Institution>
            <Year>{edu.year}</Year>
            <Achievements>
              {edu.achievements.map((achievement, i) => (
                <Achievement key={i}>{achievement}</Achievement>
              ))}
            </Achievements>
          </EducationCard>
        ))}
      </EducationGrid>
    </EducationSection>
  );
};

export default Education;