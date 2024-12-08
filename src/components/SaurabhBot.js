import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import avatarImage from '../assets/avatar.jpeg';

// First, define all animations
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const bounce = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
`;

// Then define colors
const colors = {
  primary: '#000000',      // Apple black
  secondary: '#86868b',    // Apple gray
  accent: '#0071e3',      // Apple blue
  text: '#1d1d1f',        // Apple dark gray
  light: '#fbfbfd',       // Apple off-white
  border: '#d2d2d7'       // Apple border gray
};

const botResponses = {
  "notice period": "My current notice period is 90 days.",
  "current location": "I'm based in Bengaluru, India.",
  "skills": "I specialize in Generative AI, Cloud Architecture (AWS), and DevOps with over 21 years of experience.",
  "contact": "You can reach me at saurabhdvns@gmail.com or +91 7892879804",
  "availability": "I'm open to discussing new opportunities.",
  "experience": "I have 21+ years of experience in IT industry, currently working as a Generative AI & Cloud Automation Consultant.",
  "education": "I hold a Bachelor of Technology in Electronics from Dr Ram Manohar Lohiya Awadh University.",
  "certifications": "I'm certified in AWS Solutions Architect Professional, GSDC Generative AI, and DevOps.",
  "projects": "I've led numerous projects including AI-powered document analysis, cloud migrations, and DevOps transformations. Check out my Innovation section for more details!",
  "achievements": "I've successfully delivered 50+ projects with 100% client satisfaction. Visit my Achievements section to learn more!",
  "languages": "I'm proficient in Python, Java, and various cloud technologies.",
  "work history": "I've worked with leading companies including TCS, Infosys, Cognizant, and Sway Technologies.",
  "current role": "I'm currently working as a Generative AI & Cloud Automation Consultant at TCS.",
  "hobbies": "When I'm not coding, I enjoy staying updated with the latest tech trends and exploring new technologies.",
  "hello": "Hi there! I'm Saurabh's virtual assistant. Feel free to ask me about his experience, skills, or availability!",
  "hi": "Hello! How can I help you today?",
  "bye": "Thanks for chatting! Feel free to reach out anytime.",
  "thank you": "You're welcome! Let me know if you need anything else.",
  "thanks": "You're welcome! Feel free to ask any other questions.",
  "salary": "Ah, the million-dollar question! 😄 Let's discuss this over a call - reach me at +91 7892879804 or drop an email at saurabhdvns@gmail.com. I promise my expectations are as well-structured as my code!",
  "compensation": "Money talks, but it prefers to do so privately! 💼 Give me a call at +91 7892879804 or email me at saurabhdvns@gmail.com to discuss the numbers.",
  "package": "Let's keep the package discussion as exciting as a successful deployment! 🚀 Connect with me at +91 7892879804 or saurabhdvns@gmail.com to talk numbers.",
  "ctc": "CTC: 'Carefully Talked about Confidentially' 😉 Let's discuss this over a call at +91 7892879804 or via email at saurabhdvns@gmail.com",
  "pay": "As they say in tech, 'Show me the binary!' 🤖 But let's discuss the actual numbers privately - call +91 7892879804 or email saurabhdvns@gmail.com",
  "negotiate": "I'm as flexible as a well-written API! 🔄 Let's discuss the details over a call at +91 7892879804 or via email at saurabhdvns@gmail.com",
  "where do you stay": "I'm based in the tech hub of India - Bengaluru! 🌆 It's a great place for tech innovation and opportunities.",
  "where do you live": "Home is where the code is - and for me, that's Bengaluru! 🏠",
  "which city": "I'm in Bengaluru, the Silicon Valley of India! 🌟",
  "location": "I'm currently in Bengaluru, Karnataka. Perfect place for a tech enthusiast! 🎯",
  "address": "I'm located in Bengaluru. Feel free to reach out at +91 7892879804 to connect!",
  "bangalore": "Yes, that's right! I'm based in Bengaluru - the tech capital of India! 🚀",
  "bengaluru": "That's where I am! Loving the tech ecosystem here in Bengaluru! 💻",
  "what about relocation": "While I'm currently in Bengaluru, I'm open to discussing relocation opportunities. Let's talk about it - reach me at +91 7892879804!",
  "can you relocate": "Relocation? I'm as deployable as a cloud application! 🌥️ Let's discuss specifics over a call at +91 7892879804",
  "willing to relocate": "Like a well-designed microservice, I'm portable! 🚀 Let's discuss relocation over a call at +91 7892879804",
  "work from home": "I'm flexible with work arrangements, whether it's remote, hybrid, or office-based. Let's discuss the details over a call!",
  "remote work": "Remote work? I'm as comfortable with that as I am with cloud deployments! 💻 Let's discuss the specifics.",
  "hybrid": "Hybrid work model? I can adapt like a responsive design! Let's talk about the details.",
  "current location": "I'm currently enjoying the tech vibes in Bengaluru! 🌆 It's amazing how the city has become India's innovation hub!",
  "availability": "I'm open to exciting new opportunities! When one door closes, another container starts up! 🐳 Let's connect and discuss!",
  "tech stack": "My tech stack is like a well-architected cloud - multiple layers of expertise! 🏗️ From AWS to GenAI, I've got the full stack covered!",
  "cloud experience": "I'm as comfortable in the cloud as a microservice in a container! ☁️ AWS is my second home.",
  "programming languages": "I speak multiple languages - both human and programming! 💻 Python, Java, and Cloud are my favorites.",
  "favorite tech": "Like picking a favorite container from a pod - it's hard to choose! But I'm really excited about Generative AI and Cloud Native technologies! 🚀",
  "best project": "Each project is like a unique Git branch - they all have their special commits! 🌳 Check out my Innovation section for the highlights!",
  "free time": "When I'm not deploying code, I'm deploying knowledge! 📚 Always learning new tech and exploring innovations.",
  "strengths": "Like a well-designed API, I'm robust, scalable, and always delivering results! 💪 21+ years of tech experience speaks for itself.",
  "weakness": "My biggest weakness? Sometimes I get too excited about new tech - like a developer with unlimited AWS credits! 😄",
  "why should we hire": "Think of me as a high-availability system - reliable, performant, and always ready to scale! 🎯",
  "good morning": "Good morning! Booting up for another great day of tech innovation! ☀️",
  "good evening": "Good evening! Still running on all servers! 🌙",
  "good night": "Good night! Time to put this instance in sleep mode! 😴",
  "work style": "I'm like a well-configured CI/CD pipeline - efficient, reliable, and always delivering value! 🔄",
  "team work": "Like microservices in a well-orchestrated cluster, I work great in teams! 🤝",
  "leadership": "I lead like a good system architect - providing direction while enabling others to perform their best! 👨‍💻",
  "future plans": "Like a good roadmap, I'm focused on continuous improvement and scaling new heights in tech! 📈",
  "career goals": "Aiming to architect solutions that make a difference, like a commit that improves the entire codebase! 🎯",
  "joke": "Why do programmers prefer dark mode? Because light attracts bugs! 😄",
  "fun fact": "Here's a tech fun fact: I've deployed more containers than I've had cups of coffee... and that's saying something! ☕",
  "interests": "Besides tech? I'm interested in anything that scales well and has good documentation! 📚"
};

// Add media query breakpoints
const deviceBreakpoints = {
  mobile: '480px',
  tablet: '768px',
  ipad: '1024px'
};

const SaurabhBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: "👋 Hi! I'm Saurabh Dubey's virtual assistant. I can help you with information about notice period, location, skills, experience, and more! Feel free to ask anything." 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: inputText }]);
    
    // Show typing indicator
    setIsTyping(true);

    // Find response
    const response = findResponse(inputText);
    
    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
    }, 1500);

    setInputText('');
  };

  const findResponse = (input) => {
    const lowercaseInput = input.toLowerCase();
    for (const [key, value] of Object.entries(botResponses)) {
      if (lowercaseInput.includes(key)) {
        return value;
      }
    }
    return "I'm not sure about that. Feel free to ask about my notice period, location, skills, or contact information.";
  };

  return (
    <>
      {!isOpen && (
        <ChatbotHint>
          👋 Ask me about location, notice period, skills, or anything else!
        </ChatbotHint>
      )}
      <ChatbotButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        {isOpen ? '✕' : '💬'}
      </ChatbotButton>

      <ChatWindow isOpen={isOpen}>
        <ChatHeader>
          <BotAvatar>
            <AvatarImage 
              src={avatarImage}
              alt="Saurabh Dubey (VA)"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/40";
              }}
            />
          </BotAvatar>
          <div>
            <BotName>Saurabh Dubey (VA)</BotName>
            <BotStatus>Running on caffeine and cloud services ☕</BotStatus>
          </div>
        </ChatHeader>

        <MessagesContainer>
          {messages.map((message, index) => (
            <Message key={index} isBot={message.type === 'bot'}>
              {message.type === 'bot' && (
                <BotIcon>
                  <img 
                    src={avatarImage}
                    alt="Saurabh Bot"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/30";
                    }}
                  />
                </BotIcon>
              )}
              <MessageBubble isBot={message.type === 'bot'}>
                {message.text}
              </MessageBubble>
            </Message>
          ))}
          {isTyping && (
            <Message isBot>
              <BotIcon>
                <img 
                  src={avatarImage}
                  alt="Saurabh Bot"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/30";
                  }}
                />
              </BotIcon>
              <TypingIndicator>
                <TypingDot delay={0} />
                <TypingDot delay={0.2} />
                <TypingDot delay={0.4} />
              </TypingIndicator>
            </Message>
          )}
          <div ref={messagesEndRef} />
        </MessagesContainer>

        <InputContainer>
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
          />
          <SendButton onClick={handleSend}>
            <SendIcon>➤</SendIcon>
          </SendButton>
        </InputContainer>
      </ChatWindow>
    </>
  );
};

// Styled Components
const ChatbotButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: ${colors.accent};
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: ${deviceBreakpoints.mobile}) {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    font-size: 18px;
  }

  &:hover {
    transform: scale(1.05);
    background: #0077ED;
  }
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 380px;
  height: 500px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 999;
  backdrop-filter: blur(20px);
  transform-origin: bottom right;
  transform: ${props => props.isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'};
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid ${colors.border};
  pointer-events: ${props => props.isOpen ? 'all' : 'none'};

  // Mobile devices
  @media (max-width: ${deviceBreakpoints.mobile}) {
    width: 100%;
    height: 100%;
    bottom: 0;
    right: 0;
    border-radius: 0;
    transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(100%)'};
  }

  // Tablets
  @media (min-width: ${deviceBreakpoints.mobile}) and (max-width: ${deviceBreakpoints.tablet}) {
    width: 90%;
    right: 5%;
    height: 600px;
    bottom: 80px;
  }

  // iPads
  @media (min-width: ${deviceBreakpoints.tablet}) and (max-width: ${deviceBreakpoints.ipad}) {
    width: 400px;
    height: 600px;
    bottom: 90px;
  }
`;

const ChatHeader = styled.div`
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  color: ${colors.text};
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid ${colors.border};
  backdrop-filter: blur(10px);
`;

const BotAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BotName = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: ${colors.text};
  letter-spacing: -0.02em;
`;

const BotStatus = styled.div`
  font-size: 0.8rem;
  color: ${colors.secondary};
  letter-spacing: -0.01em;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  animation: ${fadeIn} 0.3s ease-out;
  justify-content: ${props => props.isBot ? 'flex-start' : 'flex-end'};
`;

const BotIcon = styled.div`
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.border};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background: white;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const MessageBubble = styled.div`
  background: ${props => props.isBot ? 
    'rgba(240, 240, 240, 0.95)' : 
    `${colors.accent}`};
  color: ${props => props.isBot ? colors.text : 'white'};
  padding: 12px 16px;
  border-radius: 18px;
  max-width: 85%;
  word-wrap: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  font-size: 0.95rem;
  line-height: 1.4;
  letter-spacing: -0.01em;

  @media (max-width: ${deviceBreakpoints.mobile}) {
    max-width: 90%;
    font-size: 0.9rem;
    padding: 10px 14px;
  }
`;

const InputContainer = styled.div`
  padding: 20px 25px;
  background: rgba(255, 255, 255, 0.95);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  gap: 15px;
  align-items: center;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.02);
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 18px;
  border: 1px solid ${colors.border};
  border-radius: 15px;
  outline: none;
  font-size: 0.95rem;
  background: white;
  transition: all 0.2s ease;
  letter-spacing: -0.01em;

  @media (max-width: ${deviceBreakpoints.mobile}) {
    padding: 10px 16px;
    font-size: 16px; // Prevents zoom on iOS
  }

  &:focus {
    border-color: ${colors.accent};
    box-shadow: 0 0 0 2px ${colors.accent}33;
  }

  &::placeholder {
    color: ${colors.secondary};
  }
`;

const SendButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background: ${colors.accent};
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #0077ED;
  }
`;

const SendIcon = styled.span`
  display: inline-block;
  transform: rotate(90deg);
`;

const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  padding: 10px 16px;
  background: rgba(240, 240, 240, 0.95);
  border-radius: 15px;
  width: fit-content;
`;

const TypingDot = styled.div`
  width: 5px;
  height: 5px;
  background: ${colors.secondary};
  border-radius: 50%;
  opacity: 0.7;
  animation: ${bounce} 1.4s infinite;
  animation-delay: ${props => props.delay}s;
`;

const ChatbotHint = styled.div`
  position: fixed;
  bottom: 90px;
  right: 30px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1));
  backdrop-filter: blur(10px);
  padding: 16px 24px;
  border-radius: 16px;
  font-size: 0.95rem;
  color: ${colors.primary};
  max-width: 250px;
  animation: ${fadeIn} 0.5s ease-out, ${float} 3s ease-in-out infinite;
  z-index: 999;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.1);

  @media (max-width: ${deviceBreakpoints.mobile}) {
    bottom: 75px;
    right: 20px;
    max-width: 200px;
    padding: 12px 18px;
    font-size: 0.9rem;
  }
`;

export default SaurabhBot;