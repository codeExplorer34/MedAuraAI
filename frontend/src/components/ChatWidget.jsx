import React, { useState, useRef, useEffect } from 'react';
import '../chatbot.css';
import EnhancedChatIcon from './EnhancedChatIcon';

// MedAura-specific responses
const getAIResponse = (message) => {
    const lowerMsg = message.toLowerCase();

    // Product questions
    if (lowerMsg.includes('emergency care') || lowerMsg.includes('er co-pilot') || lowerMsg.includes('er copilot')) {
        return "**Emergency Care** is our AI-powered clinical decision support tool for emergency departments. It helps with triage, risk stratification, and documentation—all in under 60 seconds. Would you like to try it? Just visit /er-copilot!";
    }
    if (lowerMsg.includes('mdt') || lowerMsg.includes('review') || lowerMsg.includes('team coordination')) {
        return "**Team Coordination** provides multi-disciplinary team case analysis with 5 specialist perspectives in one comprehensive review. It's designed for complex cases requiring collaborative decision-making.";
    }

    // Pricing questions
    if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('pricing')) {
        return "We offer 4 plans:\n• **Solo Clinician** - $49/mo (50 patients)\n• **Group Practice** - $149/mo (500 patients)\n• **Hospital/ED** - Custom pricing\n• **Health System** - Enterprise licensing\n\nAll include a 14-day free trial! Visit /pricing for details.";
    }
    if (lowerMsg.includes('free') || lowerMsg.includes('trial')) {
        return "Yes! All plans include a **14-day free trial** with full access. No credit card required. You can start right away at /er-copilot.";
    }

    // Safety & compliance
    if (lowerMsg.includes('hipaa') || lowerMsg.includes('secure') || lowerMsg.includes('compliant')) {
        return "MedAura AI is **HIPAA-compliant** with SOC 2 Type II certification. All data is encrypted at rest and in transit. We never sell or share patient information.";
    }
    if (lowerMsg.includes('diagnos') || lowerMsg.includes('prescri')) {
        return "Important clarification: MedAura AI provides **clinical decision-support and documentation assistance only**. It does not make diagnoses or prescriptions. All clinical decisions remain with the treating physician.";
    }

    // Integration
    if (lowerMsg.includes('integrat') || lowerMsg.includes('ehr') || lowerMsg.includes('fhir')) {
        return "We support **SMART on FHIR** integration for Hospital and Health System tiers. We can integrate with major EHR systems including Epic, Cerner, and others. Contact sales for specific integration requirements.";
    }

    // Demo/contact
    if (lowerMsg.includes('demo') || lowerMsg.includes('contact') || lowerMsg.includes('sales')) {
        return "I'd be happy to help arrange a demo! You can:\n• **Schedule a demo** at our contact page\n• **Start a free trial** immediately at /er-copilot\n• **Email us** at hello@medaura.ai";
    }

    // Greetings
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
        return "Hello! 👋 I'm the MedAura AI assistant. I can help you with:\n• Product information (Emergency Care, Team Coordination)\n• Pricing & plans\n• Security & compliance\n• Integration options\n\nWhat would you like to know?";
    }

    // Thanks
    if (lowerMsg.includes('thank')) {
        return "You're welcome! Is there anything else I can help you with regarding MedAura AI?";
    }

    // Default
    return "I can help you with questions about MedAura AI's products, pricing, security, and integrations. What would you like to know?\n\n**Quick topics:**\n• Emergency Care features\n• Team Coordination capabilities\n• Pricing plans\n• HIPAA compliance\n• EHR integrations";
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: "Hi! 👋 I'm the MedAura AI assistant. How can I help you today?",
            time: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // ===== PROACTIVE TRIGGERS =====

    // 1. Check if user has seen chatbot before
    const [hasInteracted, setHasInteracted] = useState(() => {
        return localStorage.getItem('medaura_chatbot_seen') === 'true';
    });

    // Mark as seen when user opens chatbot
    useEffect(() => {
        if (isOpen && !hasInteracted) {
            setHasInteracted(true);
            localStorage.setItem('medaura_chatbot_seen', 'true');
        }
    }, [isOpen, hasInteracted]);

    // 2. Time-based trigger - Auto-open after 10 seconds
    useEffect(() => {
        if (hasInteracted) return; // Don't trigger if already interacted

        const timer = setTimeout(() => {
            setIsOpen(true);
            // Add a proactive message
            setMessages(prev => [...prev, {
                id: Date.now(),
                type: 'bot',
                text: "I noticed you've been browsing for a bit! 👀 Have any questions about MedAura AI? I'm here to help!",
                time: new Date()
            }]);
        }, 10000); // 10 seconds

        return () => clearTimeout(timer);
    }, [hasInteracted]);

    // 3. Scroll depth trigger - Open when user scrolls 50% down
    useEffect(() => {
        if (hasInteracted) return;

        const handleScroll = () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            if (scrollPercent > 50) {
                setIsOpen(true);
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    type: 'bot',
                    text: "Exploring our features? 🔍 I can answer questions about Emergency Care, pricing, or schedule a demo!",
                    time: new Date()
                }]);
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasInteracted]);

    // 4. Exit intent trigger - Show chatbot when mouse leaves top of viewport
    useEffect(() => {
        if (hasInteracted) return;

        const handleMouseLeave = (e) => {
            if (e.clientY < 10) { // Mouse near top of window
                setIsOpen(true);
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    type: 'bot',
                    text: "Wait! Before you go... 🙋‍♀️ Is there anything I can help clarify about MedAura AI?",
                    time: new Date()
                }]);
                document.removeEventListener('mouseleave', handleMouseLeave);
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [hasInteracted]);

    // 5. Inactivity trigger - Prompt after 30 seconds of no activity
    useEffect(() => {
        if (hasInteracted || isOpen) return;

        let inactivityTimer;

        const resetTimer = () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                setIsOpen(true);
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    type: 'bot',
                    text: "Still there? 💭 I'm here if you have questions about MedAura's AI-powered clinical tools!",
                    time: new Date()
                }]);
            }, 30000); // 30 seconds
        };

        // Reset timer on any user activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        events.forEach(event => document.addEventListener(event, resetTimer));

        resetTimer(); // Start timer

        return () => {
            clearTimeout(inactivityTimer);
            events.forEach(event => document.removeEventListener(event, resetTimer));
        };
    }, [hasInteracted, isOpen]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            text: inputValue,
            time: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response delay
        setTimeout(() => {
            const response = getAIResponse(inputValue);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'bot',
                text: response,
                time: new Date()
            }]);
            setIsTyping(false);
        }, 800 + Math.random() * 700);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const quickQuestions = [
        "What is Emergency Care?",
        "Show me pricing",
        "Is it HIPAA compliant?",
        "Schedule a demo"
    ];

    return (
        <>
            {/* Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`chat-toggle ${isOpen ? 'chat-toggle-open' : ''}`}
                aria-label="Toggle chat"
            >
                <EnhancedChatIcon isOpen={isOpen} />
            </button>

            {/* Chat Window */}
            <div className={`chat-window ${isOpen ? 'chat-window-open' : ''}`}>
                {/* Header */}
                <div className="chat-header">
                    <div className="chat-header-info">
                        <div className="chat-avatar">
                            <img src="/MedAuraAI Logo.png" alt="MedAura" />
                        </div>
                        <div>
                            <div className="chat-header-title">MedAura AI</div>
                            <div className="chat-header-status">
                                <span className="status-dot"></span>
                                Online
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="chat-close">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Messages */}
                <div className="chat-messages">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`chat-message chat-message-${msg.type}`}>
                            <div className="chat-bubble">
                                {msg.text.split('\n').map((line, i) => (
                                    <p key={i}>
                                        {line.split(/(\*\*[^*]+\*\*|\/[\w-]+)/g).map((part, j) => {
                                            if (part.startsWith('**') && part.endsWith('**')) {
                                                return <strong key={j}>{part.slice(2, -2)}</strong>;
                                            }
                                            if (part.startsWith('/') && part.match(/^\/[\w-]+$/)) {
                                                return <a key={j} href={part} className="chat-link">{part}</a>;
                                            }
                                            return part;
                                        })}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="chat-message chat-message-bot">
                            <div className="chat-bubble chat-typing">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                {messages.length <= 2 && (
                    <div className="chat-quick">
                        {quickQuestions.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setInputValue(q);
                                    setTimeout(() => handleSend(), 100);
                                }}
                                className="chat-quick-btn"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input */}
                <div className="chat-input-container">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about MedAura AI..."
                        className="chat-input"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim()}
                        className="chat-send"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}
