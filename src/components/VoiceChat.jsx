import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { api } from '../api';
import socket from '../socket';

const VoiceChat = ({ currentCallId, messages: initialMessages = [], onCallStart, onCallEnd }) => {

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [isCallActive, setIsCallActive] = useState(false);

 
  const recognition = useRef(null);
  const lastMessageRef = useRef('');
  const messagesEndRef = useRef(null);
  const synthesis = window.speechSynthesis;
  const voices = useRef([]);

 
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

 
  useEffect(() => {
    if (currentCallId) {
      setIsCallActive(true);
      socket.emit('joinCall', currentCallId);
      console.log('Call activated:', currentCallId);
    } else {
      setIsCallActive(false);
      setIsListening(false);
      if (recognition.current) {
        try {
          recognition.current.stop();
        } catch (error) {
          console.error('Error stopping recognition:', error);
        }
      }
    }

    return () => {
      if (currentCallId) {
        socket.emit('leaveCall', currentCallId);
      }
    };
  }, [currentCallId]);

  // Socket event handlers
  useEffect(() => {
    if (!currentCallId) return;

    const handleMessageProcessed = (data) => {
      if (data.callId === currentCallId) {
        setIsTyping(false);
        setMessages(prevMessages => [...prevMessages, data.message]);

        if (data.shouldSpeak && data.message.speaker === 'agent') {
          speakText(data.message.text);
        }
      }
    };

    const handleStartTyping = (data) => {
      if (data.callId === currentCallId) {
        setIsTyping(true);
      }
    };

    const handleCallEnded = (data) => {
      if (data.callId === currentCallId) {
        setIsCallActive(false);
        setIsTyping(false);
        onCallEnd();
      }
    };

    socket.on('messageProcessed', handleMessageProcessed);
    socket.on('startTyping', handleStartTyping);
    socket.on('callEnded', handleCallEnded);

    return () => {
      socket.off('messageProcessed', handleMessageProcessed);
      socket.off('startTyping', handleStartTyping);
      socket.off('callEnded', handleCallEnded);
    };
  }, [currentCallId, onCallEnd]);

  
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false; 
      recognition.current.interimResults = true;

      recognition.current.onresult = (event) => {
        const current = event.resultIndex;
        const speechResult = event.results[current][0].transcript;
        setTranscript(speechResult);

        if (event.results[current].isFinal && isCallActive) {
          handleSendMessage(speechResult);
          setTranscript('');
        }
      };

      recognition.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }

    
    const loadVoices = () => {
      voices.current = synthesis.getVoices();
    };

    if (synthesis.onvoiceschanged !== undefined) {
      synthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();

    return () => {
      if (recognition.current) {
        try {
          recognition.current.stop();
        } catch (error) {
          console.error('Error stopping recognition:', error);
        }
      }
      if (synthesis.speaking) {
        synthesis.cancel();
      }
    };
  }, [isCallActive]);

  
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  
  const handleSendMessage = async (message) => {
    if (!isCallActive || !currentCallId) {
      console.log('Cannot send message: No active call');
      return;
    }
    
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      console.log('Cannot send empty message');
      return;
    }
  
    try {
      const newUserMessage = {
        speaker: 'customer',
        text: trimmedMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newUserMessage]);
      setIsTyping(true);

      const response = await api.sendMessage(currentCallId, trimmedMessage, 'customer');
      console.log('Message sent successfully:', response);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
    }
  };

 
  const startListening = () => {
    if (!recognition.current || isSpeaking || isTyping) {
      return;
    }

    try {
      recognition.current.start();
      setIsListening(true);


      setTimeout(() => {
        if (isListening) {
          recognition.current.stop();
          setIsListening(false);
        }
      }, 5000);
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
    }
  };


  const speakText = (text) => {
    if (text === lastMessageRef.current) {
      return;
    }

    if (synthesis.speaking) {
      synthesis.cancel();
    }

    lastMessageRef.current = text;
    setIsSpeaking(true);
    
    const chunks = text.match(/.{1,200}(?:[.!?]|$)/g) || [text];
    
    const speakChunk = (index) => {
      if (index >= chunks.length) {
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunks[index]);
      const voice = voices.current.find(v => v.lang.startsWith('en') && v.name.includes('Google')) || voices.current[0];
      
      if (voice) utterance.voice = voice;
      
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onend = () => {
        if (index === chunks.length - 1) {
          setIsSpeaking(false);
        } else {
          speakChunk(index + 1);
        }
      };
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsSpeaking(false);
      };

      synthesis.speak(utterance);
    };
    
    speakChunk(0);
  };

  
  const TypingIndicator = () => (
    <div className="flex space-x-2 p-3 bg-blue-100 rounded-lg max-w-[80%]">
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Voice Chat</span>
          <Button
            variant={currentCallId ? "destructive" : "default"}
            onClick={currentCallId ? onCallEnd : onCallStart}
            disabled={isSpeaking}
          >
            {currentCallId ? (
              <>
                <PhoneOff className="w-4 h-4 mr-2" />
                End Call
              </>
            ) : (
              <>
                <Phone className="w-4 h-4 mr-2" />
                Start Call
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[300px] overflow-y-auto border rounded-lg p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.speaker === 'agent' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.speaker === 'agent' 
                      ? 'bg-blue-100 text-blue-900' 
                      : 'bg-green-100 text-green-900'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <TypingIndicator />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex flex-col items-center space-y-4">
            {currentCallId && (
              <Button
                variant={isListening ? "destructive" : "default"}
                onClick={startListening}
                disabled={!currentCallId || isSpeaking || isTyping || isListening}
                className="w-full max-w-xs"
              >
                {isListening ? (
                  <>
                    <MicOff className="w-4 h-4 mr-2" />
                    Listening...
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 mr-2" />
                    Click to Speak
                  </>
                )}
              </Button>
            )}

            {isSpeaking && (
              <div className="text-sm text-blue-500">
                AI is speaking...
              </div>
            )}

            {transcript && (
              <div className="text-sm text-gray-500 w-full max-w-xs text-center">
                {transcript}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

VoiceChat.propTypes = {
  currentCallId: PropTypes.string,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      speaker: PropTypes.oneOf(['agent', 'customer']).isRequired,
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.instanceOf(Date)
    })
  ),
  onCallStart: PropTypes.func.isRequired,
  onCallEnd: PropTypes.func.isRequired,
};

export default VoiceChat;