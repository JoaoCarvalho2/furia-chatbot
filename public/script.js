// Configuração das partículas de fundo e animações
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização das partículas com cores da FURIA
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 50,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: ['#f5c518', '#7928ca']  // Cores da FURIA: amarelo e roxo
        },
        shape: {
          type: 'polygon',
          stroke: {
            width: 0,
            color: '#000000'
          },
          polygon: {
            nb_sides: 6
          }
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: {
            enable: true,
            speed: 0.8,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#f5c518',  // Linha em amarelo
          opacity: 0.3,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5
            }
          },
          push: {
            particles_nb: 3
          }
        }
      },
      retina_detect: true
    });
  
    // Animação de entrada com GSAP
    if (window.gsap) {
      const timeline = gsap.timeline();
      
      timeline
        .from('.logo-container', { duration: 0.8, y: -50, opacity: 0, ease: 'power3.out' })
        .from('.status-indicator', { duration: 0.5, opacity: 0, x: 20, ease: 'power2.out' }, '-=0.4')
        .from('.chat-container', { duration: 0.8, opacity: 0, y: 30, ease: 'power3.out' }, '-=0.2')
        .from('.hud-corner, .hud-line', { 
          duration: 0.8, 
          opacity: 0, 
          scale: 0.8, 
          stagger: 0.1,
          ease: 'back.out(1.7)'
        }, '-=0.5')
        .from('#chat-form', { duration: 0.6, opacity: 0, y: 20, ease: 'power2.out' }, '-=0.3')
        .from('.quick-questions', { duration: 0.6, opacity: 0, y: 10, ease: 'power2.out' }, '-=0.4')
        .from('footer', { duration: 0.5, opacity: 0, ease: 'power2.out' }, '-=0.2');
  
      // Animação de mensagem inicial
      gsap.fromTo('.bot-message', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: 'power2.out' }
      );
    }
  
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chat = document.getElementById('chat');
    const typingIndicator = document.getElementById('typing-indicator');
  
    // Função para adicionar mensagem ao chat (versão melhorada)
    function addMessage(sender, text, isBot = false) {
      const now = new Date();
      const time = now.getHours().toString().padStart(2, '0') + ':' + 
                  now.getMinutes().toString().padStart(2, '0');
      
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
      
      if (isBot) {
        messageDiv.innerHTML = `
          <div class="message-avatar">
            <img src="https://furiabets.com/assets/furia-6b634e82.svg" alt="FURIA Bot" class="h-8 w-8">
          </div>
          <div class="message-content">
            <div class="message-header">
              <span class="message-sender">${sender}</span>
              <span class="message-time">${time}</span>
            </div>
            <div class="message-text">
              ${text}
            </div>
          </div>
        `;
      } else {
        messageDiv.innerHTML = `
          <div class="message-content">
            <div class="message-header">
              <span class="message-sender">${sender}</span>
              <span class="message-time">${time}</span>
            </div>
            <div class="message-text">
              ${text}
            </div>
          </div>
          <div class="message-avatar">
            <i class="fas fa-user" style="color: #d1d5db;"></i>
          </div>
        `;
      }
      
      // Adicionar ao chat com animação
      chat.appendChild(messageDiv);
      
      if (window.gsap) {
        // Animação de entrada da mensagem
        gsap.fromTo(messageDiv, 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
      }
      
      // Rolar para a última mensagem
      chat.scrollTop = chat.scrollHeight;
    }
  
    // Mostrar/esconder indicador de digitação
    function showTypingIndicator() {
      typingIndicator.classList.remove('hidden');
      
      if (window.gsap) {
        gsap.fromTo(typingIndicator, 
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3 }
        );
      }
      
      chat.scrollTop = chat.scrollHeight;
    }
    
    function hideTypingIndicator() {
      if (window.gsap) {
        gsap.to(typingIndicator, {
          opacity: 0,
          y: 10,
          duration: 0.3,
          onComplete: () => typingIndicator.classList.add('hidden')
        });
      } else {
        typingIndicator.classList.add('hidden');
      }
    }
  
    // Função para integrar com API externa 
    async function fetchBotResponse(message) {
      try {
        // Chamada para a API
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        });
        
        if (!response.ok) {
          throw new Error('Falha na comunicação com o servidor');
        }
        
        const data = await response.json();
        return data.reply;
        
      } catch (error) {
        console.error('Erro ao obter resposta:', error);
        return "Desculpe, estou enfrentando algumas dificuldades técnicas. Tente novamente em alguns instantes.";
      }
    }
  
    // Lidar com envio de formulário
    chatForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const message = userInput.value.trim();
      if (!message) return;
      
      // Adicionar mensagem do usuário
      addMessage('Você', message, false);
      userInput.value = '';
      
      // Mostrar indicador de digitação
      showTypingIndicator();
      
      try {
        // Aguardar resposta da API
        const botResponse = await fetchBotResponse(message);
        
        // Esconder indicador de digitação
        hideTypingIndicator();
        
        // Adicionar resposta do bot com um pequeno atraso para melhor UX
        setTimeout(() => {
          addMessage('FURIA Bot', botResponse, true);
        }, 300);
        
      } catch (error) {
        console.error("Erro:", error);
        hideTypingIndicator();
        
        // Mostrar mensagem de erro
        setTimeout(() => {
          addMessage('FURIA Bot', 'Desculpe, estou com dificuldades técnicas no momento. Tente novamente mais tarde.', true);
        }, 300);
      }
    });
    
    // Configurar botões de perguntas rápidas
    const quickButtons = document.querySelectorAll('.quick-btn');
    quickButtons.forEach(button => {
      button.addEventListener('click', function() {
        const quickQuestion = this.textContent;
        userInput.value = quickQuestion;
        chatForm.dispatchEvent(new Event('submit'));
      });
    });
  });