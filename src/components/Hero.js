import React from 'react';
import styled, { keyframes } from 'styled-components';
import { breakpoints } from '../styles/breakpoints';

// First, define all animations/keyframes
const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Then define colors
const colors = {
  primary: '#2E2E2E',     // Dark gray
  secondary: '#86868B',   // Light gray
  accent: '#06C',         // Apple blue
  text: '#1D1D1F',       // Almost black
  light: '#FBFBFD',      // Apple white
  muted: '#86868B'       // Muted gray
};

// Then define styled components
const HeroSection = styled.section`
  min-height: 100vh;
  background: ${colors.light};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 6rem;
  z-index: 1;
  position: relative;
  padding: 3rem;

  @media (max-width: ${breakpoints.laptop}) {
    flex-direction: column;
    gap: 3rem;
    padding: 2rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const CertificationSection = styled.div`
  flex-shrink: 0;
  width: 300px;
  margin-top: 2rem;
`;

const CertificationGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  
  @media (max-width: 968px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

const CertificationBadge = styled.div`
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: 18px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.5s cubic-bezier(0.42, 0, 0.58, 1);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
  }
`;

const BadgeIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.2rem;
  opacity: 0.8;
  transition: all 0.3s ease;

  ${CertificationBadge}:hover & {
    transform: scale(1.1);
    opacity: 1;
  }
`;

const BadgeName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${colors.text};
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
`;

const BadgeType = styled.div`
  font-size: 0.9rem;
  color: ${colors.secondary};
  font-weight: 500;
  letter-spacing: -0.01em;
`;

const TextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Greeting = styled.h2`
  font-size: 1.8rem;
  color: ${colors.secondary};
  margin-bottom: 0.8rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  position: relative;
  display: inline-block;
  animation: ${slideUp} 0.8s ease-out;

  &::before {
    content: '';
    position: absolute;
    width: 40px;
    height: 2px;
    background: ${colors.accent};
    left: -60px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    animation: ${fadeIn} 0.5s ease-out forwards;
    animation-delay: 0.8s;
  }

  @media (max-width: 968px) {
    &::before {
      display: none;
    }
  }
`;

const Name = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  color: ${colors.text};
  margin-bottom: 1rem;
  letter-spacing: -0.03em;
  line-height: 1.1;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: 0.3s;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 3.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2.8rem;
  }
`;

const Title = styled.div`
  margin-bottom: 2rem;
`;

const TitleText = styled.h3`
  font-size: 2rem;
  color: ${colors.secondary};
  margin-bottom: 1.5rem;
  font-weight: 500;
  letter-spacing: -0.02em;
`;

const Highlights = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const HighlightBadge = styled.span`
  background: rgba(0, 0, 0, 0.05);
  color: ${colors.text};
  padding: 0.8rem 1.5rem;
  border-radius: 100px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  letter-spacing: -0.01em;

  &:hover {
    background: rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #4B5563;
  line-height: 1.6;
  margin: 0 auto 1rem;
  max-width: 600px;
  text-align: center;
`;

const CTAButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 1rem 0 1.5rem;
`;

const ButtonBase = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
`;

const SecondaryButton = styled(ButtonBase)`
  background: rgba(0, 0, 0, 0.05);
  color: ${colors.text};
  padding: 1rem 3rem;
  border-radius: 100px;
  font-size: 1.1rem;
  letter-spacing: -0.01em;
  margin: 0 auto;
  
  &:hover {
    background: rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const ButtonIcon = styled.span`
  font-size: 1.2rem;
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  margin-top: 0.5rem;
  
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -1.5rem;
    transform: translateY(-50%);
    width: 2px;
    height: 30px;
    background: linear-gradient(to bottom, transparent, rgba(79, 70, 229, 0.2), transparent);
  }

  &:last-child::after {
    display: none;
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${colors.text};
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: ${colors.secondary};
  letter-spacing: -0.01em;
`;

const StatDivider = styled.div`
  width: 1px;
  height: 40px;
  background: rgba(79, 70, 229, 0.2);
`;

const Education = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const EducationCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  padding: 1.5rem;
  border-radius: 15px;
  margin: 1rem 0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

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

const Hero = () => (
  <HeroSection>
    <ParticleBackground />
    <ContentWrapper>
      <CertificationSection>
        <CertificationGrid>
          <CertificationBadge>
            <BadgeIcon>🏆</BadgeIcon>
            <BadgeName>AWS Solutions Architect</BadgeName>
            <BadgeType>Professional</BadgeType>
          </CertificationBadge>
          <CertificationBadge>
            <BadgeIcon>🤖</BadgeIcon>
            <BadgeName>GSDC Generative AI</BadgeName>
            <BadgeType>Professional</BadgeType>
          </CertificationBadge>
          <CertificationBadge>
            <BadgeIcon>⚙️</BadgeIcon>
            <BadgeName>DevOps</BadgeName>
            <BadgeType>Professional</BadgeType>
          </CertificationBadge>
          <CertificationBadge>
            <BadgeIcon>🔄</BadgeIcon>
            <BadgeName>Functional Automation</BadgeName>
            <BadgeType>Professional</BadgeType>
          </CertificationBadge>
        </CertificationGrid>
      </CertificationSection>
      <TextContent>
        <Greeting>Hello, I'm</Greeting>
        <Name>Saurabh Dubey</Name>
        <Title>
          <TitleText>Generative AI & Cloud Automation Consultant</TitleText>
          <Highlights>
            <HighlightBadge>AWS Certified</HighlightBadge>
            <HighlightBadge>GenAI Certified Professional</HighlightBadge>
            <HighlightBadge>DevOps Professional</HighlightBadge>
          </Highlights>
        </Title>
        <Description>
          Pioneering the intersection of AI and Cloud Technologies with 21+ years of experience
          in delivering scalable, innovative solutions for global enterprises.
        </Description>
        <CTAButtons>
          <SecondaryButton 
            href="https://saurabhdsh.github.io/my-profile-website/resume.pdf"
            download="Saurabh_Dubey_Resume.pdf"
          >
            Download Resume
          </SecondaryButton>
        </CTAButtons>
        <Stats>
          <StatItem>
            <StatNumber>21+</StatNumber>
            <StatLabel>Years Experience</StatLabel>
          </StatItem>
          <StatDivider />
          <StatItem>
            <StatNumber>50+</StatNumber>
            <StatLabel>Projects Delivered</StatLabel>
          </StatItem>
          <StatDivider />
          <StatItem>
            <StatNumber>100%</StatNumber>
            <StatLabel>Client Satisfaction</StatLabel>
          </StatItem>
        </Stats>
        <Education>
          <EducationCard>
            <Degree>Bachelor of Technology - Electronics</Degree>
            <Institution>Dr Ram Manohar Lohiya Awadh University</Institution>
            <Year>1999 - 2003</Year>
          </EducationCard>
        </Education>
      </TextContent>
    </ContentWrapper>
  </HeroSection>
);

const ParticleBackground = () => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let time = 0;

    // Update particle animation colors
    const particleColors = [
      { r: 46, g: 46, b: 46, a: 0.06 },    // Dark gray
      { r: 134, g: 134, b: 139, a: 0.04 }, // Light gray
      { r: 0, g: 102, b: 204, a: 0.05 }    // Apple blue
    ];

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    const connect = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(79, 70, 229, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connect();
      time++;
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    init();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      init();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <Canvas ref={canvasRef} />
  );
};

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export default Hero;
