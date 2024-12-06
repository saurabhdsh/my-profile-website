import React, { useState } from 'react';
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

const PrimaryButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgb(16, 185, 129);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 30px;
  font-size: 1.2rem;
  text-decoration: none;
  transition: all 0.3s ease;
  justify-content: center;
  margin: 1rem auto;
  width: fit-content;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
    background: rgba(16, 185, 129, 0.9);
  }
`;

const Contact = () => {
  return (
    <ContactSection>
      <Title>Let's Connect</Title>
      <ContactContainer>
        <ContactInfo>
          <InfoCardContainer>
            <InfoCard>
              <IconWrapper>📍</IconWrapper>
              <InfoTitle>Location</InfoTitle>
              <InfoText>Bengaluru, India</InfoText>
            </InfoCard>
            <InfoCard>
              <IconWrapper>📧</IconWrapper>
              <InfoTitle>Email</InfoTitle>
              <InfoText>saurabhdvns@gmail.com</InfoText>
            </InfoCard>
            <InfoCard>
              <IconWrapper>📱</IconWrapper>
              <InfoTitle>Mobile</InfoTitle>
              <InfoText>
                +91 7892879804
                <WhatsAppLink 
                  href="https://wa.me/917892879804" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon>💬</WhatsAppIcon>
                </WhatsAppLink>
              </InfoText>
            </InfoCard>
          </InfoCardContainer>
          
          <PrimaryButton href="mailto:saurabhdvns@gmail.com">
            <span>✉️</span>
            Hire Me
          </PrimaryButton>
          
          <SocialLinks>
            <SocialIcon 
              href="https://www.linkedin.com/in/saurabhdubeyit" 
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </SocialIcon>
            <SocialIcon 
              href="https://github.com/saurabhdsh" 
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </SocialIcon>
          </SocialLinks>
        </ContactInfo>
      </ContactContainer>
    </ContactSection>
  );
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

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

// Styled Components
const ContactSection = styled.section`
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
    background: rgb(16, 185, 129);
    transform-origin: left;
    animation: ${expandLine} 0.8s ease-out forwards;
  }
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 2rem 4rem;
  
  @media (max-width: ${breakpoints.tablet}) {
    padding: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: ${fadeIn} 0.8s ease-out;
  width: 100%;
  max-width: 1000px;
`;

const InfoCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  animation: ${float} 3s ease-in-out infinite;
  transition: all 0.3s ease;
`;

const InfoTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${colors.text};
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
`;

const InfoText = styled.p`
  color: ${colors.secondary};
  transition: all 0.3s ease;
`;

const InfoCard = styled.div`
  background: rgba(236, 253, 245, 0.8);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.1);
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(16, 185, 129, 0.15);
    background: rgba(16, 185, 129, 0.9);
    
    ${IconWrapper}, ${InfoTitle}, ${InfoText} {
      color: white;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
`;

const SocialIcon = styled.a`
  color: rgb(16, 185, 129);
  text-decoration: none;
  padding: 0.8rem 2rem;
  border-radius: 20px;
  background: rgba(16, 185, 129, 0.1);
  transition: all 0.3s ease;
  font-size: 1.1rem;
  
  &:hover {
    background: rgba(16, 185, 129, 0.9);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  }
`;

const WhatsAppLink = styled.a`
  display: inline-flex;
  align-items: center;
  margin-left: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const WhatsAppIcon = styled.span`
  font-size: 1.2rem;
  animation: ${float} 3s ease-in-out infinite;
`;

export default Contact;
