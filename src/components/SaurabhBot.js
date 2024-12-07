import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import avatarImage from '../assets/avatar.jpeg';

const colors = {
  primary: '#3B82F6',     // Main blue
  lightBlue: '#EFF6FF',   // Very light blue for backgrounds
  darkBlue: '#2563EB',    // Darker blue for hover states
  textBlue: '#1E40AF'     // Dark blue for text
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

const SaurabhBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hi! I'm Saurabh's virtual assistant. How can I help you?" }
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
              alt="Saurabh Bot"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/40";
              }}
            />
          </BotAvatar>
          <div>
            <BotName>Saurabh Bot</BotName>
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

// Animations
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

// Styled Components
const ChatbotButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: ${colors.primary};
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${bounce} 2s infinite;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.2);
  }
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 999;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  animation: ${props => props.isOpen ? slideIn : 'none'} 0.3s ease-in-out;
`;

const ChatHeader = styled.div`
  padding: 20px;
  background: ${colors.primary};
  color: white;
  display: flex;
  align-items: center;
  gap: 15px;
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
  font-weight: bold;
  font-size: 1.1rem;
`;

const BotStatus = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
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
  width: 30px;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MessageBubble = styled.div`
  background: ${props => props.isBot ? colors.primary : colors.lightBlue};
  color: ${props => props.isBot ? 'white' : colors.textBlue};
  padding: 12px 16px;
  border-radius: 18px;
  max-width: 70%;
  word-wrap: break-word;
`;

const InputContainer = styled.div`
  padding: 20px;
  display: flex;
  gap: 10px;
  border-top: 1px solid #eee;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 25px;
  outline: none;
  font-size: 1rem;

  &:focus {
    border-color: ${colors.primary};
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: ${colors.primary};
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: ${colors.darkBlue};
  }
`;

const SendIcon = styled.span`
  display: inline-block;
  transform: rotate(90deg);
`;

const TypingIndicator = styled.div`
  display: flex;
  gap: 3px;
  padding: 12px 16px;
  background: ${colors.primary};
  border-radius: 18px;
  width: fit-content;
  margin-bottom: 10px;
`;

const TypingDot = styled.div`
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  animation: ${bounce} 1s infinite;
  animation-delay: ${props => props.delay}s;
`;

const ChatbotHint = styled.div`
  position: fixed;
  bottom: 90px;
  right: 20px;
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(5px);
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 0.9rem;
  color: ${colors.primary};
  max-width: 200px;
  animation: ${fadeIn} 0.5s ease-out, ${float} 3s ease-in-out infinite;
  z-index: 999;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.1);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    right: 25px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid rgba(59, 130, 246, 0.1);
  }
`;

export default SaurabhBot;