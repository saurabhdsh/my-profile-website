import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { breakpoints } from '../styles/breakpoints';

const colors = {
  primary: '#2E2E2E',
  secondary: '#86868B',
  accent: '#06C',
  text: '#1D1D1F',
  light: '#FBFBFD',  // This is used in the Title background
  muted: '#86868B'
};

const ParticleAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mousePosition = { x: null, y: null };
    let time = 0;

    const particleColors = [
      { r: 0, g: 180, b: 216 },     // Bright Cyan
      { r: 101, g: 31, b: 255 },    // Electric Purple
      { r: 0, g: 134, b: 255 },     // Bright Blue
      { r: 0, g: 180, b: 216 }      // Repeat first color
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

        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX;
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 1)`;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (100 - distance) / 100 * 0.8;

            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );

            gradient.addColorStop(0, `rgba(${particles[i].color.r}, ${particles[i].color.g}, ${particles[i].color.b}, ${opacity})`);
            gradient.addColorStop(1, `rgba(${particles[j].color.r}, ${particles[j].color.g}, ${particles[j].color.b}, ${opacity})`);

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      // Clear canvas with less fade for sharper appearance
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      time++;
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mousePosition.x = e.clientX;
      mousePosition.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mousePosition.x = null;
      mousePosition.y = null;
    };

    resizeCanvas();
    init();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      init();
    });
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <Canvas ref={canvasRef} />;
};

const Achievements = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const timelineRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    
    // Auto-scrolling function
    const autoScroll = () => {
      if (!isHovering && timeline) {
        scrollRef.current = requestAnimationFrame(() => {
          timeline.scrollTop += 1; // Adjust speed by changing this value
          
          // Reset scroll to top when reached bottom
          if (timeline.scrollTop >= timeline.scrollHeight - timeline.clientHeight) {
            timeline.scrollTop = 0;
          }
          
          autoScroll();
        });
      }
    };

    autoScroll();

    return () => {
      if (scrollRef.current) {
        cancelAnimationFrame(scrollRef.current);
      }
    };
  }, [isHovering]);

  const achievements = [
    {
      year: '2024',
      title: 'Pioneered Large Language Model Implementation',
      description: 'Led the development and deployment of custom LLMs for enterprise clients, resulting in a 60% improvement in task automation and a 40% reduction in operational costs.',
      icon: '🤖',
      color: '#4F46E5'
    },
    {
      year: '2024',
      title: 'Advanced Generative AI Solutions',
      description: 'Developed and deployed a cutting-edge AI-powered conversational agent for healthcare, improving query resolution time by 45% and user satisfaction by 30%.',
      icon: '🧠',
      color: '#7C3AED'
    },
    {
      year: '2023',
      title: 'AWS Cloud Architecture Excellence',
      description: 'Designed and implemented serverless architecture for Fortune 500 client, reducing infrastructure costs by 35% and improving scalability with AWS Lambda and ECS.',
      icon: '☁️',
      color: '#2563EB'
    },
    {
      year: '2023',
      title: 'DevOps Transformation Leadership',
      description: 'Spearheaded implementation of GitOps practices and ArgoCD for 100+ microservices, reducing deployment time by 70% and achieving 99.99% uptime.',
      icon: '🔄',
      color: '#0EA5E9'
    },
    {
      year: '2022',
      title: 'Multi-Cloud Migration Success',
      description: 'Led a $5M cloud migration project, successfully transitioning legacy systems to AWS and Azure, reducing operational costs by 25% and improving system reliability.',
      icon: '🌐',
      color: '#06B6D4'
    },
    {
      year: '2022',
      title: 'Kubernetes Excellence',
      description: 'Architected and deployed enterprise-grade Kubernetes clusters across multiple regions, implementing advanced auto-scaling and achieving 40% resource optimization.',
      icon: '⚙️',
      color: '#3B82F6'
    },
    {
      year: '2021',
      title: 'CI/CD Pipeline Innovation',
      description: 'Revolutionized deployment processes by implementing advanced CI/CD pipelines with Jenkins and GitHub Actions, reducing release cycles from weeks to hours.',
      icon: '🔧',
      color: '#6366F1'
    },
    {
      year: '2021',
      title: 'Infrastructure as Code Pioneer',
      description: 'Implemented comprehensive IaC using Terraform and AWS CloudFormation, achieving 100% infrastructure automation and reducing provisioning time by 80%.',
      icon: '📝',
      color: '#8B5CF6'
    },
    {
      year: '2021',
      title: 'Security Automation Framework',
      description: 'Developed automated security scanning and compliance checking framework, reducing security vulnerabilities by 75% and achieving SOC2 compliance.',
      icon: '🔒',
      color: '#A855F7'
    },
    {
      year: '2021',
      title: 'Monitoring & Observability',
      description: 'Implemented comprehensive monitoring solution using Prometheus, Grafana, and ELK stack, improving incident response time by 60% and system reliability.',
      icon: '📊',
      color: '#EC4899'
    }
  ];

  return (
    <AchievementsSection>
      <ParticleAnimation />
      <ContentWrapper>
        <Title>Achievements</Title>
        <TimelineWrapper
          ref={timelineRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {achievements.map((achievement, index) => (
            <TimelineItem
              key={index}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              $color={achievement.color}
            >
              <YearBadge>{achievement.year}</YearBadge>
              <IconBubble $color={achievement.color}>
                <span>{achievement.icon}</span>
              </IconBubble>
              <ContentCard isActive={activeIndex === index}>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
              </ContentCard>
            </TimelineItem>
          ))}
        </TimelineWrapper>
      </ContentWrapper>
    </AchievementsSection>
  );
};

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

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const shine = keyframes`
  0% { background-position: 200% center; }
  100% { background-position: -200% center; }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${colors.text};
  text-align: left;
  margin: 0;
  padding: 2rem 4rem;
  letter-spacing: -0.02em;
  position: sticky;
  top: 0;
  z-index: 2;
  backdrop-filter: blur(10px);
  transform-origin: left center;
  animation: ${slideInLeft} 0.8s ease-out;
  width: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, #ffffff, #f8f9fa);
    opacity: 0.95;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 4rem;
    width: 60px;
    height: 3px;
    background: #4F46E5;
    transform-origin: left;
    animation: ${expandLine} 0.8s ease-out forwards;
  }
`;

const TimelineWrapper = styled.div`
  padding: 2rem;
  
  @media (max-width: ${breakpoints.tablet}) {
    padding: 1rem;
  }

  &::before {
    @media (max-width: ${breakpoints.mobile}) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  cursor: pointer;
  position: relative;
  opacity: ${props => props.isActive ? 1 : 0.7};
  transform: scale(${props => props.isActive ? 1.02 : 1});
  transition: all 0.3s ease;

  &:nth-child(odd) {
    flex-direction: row-reverse;
    
    ${props => props.isActive && `
      transform: translateX(-20px) scale(1.02);
    `}
  }

  &:nth-child(even) {
    ${props => props.isActive && `
      transform: translateX(20px) scale(1.02);
    `}
  }

  &:hover {
    opacity: 1;
    transform: scale(1.02);
  }

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    margin: 3rem 0;
  }
`;

const YearBadge = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #4F46E5, #0EA5E9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const IconBubble = styled.div`
  width: 60px;
  height: 60px;
  background: ${props => props.$color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: ${float} 3s ease-in-out infinite;
  z-index: 2;

  span {
    font-size: 1.5rem;
  }
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  flex: 1;
  max-width: 500px;
  transform: translateY(${props => props.isActive ? '0' : '20px'});
  opacity: ${props => props.isActive ? 1 : 0.8};
  transition: all 0.3s ease;

  h3 {
    color: #1F2937;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    color: #4B5563;
    line-height: 1.6;
    font-size: 1rem;
  }

  &:hover {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const AchievementsSection = styled.section`
  position: relative;
  padding: 2rem 2rem 4rem;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  overflow: hidden;
  min-height: 100vh;
  z-index: 1;
`;

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const AchievementCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 2;
  animation: ${fadeIn} 1s ease-out;
  animation-fill-mode: both;
  animation-delay: ${props => props.index * 0.1}s;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 
      0 8px 30px rgba(0, 0, 0, 0.12),
      inset 0 0 0 1px rgba(255, 255, 255, 0.7);
    background: rgba(255, 255, 255, 0.9);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.3)
    );
    z-index: -1;
  }

  h3 {
    color: #004d40;
    font-size: 1.3rem;
    margin: 1rem 0;
  }

  p {
    color: #4a4a4a;
    line-height: 1.6;
    font-size: 1rem;
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: rgba(0, 77, 64, 0.05);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  ${AchievementCard}:hover & {
    transform: scale(1.1);
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(79, 70, 229, 0.5);
  font-size: 1.5rem;
  animation: ${props => props.isTop ? bounceUp : bounceDown} 2s infinite;
  z-index: 2;
  pointer-events: none;
`;

const bounceDown = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
  40% { transform: translateY(-10px) translateX(-50%); }
  60% { transform: translateY(-5px) translateX(-50%); }
`;

const bounceUp = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
  40% { transform: translateY(10px) translateX(-50%); }
  60% { transform: translateY(5px) translateX(-50%); }
`;

export default Achievements; 